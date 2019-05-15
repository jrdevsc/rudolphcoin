const RudolphCoin = artifacts.require("./RudolphCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(RudolphCoin, 1000000);
};
