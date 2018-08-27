pragma solidity ^0.4.21;

import "./openzeppelin-solidity/Pausable.sol";
import "./openzeppelin-solidity/SafeMath.sol";
import "./openzeppelin-solidity/Escrow.sol";

/** @title Store */
contract Store is Pausable, Escrow {
    using SafeMath for uint256; 

    ///State

    address public storeOwner;
    string public storeName;
    uint256 public storeBalance;

    mapping(uint256 => Product) public products;

    struct Product {
        uint256 id;
        string name;
        uint256 price;
        uint256 stock;
    }

    ///Events 
    
    event ProductAdded(uint256 id);
    event ProductRemoved(uint256 id, uint256 stock);
    
    event StockUpdated(uint256 id, uint256 stock);
    event StockAvaiable(uint256 id, uint256 quantity);
    
    event Purchase(uint256 id, uint256 stock);

    ///Modifier

    /**
    * @dev Throws if called by any account other than owner.
    */
    modifier onlyStoreOwner {
        require(msg.sender == storeOwner);
        _;
    }

    ///Functions

    /**
    * @notice Constructor
    * @param _storeOwner Address of the owner of the Store
    * @param _storeName Name of the store
    */
    constructor(address _storeOwner, string _storeName) public {
        storeOwner = _storeOwner;
        storeName = _storeName;
    }
    
    /**
    * @notice Add new product to the Store
    * @param id Identification of the new prodcut
    * @param name Name of the new product
    * @param price Price of the new product
    * @param stock Stock of the new product
    */
    function addProduct(uint256 id, string name, uint256 price, uint256 stock) public onlyStoreOwner whenNotPaused returns (bool success) {
        Product memory newProduct = Product(id, name, price, stock);
        bytes memory temp = bytes(newProduct.name);
        if (newProduct.price > 0 && temp.length != 0) {
            products[id] = newProduct;
            emit ProductAdded(id);
            return true;
        }
        return false;
    }

    /**
    * @notice Add stock for a product of the Store
    * @param id Identification of the prodcut
    * @param amount Amount of stock to add
    */
    function addStock(uint256 id, uint256 amount) public onlyStoreOwner whenNotPaused returns (bool success) {
        products[id].stock = products[id].stock.add(amount);
        emit StockUpdated(id, products[id].stock);
        return true;
    }

    /**
    * @notice Check stock avaiable
    * @param id Identification of the prodcut
    * @param needed Stock needed
    */
    function checkStock(uint256 id, uint256 needed) onlyStoreOwner public whenNotPaused returns(bool available) {
        if (products[id].stock >= needed) {
            emit StockAvaiable(id, needed);
            return true;
        }
        return false;
    }

    /**
    * @notice Remove product of the Store
    * @param id Identification of the prodcut
    * @param amount Amount of stock to remove
    */
    function removeStock(uint256 id, uint256 amount) public onlyStoreOwner whenNotPaused returns (bool success){
        products[id].stock = products[id].stock.sub(amount);
        emit ProductRemoved(id, products[id].stock);
        return true;
    }
    
    /**
    * @notice Pay for a product
    * @param id Identification of the prodcut
    * @param amount Amount of products
    */
    function payProducts(uint256 id, uint256 amount) public payable whenNotPaused returns (bool success) {
        uint256 totalPrice = products[id].price.mul(amount);
        if (msg.value >= totalPrice && products[id].stock >= amount) {
            deposit(storeOwner);
            products[id].stock = products[id].stock.sub(amount);
            emit Purchase(id, products[id].stock);
            return true;
        }
        return false;
    }

    /**
    * @dev Transfers the current balance to the storeOwner and terminates the contract.
    */
    function destroy() public onlyStoreOwner {
        selfdestruct(storeOwner);
    }

    /**
    * @notice Get product
    * @param id Identification of the prodcut
    */
    function getProduct(uint256 id) public view returns (string name, uint256 price, uint256 stock) {
        return (products[id].name, products[id].price, products[id].stock);
    }
    
    function() public payable {
        revert();
    }
    
}