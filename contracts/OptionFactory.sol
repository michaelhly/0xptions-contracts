pragma solidity 0.4.24;

import "augur-core/source/contracts/reporting/Universe.sol";
import "augur-core/source/contracts/reporting/IMarket.sol";
import "augur-core/source/contracts/trading/IShareToken.sol";

contract OptionFactory {
    event LogNewOptionMarket(
        address indexed market,
        address underlying,
        uint256 strike,
        uint256 expiry,
        address invalidToken,
        address longToken, 
        address shortToken
    );

    struct OptionMarket {
        address market;
        address underlying;
        uint256 strike;
        uint256 expiry;
        address invalidToken;
        address longToken;
        address shortToken;
    }

    mapping (address => OptionMarket) internal markets;
    address[] allMarkets;

    function createOptionMarket(
        address universe,
        address _underlying,
        uint256 _strike,
        uint256 _expiry, 
        uint256 _feePerEthInWei, 
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
            _underlying,
            _strike,
            _expiry,
            address(_newMarket.getShareToken(0)),
            address(_newMarket.getShareToken(1)),
            address(_newMarket.getShareToken(2))
        );

        return _newMarket;
    }

    function saveMarket (
        address newMarket, 
        address underlying, 
        uint256 strike,
        uint256 expiry,
        address invalidToken,
        address longToken, 
        address shortToken
    ) internal {
        OptionMarket memory optionMarket = OptionMarket(
            newMarket,
            underlying,
            strike,
            expiry,
            invalidToken,
            longToken,
            shortToken
        );

        allMarkets.push(newMarket);
        markets[newMarket] = optionMarket;

        emit LogNewOptionMarket(
            optionMarket.market,
            optionMarket.underlying,
            optionMarket.strike,
            optionMarket.expiry,
            optionMarket.invalidToken,
            optionMarket.longToken,
            optionMarket.shortToken
        );
    }
}
