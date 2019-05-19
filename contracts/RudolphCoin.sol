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


  event Approval(
    address indexed _owner,
    address indexed _spender,
    uint256 _value
  );

  mapping(address => uint256) public balanceOf;

  //create allowance
  mapping(address => mapping(address => uint256)) public allowance;

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

  function approve(address _spender, uint256 _value) public returns(bool success){
    allowance[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }


    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
      //require _from has enough tokens
      require(_value <= balanceOf[_from]);
      //require allowance is big enough
      require(_value <= allowance[_from][msg.sender]);
      //change balance
      balanceOf[_from] -= _value;
      balanceOf[_to] += _value;

      //update allowance
      allowance[_from][msg.sender] -= _value;
      //tranfer event
      emit  Transfer(_from, _to, _value);

      //return bool
      return true;
    }

}
