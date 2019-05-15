var RudolphCoin = artifacts.require('./RudolphCoin.sol');

contract('RudolphCoin', function(accounts){
  it('sets total supply upon deploy', function(){
    return RudolphCoin.deployed().then(function(instance){
      tokenInstance = instance;
      return tokenInstance.totalSupply();
    }).then(function(totalSupply){
      assert.equal(totalSupply.toNumber(), 1000000, 'Sets totalSupply to 1,000,000');
    })
  })
})
