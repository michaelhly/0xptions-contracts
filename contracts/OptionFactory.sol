pragma solidity 0.4.24;

import "augur-core/source/contracts/reporting/Universe.sol";
import "augur-core/source/contracts/reporting/IUniverse.sol";
import "augur-core/source/contracts/reporting/IMarket.sol";
import "augur-core/source/contracts/trading/ICash.sol";

contract OptionFactory {
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
    address[] allMarkets;

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
            optionMarket.market,
            optionMarket.strike,
            optionMarket.expiry
        );
    }

    function approveUniverse(
        address universe
    ) public {
        IUniverse(universe).getReputationToken().approve(universe, 2**256 - 1);
    }

    function withdrawRep(
        address repToken, 
        uint256 value
    ) public {
        ERC20(repToken).transfer(msg.sender, value);
    }
}
