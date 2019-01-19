pragma solidity 0.4.24;

import "augur-core/source/contracts/reporting/Universe.sol";
import "augur-core/source/contracts/reporting/IUniverse.sol";
import "augur-core/source/contracts/reporting/IMarket.sol";
import "augur-core/source/contracts/trading/ICash.sol";
import "veil-contracts/contracts/VirtualAugurShareFactory.sol";

contract OptionsRegistry {
    VirtualAugurShareFactory shareFactory;
    address public shareTokenSpender;

    constructor(VirtualAugurShareFactory _shareFactory, address _shareTokenSpender) public {
        shareFactory = _shareFactory;
        shareTokenSpender = _shareTokenSpender;
    }

    event LogNewOptionMarket(
        address indexed market,
        uint256 strike,
        uint256 expiry,
        address shortToken,
        address longToken
    );

    struct OptionMarket {
        bytes32 topic;
        uint256 strike;
        uint256 expiry;
        address shortToken;
        address longToken;
    }

    mapping (address => OptionMarket) internal markets;
    address[] internal allMarkets;

    function getMarkets() public view returns (address[]) {
        return allMarkets;
    }

    function createOptionMarket(
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

        OptionMarket memory optionMarket = OptionMarket(
            topic,
            strike,
            newMarket.getEndTime(),
            virtualShortToken,
            virtualLongToken
        );

        allMarkets.push(newMarket);
        markets[newMarket] = optionMarket;

        emit LogNewOptionMarket(
            address(newMarket),
            optionMarket.strike,
            optionMarket.expiry,
            virtualShortToken,
            virtualLongToken
        );
    }

    function wrapShareTokens(IMarket newMarket, address spender)
        internal
        returns (address virtualShortToken, address virtualLongToken)
    {
        // Make sure VAS contracts can transfer Augur shares
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
    ) public {
        uint256 balance = IUniverse(universe).getReputationToken().balanceOf(this);
        if(balance > 0) {
            IUniverse(universe).getReputationToken().transfer(msg.sender, balance);
        }
    }
}
