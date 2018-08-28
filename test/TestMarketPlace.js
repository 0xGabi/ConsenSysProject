const MarketPlace = artifacts.require("./MarketPlace.sol");
const Store = artifacts.require("./Store.sol");

contract("MarketPlace", async (accounts) => {

  const owner = accounts[0];
  const Bob = accounts[1];
  const Alice = accounts[2];
  const Clair = accounts[3];
  const Dan = accounts[4];

  let instance = null;
  
  before(async function() {
    instance = await MarketPlace.deployed();
  });

  it("...contract ower should be correct.", async () => {
    let contractOwner = await instance.owner.call();
    assert.equal(owner, contractOwner, "The owner is not correct.");
  });

  it("...should add Alice as admin.", async () => {
    await instance.addAdmin(Alice, {from: owner});
    let userRole = await instance.getUserRole.call({from: Alice});
    assert.equal(userRole, 0, "Alice was not added as admin.");
  });

  it("...should add Bob as store owner.", async () => {
    await instance.addStoreOwner(Bob, {from: owner});
    let userRole = await instance.getUserRole.call({from: Bob});
    assert.equal(userRole, 1, "Bob was not added as store owner.");
  });

  it("...should recognize Clair as shopper.", async () => {
    let userRole = await instance.getUserRole.call({from: Clair});
    assert.equal(userRole, 2, "Clair was not recognized as a shopper.");
  });

  it("...owner (Bob) should create a new store with name store1.", async () => {
    await instance.addStore("store1", {from: Bob});
    let storesAddress = await instance.getStores({from: Bob});
    let store = await Store.at(storesAddress[0]);
    let storeName = await store.storeName.call({from: Bob});
    assert.equal(storeName, "store1", "Store with name store1 was not added correctly.");
  });

  it("...owner (Bob) should see 4 stores.", async () => {
    // We already add the store1 store, so we add 3 more
    await instance.addStore("store2", {from: Bob});
    await instance.addStore("store3", {from: Bob});
    await instance.addStore("store4", {from: Bob});
    let storesAddress = await instance.getStores({from: Bob});
    const numberOfStores = await storesAddress.length;
    assert.equal(numberOfStores, 4, "The owner do not see 4 stores.");
  });

  it("...shooper (Clair) should see Bob 4 stores and Dan new store, 5 in total.", async () => {
    await instance.addStoreOwner(Dan, {from: owner});
    await instance.addStore("store5", {from: Dan});
    let shopperStores = await instance.getStores({from: Clair});
    let BobStores = await instance.getStores({from: Bob});
    let DanStores = await instance.getStores({from: Dan});
    const numShopper = await shopperStores.length;
    const numBob = await BobStores.length;
    const numDan = await DanStores.length;
    assert.equal(numShopper, numBob + numDan , "Shopper do not see the 5 stores.");
  });

});