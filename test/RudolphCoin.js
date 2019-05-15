var RudolphCoin = artifacts.require('./RudolphCoin.sol');

contract('RudolphCoin', function(accounts){
  var tokenInstance;

  it('initalizes the contract with the correct values', function(){
    return RudolphCoin.deployed().then(function(instance){
      tokenInstance = instance;
      return tokenInstance.name();
    }).then(function(name){
      assert.equal(name, "Rudolph Coin", 'has the correct name');
      return tokenInstance.symbol();
    }).then(function(symbol){
      assert.equal(symbol, 'RDF', 'has the correct symbol');
      return tokenInstance.standard();
    }).then(function(standard){
      assert.equal(standard, 'Rudolph Coin v1.0', 'has correct standard');
    })
  })

  it('allocates inital supply upon deploy', function(){
    return RudolphCoin.deployed().then(function(instance){
      tokenInstance = instance;
      return tokenInstance.totalSupply();
    }).then(function(totalSupply){
      assert.equal(totalSupply.toNumber(), 1000000, 'Sets totalSupply to 1,000,000');
      return tokenInstance.balanceOf(accounts[0]);
    }).then(function(adminBalance){
      assert.equal(adminBalance.toNumber(), 1000000, 'It allocates the initial supply to the admin account')
    })
  })

it('Transfers ownership', function(){
  return RudolphCoin.deployed().then(function(instance){
    tokenInstance = instance;
    //test require statement by transfer something larger than senders blance
    return tokenInstance.transfer.call(accounts[1], 999999999999)
  }).then(assert.fail).catch(function(error){
    assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
    return tokenInstance.transfer.call(accounts[1], 250000, {from: accounts[0]});
  }).then(function(success){
    assert.equal(success, true, 'it returns true');
    return tokenInstance.transfer(accounts[1], 250000, {from: accounts[0] });
  }).then(function(reciept){
    assert.equal(reciept.logs.length, 1, 'triggers one event');
    assert.equal(reciept.logs[0].event, 'Transfer', 'sould be the "transfer" event');
    assert.equal(reciept.logs[0].args._from, accounts[0], 'logs the account tokens are transfered from');
    assert.equal(reciept.logs[0].args._to, accounts[1], 'logs the account tokens are transfered to');
    assert.equal(reciept.logs[0].args._value, 250000, 'logs the transfer amount');
    return tokenInstance.balanceOf(accounts[1]);
  }).then(function(balance){
    assert.equal(balance.toNumber(), 250000, 'Adds the amount to the receiving account');
    return tokenInstance.balanceOf(accounts[0]);
  }).then(function(balance){
    assert.equal(balance.toNumber(), 750000, 'deducts the amount from sending account');
  });
});









})
