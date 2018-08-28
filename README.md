# Market Place

Create an online marketplace that operates on the blockchain.

There are a list of stores on a central marketplace where shoppers can purchase goods posted by the store owners.

The central marketplace is managed by a group of administrators. Admins allow store owners to add stores to the marketplace. Store owners can manage their store’s inventory and funds. Shoppers can visit stores and purchase goods that are in stock using cryptocurrency. 


## What it does

### Satisfies the following: 

1. Identification.  
2. Market Place functionality for admins, owners y shoppers.
3. Allow admins to add new owners.
4. Allow owners to create stores and manage products.
5. Allow shoppers to view stores and buy products.  


### Contracts on the project: 

1. MarketPlace.sol - Provide Market Place funcionality.
2. Store.sol - Store functionality.
3. Ownable.sol - Manage the onwership patter and onlyOwner modifier.
4. Pausable.sol - Allowing an emergency stop pattern.
5. SafeMath.sol - Library, allowing cover of overflows in store.


## Getting Started

These prerequisites and repository files should allow a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites 

1. Node package manager - https://www.npmjs.com/get-npm 

    npm should be installed properly on your machine. See the above link for how to do this.

2. Truffle install - https://github.com/trufflesuite/truffle

    Truffle should be installed properly on your machine. See the above link for how to do this.

3. ganache-cli install - https://github.com/trufflesuite/ganache-cli

    Ganache-cli should be installed properly on your machine. See the above link for how to do this. The GUI Ganache can also be used.

4. Project files (this git collection) in a local directory.

    Unzip/Clone the Repository to a local directory

5. MetaMask install - https://metamask.io/

    Install MetaMask. See above link for how to do this.

### Installing

1. Copy files to marketplace Directory

2. run ganache-cli

```
ganache-cli --port 8545
```

3. Set Up MetaMask for project - import with seed phrase "hild relax seven grocery thumb glove age body tube width grief clap"
    1. change the network to Private Network, set port to: 8545
    2. This will set account[0]. 

4. Compile truffle
Compile the project from the directory where the files are located.

```
truffle compile
```

5. Migrate
Migrate the project to the blockchain.
```
truffle migrate
```

6. Tests
A series of javascript tests for the contract files, testing basic contract functionality.

```
truffle test
```

5. Install node dependencies
Run the following command in the directory where you compiled the package from.

```
npm install
```

6. Run Development Web Server for project.
Run the following command in the directory where you compiled the package from.

```
npm run start
```


 ## Tests
 
 ### TestMarketPlace  

1. "..contract ower should be correct" - Checks Owner address against expected. Makes sure that the contract was deployed to the correct owner.

2. "..should add Alice as admin." - Check if Alice is correctlly added as admin. Make sure addAdmin function is working correctly and getUserRole return ADMIN role.

3. "..should add Bob as owner." - Check if Bob is correctlly added as store owner. Make sure addStoreOwner function is working correctly and getUserRole return OWNER role.

4. "..should recognize Clair as shopper." - Check if Clair is recognize as shopper. Make sure getUserRole return SHOPPER role.

5. "..owner (Bob) should create a new store with name store1." - Check that an store owner add a new store correctly. Test to see if addStore function work as expected and getStores return the stores associated to the store owner provide as parameter.

6. "..owner (Bob) should see 4 stores." - Check that store owner with 4 stores can see all them. Test that getStores correctly return multiple addresses.

7. "..shooper (Clair) should see Bob 4 stores and Dan new store, 5 in total." - Check that a shopper can see stores of multiples store owners. Test that getStores for a role of type shopper return all the stores created.


### TestStore

1. "..store name should be testName" - Check name of the store deployed against expected. Makes sure that the contract was deployed correctly.

2. "..should add a new product with id 1, name avocado, price 10000 and stock 10' - Check if is possible to add a new product correctly. Test to see if addProduct function work as expected. Test that events are recived.

3. "..should add 10 more items to avocado stock, avocado stock should be 20' - Check if is possible to add stock to an existing product checking aginst expected values. Test to see if addStock function work properly. 

4. "..should remove all avocado stock, avocado stock should be 0" - Check if is possible to remove stock of an existing product. Test to see if removeStock function work as expected.

5. "..should notify that a product stock is unavailable" - Check the stock availability of an existing product. Test to see if checkStock function work properly. 

6. '..should withdraw balance correctly" - Check withdraw functionality is working correctly. Test owner balance before and after the transaction and check consistency. 


## Built With

* [Truffle Suite](https://truffleframework.com) - Truffle Suite Framework.
* [ganache-cli](https://github.com/trufflesuite/ganache-cli) - Ganache-cli (command line)
* [truffle react box](https://github.com/truffle-box/react-box) - Web app base.
* [OpenZeppelin-Solidity](https://github.com/OpenZeppelin/openzeppelin-solidity) (Pausable.sol, Destructible.sol, SafeMath.sol, Escrow.sol )

## Author
Gabriel Garcia

