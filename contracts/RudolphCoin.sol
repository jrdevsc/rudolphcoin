pragma solidity ^0.5.0;

contract RudolphCoin{

  uint256 public totalSupply;
  string public name = "Rudolph Coin";
  string public symbol = "RDF";
  string public standard = "Rudolph Coin v1.0";

  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
  );


  mapping(address => uint256) public balanceOf;

  constructor(uint256 _initialSupply) public {
    balanceOf[msg.sender] = _initialSupply;
    totalSupply  = _initialSupply;
  }

  //transfer
  function transfer(address _to, uint256 _value) public returns (bool success){
    //exception if account doesn't have enough
    require(balanceOf[msg.sender] >= _value);
    //transfer the balance
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;

    //transfer event
    emit Transfer(msg.sender, _to, _value);

    //returns bool
    return true;
  }


}
