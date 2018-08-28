 ## Tests
 
 ### TestMarketPlace  

1. "...contract ower should be correct" - Checks Owner address vs expected. Makes sure that the contract was deployed to the correct owner.

2. "...should add Alice as admin." - Check if Alice is correctlly added as admin. Make sure addAdmin function is working correctly and getUserRole return ADMIN role.

3. "...should add Bob as owner." - Check if Bob is correctlly added as store owner. Make sure addStoreOwner function is working correctly and getUserRole return OWNER role.

4. "...should recognize Clair as shopper." - Check if Clair is recognize as shopper. Make sure getUserRole return SHOPPER role.

5. "...owner (Bob) should create a new store with name store1." - Check that an store owner add a new store correctly. Test to see if addStore function work as expected and getStores return the stores associated to the store owner provide as parameter.

6. "...owner (Bob) should see 4 stores." - Check that store owner with 4 stores can see all them. Test that getStores correctly return multiple addresses.

7. "...shooper (Clair) should see Bob 4 stores and Dan new store, 5 in total." - Check that a shopper can see stores of multiples store owners. Test that getStores for a role of type shopper return all the stores created.


### TestStore

1. 


2. 


3. 


4. 


5. 


6. 


