pragma solidity 0.4.24;

import "augur-core/source/contracts/reporting/Universe.sol";
import "augur-core/source/contracts/reporting/IUniverse.sol";
import "augur-core/source/contracts/reporting/IMarket.sol";
import "augur-core/source/contracts/trading/ICash.sol";

contract OptionsRegistry {
    event LogNewOptionMarket(
        address indexed market,
        uint256 strike,
        uint256 expiry
    );

    struct OptionMarket {
        uint256 strike;
        uint256 expiry;
    }

    mapping (address => OptionMarket) internal markets;
    address[] internal allMarkets;

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
        saveMarket(
            _newMarket,
            _strike,
            _expiry
        );
        return _newMarket;
    }

    function saveMarket (
        address newMarket, 
        uint256 strike,
        uint256 expiry
    ) internal {
        OptionMarket memory optionMarket = OptionMarket(
            strike,
            expiry
        );

        allMarkets.push(newMarket);
        markets[newMarket] = optionMarket;

        emit LogNewOptionMarket(
            address(newMarket),
            optionMarket.strike,
            optionMarket.expiry
        );
    }

    function getMarkets() public view returns (address[]) {
        return allMarkets;
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
