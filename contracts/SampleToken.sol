import "openzeppelin-solidity/contracts/access/roles/MinterRole.sol";
import "veil-contracts/contracts/UnlimitedAllowanceToken.sol";

contract SampleToken is UnlimitedAllowanceToken, MinterRole {
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    address public defaultSpender;

    constructor (
        string memory name, 
        string memory symbol, 
        address _defaultSpender
    ) public {
        _name = name;
        _symbol = symbol;
        _decimals = 18;
        defaultSpender = _defaultSpender;
    }

    /**
     * @dev Internal function that mints an amount of the token and assigns it to
     * an account. This encapsulates the modification of balances such that the
     * proper events are emitted.
     * @param account The account that will receive the created tokens.
     * @param value The amount that will be created.
     */
    function _mint(address account, uint256 value) internal {
        require(account != address(0));

        totalSupply = totalSupply.add(value);
        balances[account] = balances[account].add(value);
        emit Transfer(address(0), account, value);
    }

    /**
     * Updates the standard allowance method to return unlimited allowance for the default spender
     *
     * @param _owner           Address that owns the funds
     * @param _spender         Address that will spend the funds
     */
    function allowance(address _owner, address _spender) public view returns (uint256) {
        if (_spender == defaultSpender)
            return uint256(-1);
        return allowed[_owner][_spender];
    }

     /**
     * @dev Function to mint tokens
     * @param to The address that will receive the minted tokens.
     * @param value The amount of tokens to mint.
     * @return A boolean that indicates if the operation was successful.
     */
    function mint(address to, uint256 value) public onlyMinter returns (bool) {
        _mint(to, value);
        return true;
    }

    /**
     * @return the name of the token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @return the symbol of the token.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @return the number of decimals of the token.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
}