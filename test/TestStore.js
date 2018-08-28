var Store = artifacts.require("./Store.sol");

contract("Store", async (accounts) => {

  const owner = accounts[0]
  const storeName = "testName"
  let instance = null;

  before("setup contract for test", async() => {
    instance = await Store.new(owner, storeName);
  })

  it("..store name should be testName", async() => {
    let storeName = await instance.storeName.call({from: owner});
    assert.equal(storeName, "testName", "Store name is not storeTest");
  });

  it("..should add a new product with id 1, name avocado, price 10000 and stock 10", async() => {
    await instance.addProduct(1,"avocado",10000, 10, { from: owner });
    const ProductAdded = instance.ProductAdded();
    const log = await new Promise(function(resolve, reject) {
      ProductAdded.watch(function(error, log){ resolve(log);});
    });
    const productId = log.args.id.toNumber();
    const product = await instance.getProduct(productId, {from: owner});
    const productName = product[0];
    const productPrice = product[1];
    const productStock = product[2];

    assert.equal(productId, 1, "Incorrect Product id");
    assert.equal(productName, "avocado", "Incorrect Product name");
    assert.equal(productPrice, 10000, "Incorrect Product price");
    assert.equal(productStock, 10, "Incorrect Product stock");
  })
  
  it("..should add 10 more items to avocado stock, avocado stock should be 20", async() => {
    await instance.addStock(1, 10, { from: owner });
    const StockUpdated = instance.StockUpdated();
    const log = await new Promise(function(resolve, reject) {
        StockUpdated.watch(function(error, log){ resolve(log);});
    });
    const stock = log.args.stock.toNumber();

    assert.equal(stock, 20, "Incorrect Product stock");
  })
  
  it("..should remove all avocado stock, avocado stock should be 0", async() => {
    await instance.removeStock(1, 20, { from: owner });
    const ProductRemoved = await instance.ProductRemoved();
    const log = await new Promise(function(resolve, reject) {
      ProductRemoved.watch(function(error, log){ resolve(log);});
    });
    const stock = log.args.stock.toNumber();

    assert.equal(stock, 0, "Incorrect Product stock");
  })
  
  it('..should notify that a product stock is unavailable', async() => {
    await instance.checkStock(1, 10, { from: owner });
    const StockAvaiable = instance.StockAvaiable();
    const log = await new Promise(function(resolve, reject) {
      StockAvaiable.watch(function(error, log){ resolve(log);});
    });
    const isAvailable = log.args.available;
    assert.equal(isAvailable, false, "Product stock is available");
  })

  // it("should withdraw ether correctly", async() => {
  //   //Owner Balance before transaction
  //   const ownerBalanceBefore = web3.fromWei(web3.eth.getBalance(owner).toNumber())
  //   const amountToWithdraw = web3.toBigNumber(web3.toWei(20, 'ether'))
  //   const transaction = await instance.withdraw(amountToWithdraw, {from: owner})

  //   //Get gasCost
  //   const gasUsed = web3.eth.getTransactionReceipt(transaction['tx']).gasUsed
  //   const gasPrice = web3.eth.getTransaction(transaction['tx']).gasPrice
  //   const gasCost = web3.fromWei((gasUsed * gasPrice))

  //   //Event
  //   const WithdrawCorrectly = instance.WithdrawCorrectly()
  //   const log = await new Promise(function(resolve, reject) {
  //     WithdrawCorrectly.watch(function(error, log){ resolve(log) })
  //   });

  //   const ownerBalanceAfter = web3.fromWei(web3.eth.getBalance(owner).toNumber())

  //   const amount = web3.fromWei(log.args.withdraw.toNumber())

  //   //fromWei method returns strings, have to append a '+' to add the values
  //   const expectedBalance = +amount + +ownerBalanceBefore - +gasCost

  //   assert.equal(expectedBalance, ownerBalanceAfter, 'Amount not withdrawn correctly')
  // })
  

});