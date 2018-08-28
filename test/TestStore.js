var Store = artifacts.require("./Store.sol");

contract("Store", function(accounts) {

  const owner = accounts[0]
  const storeName = "testStore"
  let instance = null;

  before("setup contract for test", async() => {
    instance = await Store.new(owner, storeName);
  })

  it("..store name should be storeTest", async() => {
    let storeName = await instance.getStoreName.call({from: owner})
    assert.equal(storeName, "storeTest", "Store name is not storeTest")
  });

  it('..should add a new product with id 1, name avocado, price 10000 and stock 10', async() => {
    await instance.addProduct(1,"avocado",10000, 10, { from: owner })
    const new = await instance.NewProductAdded()
    const log = await new Promise(function(resolve, reject) {
        NewProductAdded.watch(function(error, log){ resolve(log);});
    });
    const productId = log.args.productId.toNumber()
    const product = await storeContractInstance.getProduct(productId, {from: owner})
    const productName = web3.toUtf8(product[0])
    const productPrice = product[1]
    const productStock = product[2]

    assert.equal(productId, 1, "Incorrect Product id")
    assert.equal(productName, 'Carrot', "Incorrect Product name")
    assert.equal(productPrice, 15, "Incorrect Product price")
    assert.equal(productStock, 10, "Incorrect Product stock")
  })

  it('should add 5 more items to Carrot stock, carrot stock should be 15', async() => {
    await storeContractInstance.addProductStock(1, 5, { from: owner })
    const ProductQuantityAdded = await storeContractInstance.ProductQuantityAdded()

    const log = await new Promise(function(resolve, reject) {
        ProductQuantityAdded.watch(function(error, log){ resolve(log);});
    });
    const productStock = log.args.remainingStock.toNumber()

    assert.equal(productStock, 15, 'Incorrect Product stock')
  })

  it('should remove all Carrot stock, carrot stock should be 0', async() => {
    await storeContractInstance.removeProduct(1, 15, { from: owner })
    const ProductRemoved = await storeContractInstance.ProductRemoved()

    const log = await new Promise(function(resolve, reject) {
        ProductRemoved.watch(function(error, log){ resolve(log);});
    });
    const productStock = log.args.remainingStock.toNumber()

    assert.equal(productStock, 0, 'Incorrect Product stock')
  })

  it('should notify that a product stock is unavailable', async() => {
    await storeContractInstance.checkProductAvailability(1, 10, { from: owner })
    const ProductQuantityAvailable = storeContractInstance.ProductQuantityAvailable()
    const log = await new Promise(function(resolve, reject) {
        ProductQuantityAvailable.watch(function(error, log){ resolve(log);});
    });
    const isAvailable = log.args.available
    console.log(isAvailable)
    assert.equal(isAvailable, false, 'Product stock is available')
  })

});