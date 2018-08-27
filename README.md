# Market Place

Create an online marketplace that operates on the blockchain.

There are a list of stores on a central marketplace where shoppers can purchase goods posted by the store owners.

The central marketplace is managed by a group of administrators. Admins allow store owners to add stores to the marketplace. Store owners can manage their store’s inventory and funds. Shoppers can visit stores and purchase goods that are in stock using cryptocurrency. 


## What it does

It satisfies the following:  
A. Identification.  
B. Market Place functionality for admins, owners y shoppers.
C. Allow admins to add new owners.
C. Allow owners to create stores and manage products.
D. Allow shoppers to view stores and buy products.  


### Contracts on the project: 

1. MarketPlace.sol - Provide Market Place funcionality.
2. Store.sol - Store functionality.
3. Escrow.sol - Manage the payments on the store as a deposit for the store owner.
4. Pausable.sol - Allowing an emergency stop pattern.
5. SafeMath.sol - Library, allowing cover of overflows in store.


## Getting Started

These prerequisites and repository files should allow a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites 

1. Truffle install - https://github.com/trufflesuite/truffle

Truffle should be installed properly on your machine.   See the above link for how to do this.

2. ganache-cli install - https://github.com/trufflesuite/ganache-cli

Ganache-cli should be installed properly on your machine.  See the above link for how to do this.  The GUI Ganache can also be used.

3. Project files (this git collection) in a local directory.

Unzip/Clone the Repository to a local directory

4. MetaMask install - https://metamask.io/

Install MetaMask. See above link for how to do this.

### Installing

1. Copy files to marketplace Directory
2. run ganache-cli with following mnemonic "hild relax seven grocery thumb glove age body tube width grief clap"

```
ganache-cli --port 8545 --mnemonic "hild relax seven grocery thumb glove age body tube width grief clap"
```

3. Set Up MetaMask for project -
    import with seed phrase "hild relax seven grocery thumb glove age body tube width grief clap"
    1. change the network to Private Network, set port to: 8545
    2. This will set account[0] for you. 

4. Compile truffle
Compile the project in standard manner from the directory where the files are located.

```
truffle compile
```

5. Migrate
Migrate the project to the blockchain.
```
truffle migrate
```

6. Tests
A series of solidity tests for the contract files, testing basic contract functionality.

```
truffle test
```

5. Run Development Web Server for project.
Run the following command in the directory where you compiled the package from.

```
npm run start
```


## Tests
There are 22 automated tests with these contracts, designed around the idea of Unit Testing, and are as follows:  
### CredentialOrgFactory Automated Tests  
1. testCheckContractOwner - Checks Owner address vs expected, Makes sure that the contract was deployed to the correct owner.
2. testSelectCredentialOrgCount -Tests to see if INIT records were created upon deploy.  Data existence check.
3. testSelectCredentialOrgTestRecord -Tests to see if INIT record values were set correctly.  Data Value correctness checking.
4. testInsertCredentialOrg - Test to see if credentialling Org can be created.  A Local instance invoked to allow onlyOwner modifer to work.
5. testSelectCredentialOrgDataOnNewInsert - Test to see newly inserted credentialing ord data was set correctly.  A Local instance invoked to allow onlyOwner modifer to work.
6. testSelectCredentialOrgCountAfterInsert - Tests to see if count increased after insert.  A local instance invoked to allow onlyOwner modifer to work.
7. testSelectCredentialOrgInvalidPosition - Test to see credentialing ord data from wrong bad position returns blanks and zeros.
8. testIsCredentialOrgInValid - Test to see if invalid credentialling org address IS a credentialling org (should return false)
9. testSelectValidCredentialOrgByAddress - Test to see if credentialling org can be looked up by valid credentialling org address
10. testSelectInvalidCredentialOrgByAddress -Test to see if invalid credentialling org can be looked up by address (blank means no return values)

### CredentialFactory Automated Tests
1. testCheckContractOwner - Checks Owner address vs expected, Makes sure that the contract was deployed to the correct owner.
2. testSelectValidOrgCredentialCount - Checks Valid CredentialOrg Credential Count, checks if inital conditions are correct from migration
3. testSelectInvalidOrgCredentialCount - Checks Invalid CredentialOrg Credential Count, checks to see if return from invalid Org returns 0.
4. testSelectCredentialInitRecord -Checks Init Record Data value correctness, data validation of inital state.
5. testInsertCredentialRecordTests to see if Credential Records can be inserted. limited to Owner atm).  A Local instance invoked to allow onlyOwner modifer to work.
6. testSelectCredentialInsertedRecord - Tests to see if Credential Record just inserted's value was correct.   A Local instance invoked to allow onlyOwner modifer to work.

### ApplicantFactory Automated Tests
1. testCheckContractOwner - Checks Owner address vs expected, Makes sure that the contract was deployed to the correct owner.
2. testCreateApplicant - Checks to see if an Applicant can be created.
3. testSelectValidApplicantByOrgAndPosition - Checks a Valid applicant by org and position (previous test created)
4. testSelectInValidApplicantByOrgAndPosition - Checks to see that InvalidApplicant Lookup returns 0 for the student Address
5. testSelectValidOrgApplicantCount - Checks the Valid Applicant Count by passed in Org.
6. testSelectInvalidOrgApplicantCount - Checks a call to Applicant Count by a non credential org.


I can think of many more tests (like pausable testing, and others), beyond Unit testing and into Functional Testing.  The react site helped with my Javascript, and so i'll work on that to begin some functional tests.  Round 2 will also include further access control tightening through the use of modifiers beyond onlyOwner. Note: this is round one of likely three, before i'll be 'satisfied' with the final set of contracts.

## Built With

* [Truffle Suite](https://truffleframework.com) - Truffle Suite Framework.
* [ganache-cli](https://github.com/trufflesuite/ganache-cli) - Ganache-cli (command line)
* [truffle react box](https://github.com/truffle-box/react-box) - Web app base.
* [OpenZeppelin-Solidity](https://github.com/OpenZeppelin/openzeppelin-solidity) (Pausable.sol, Destructible.sol, SafeMath.sol, Escrow.sol )

## Author
Gabriel Garcia

