pragma solidity ^0.4.21;

import "./openzeppelin-solidity/Pausable.sol";
import "./Store.sol";

/** @title Market Place */
contract MarketPlace is Pausable {
    
    ///State

    enum Roles { ADMIN, OWNER, SHOPPER }

    mapping(address => bool) public admins;
    mapping(address => bool) public owners;
    mapping(address => address[]) public stores;

    address[] public allStores;

    ///Events
    event NewStore(address store);

    ///Modifiers

    /**
    * @dev Throws if called by any account other than admin.
    */
    modifier onlyAdmin() {
        require(admins[msg.sender] == true);
        _;
    }
    
    /**
    * @dev Throws if called by any account other than owner.
    */
    modifier onlyStoreOwner() {
        require(owners[msg.sender] == true);
        _;
    }
    
    ///Functions

    /**
    * @notice Constructor
    */
    constructor() public {
        admins[msg.sender] = true;
    }

    /**
    * @notice Add new admin
    * @param newAdmin Address of the new admin
    */
    function addAdmin(address newAdmin) public onlyAdmin whenNotPaused returns (bool success){
        require(admins[newAdmin] == false);
        admins[newAdmin] = true;
        return true;
    }
    
    /**
    * @notice Add new store owner
    * @param newOwner Address of the new owner
    */
    function addStoreOwner(address newOwner) public onlyAdmin whenNotPaused returns(bool success){
        require(owners[newOwner] == false);
        owners[newOwner] = true;
        return true;
    }      

    /**
    * @notice Create new Store
    * @param storeName Name of the new store
    */
    function addStore(string storeName) public onlyStoreOwner whenNotPaused returns(bool success){
        require(owners[msg.sender] == true, "Only StoreOwners can create stores");
        bytes memory temp = bytes(storeName);
        require(temp.length != 0, "Store name can not be empty");
        address store = new Store(msg.sender, storeName);
        stores[msg.sender].push(store);
        allStores.push(store);
        emit NewStore(store);
        return true;
    }   

    /**
    * @notice Return the role of the active user
    */
    function getUserRole() public view returns (Roles role){
        if (admins[msg.sender] == true){
            return Roles.ADMIN;
        }
        if (owners[msg.sender] == true){
            return Roles.OWNER;
        }
        return Roles.SHOPPER;
    }

    /**
    * @notice Return all the stores in case of a SHOPPER or all store of the OWNER in other case.
    */
    function getStores() public view returns (address[]){
        if (getUserRole() == Roles.SHOPPER){
            return allStores;
        } else {
            return stores[msg.sender];
        }
    }  
    
}