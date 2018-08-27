const MarketPlace = artifacts.require("./MarketPlace.sol");

contract('MarketPlace', async (accounts) => {

    it("..should add bob as admin", async () => {
        let instance = await MarketPlace.deployed();
        let bob = accounts[0];
        await instance.addAdmin.call(accounts[0]);
        let isAdmin = instance.admins[accounts[0]];
        assert.equal(isAdmin, true, "Bob was not added correctly");
     })

});