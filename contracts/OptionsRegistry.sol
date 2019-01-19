pragma solidity 0.4.24;

import "augur-core/source/contracts/reporting/IMarket.sol";
import "augur-core/source/contracts/reporting/IUniverse.sol";
import "augur-core/source/contracts/reporting/Universe.sol";
import "augur-core/source/contracts/trading/ICash.sol";
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "veil-contracts/contracts/VirtualAugurShareFactory.sol";

contract OptionsRegistry is Pausable {
    VirtualAugurShareFactory shareFactory;
    address public shareTokenSpender;

    constructor(VirtualAugurShareFactory _shareFactory, address _shareTokenSpender) public {
        shareFactory = _shareFactory;
        shareTokenSpender = _shareTokenSpender;
    }

    event LogNewOptionsMarket(
        address indexed market,
        bytes32 topic,
        uint256 strike,
        uint256 expiry,
        address shortToken,
        address longToken
    );

    struct OptionsMarket {
        bytes32 topic;
        uint256 strike;
        uint256 expiry;
        address shortToken;
        address longToken;
    }

    mapping (address => OptionsMarket) internal marketData;
    mapping (bytes32 => address) internal topicToMarket;
    address[] internal allMarkets;

    function getMarkets() public view returns (address[]) {
        return allMarkets;
    }

    function getMarket(address market)
        public
        view
        returns (
            bytes32 topic,
            uint256 strike,
            uint256 expiry,
            address shortToken,
            address longToken
        )
    {
        topic  = marketData[market].topic;
        strike = marketData[market].strike;
        expiry = marketData[market].expiry;
        shortToken = marketData[market].shortToken;
        longToken  = marketData[market].longToken;
    }

    function getMarketByTopic(bytes32 topic)
        public
        view
        returns (
            address market,
            address shortToken,
            address longToken 
        )
    {
        market = topicToMarket[topic];
        shortToken = marketData[market].shortToken;
        longToken  = marketData[market].longToken;
    }

    function createOptionsMarket(
        address universe,
        uint256 _strike,
        uint256 _expiry, 
        uint256 _feePerEthInWei, 
        ICash   _denominationToken,
        address _designatedReporterAddress, 
        int256  _minPrice, 
        int256  _maxPrice, 
        uint256 _numTicks, 
        bytes32 _topic, 
        string  _description, 
        string  _extraInfo
    ) external 
      payable 
      onlyPauser
      whenNotPaused
      returns (IMarket _newMarket)
    {
        _newMarket = Universe(universe).createScalarMarket.value(msg.value)(
            _expiry, 
            _feePerEthInWei,
            _denominationToken,
            _designatedReporterAddress, 
            _minPrice, 
            _maxPrice, 
            _numTicks, 
            _topic, 
            _description, 
            _extraInfo
        );

        registerMarket(
            _newMarket,
            _strike,
            _topic
        );
    }

    function registerMarket (
        IMarket newMarket,
        uint256 strike,
        bytes32 topic
    ) internal {
        require(strike > 0, "strike price must not be negative");

        address virtualShortToken;
        address virtualLongToken;
        (virtualShortToken, virtualLongToken) = wrapShareTokens(newMarket, shareTokenSpender);

        OptionsMarket memory optionsMarket = OptionsMarket(
            topic,
            strike,
            newMarket.getEndTime(),
            virtualShortToken,
            virtualLongToken
        );

        allMarkets.push(newMarket);
        topicToMarket[topic] = newMarket;
        marketData[newMarket] = optionsMarket;

        emit LogNewOptionsMarket(
            address(newMarket),
            topic,
            strike,
            optionsMarket.expiry,
            virtualShortToken,
            virtualLongToken
        );
    }

    function wrapShareTokens(IMarket newMarket, address spender)
        internal
        returns (address virtualShortToken, address virtualLongToken)
    {
        virtualShortToken = shareFactory.create(address(newMarket.getShareToken(0)), spender);
        virtualLongToken  = shareFactory.create(address(newMarket.getShareToken(1)), spender);
    }

    function approveUniverse(
        address universe
    ) public {
        if(IUniverse(universe).getReputationToken().allowance(this, universe) != uint256(-1)){
            IUniverse(universe).getReputationToken().approve(universe, uint256(-1));
        }
    }

    function withdrawRep(
        address universe
    ) external
      onlyPauser
    {
        uint256 balance = IUniverse(universe).getReputationToken().balanceOf(this);
        if(balance > 0) {
            IUniverse(universe).getReputationToken().transfer(msg.sender, balance);
        }
    }
}
