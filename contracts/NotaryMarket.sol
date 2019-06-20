pragma solidity >=0.5.7;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

// Enable the ABI v2 Coder
pragma experimental ABIEncoderV2;

contract Marketplace{

  using SafeMath for uint256;

  struct dataObject {
    address submitter;
    uint data;
    uint date;
    uint valueWei;
    bytes32[2] addressIPFS;
    bytes32 title;
  }

  struct dataShare {
    uint256 data;
    uint date;
  }



  mapping (uint => dataObject) private dataToSubmission;
  mapping (address => mapping (uint => dataShare) ) private addressToCopyrights;
  uint[] private idIndexes;
  mapping(address => uint256) private balances;

  //MODIFIERS SECTION
  modifier originalDataExisting(uint _hash){
      require(dataToSubmission[_hash].submitter != address(0));
      _;
  }

  modifier originalDataNew(uint _hash){
      require(dataToSubmission[_hash].submitter == address(0));
      _;
  }

  modifier onlySubmitter(uint _hash) {
    require(msg.sender == dataToSubmission[_hash].submitter);
    _;
  }

  modifier newCopyrightsAddressEmpty(uint _hash) {
    require(addressToCopyrights[msg.sender][_hash].date == 0);
    _;
  }
  modifier canYouBuyCopyrights(uint _hash) {
    require(dataToSubmission[_hash].valueWei != 0);
    _;
  }


  //payable & money
  function takeCopyrights(uint _hash) canYouBuyCopyrights(_hash) newCopyrightsAddressEmpty(_hash) public payable {
    if ( msg.value >= dataToSubmission[_hash].valueWei){
      addressToCopyrights[msg.sender][_hash].data = dataToSubmission[_hash].data;
      addressToCopyrights[msg.sender][_hash].date = now;
      balances[dataToSubmission[_hash].submitter] = balances[dataToSubmission[_hash].submitter].add(msg.value);
    }
  }

    function withdrawFunds(uint amount) public returns(bool success) {
    require(balances[msg.sender] >= amount);
    balances[msg.sender] =  balances[msg.sender].sub(amount);
    msg.sender.transfer(amount);  // transfer
    return true;
}


  //WRITE DATA SECTION
  function dataWrite(uint _hash, uint _valueWei, bytes32 title) public originalDataNew(_hash)  {
      bytes32[2] memory ipfsAddress;
      //uint hashedData = uint(keccak256(abi.encodePacked(_data, uint(now))));
      dataToSubmission[_hash] = dataObject(msg.sender, _hash, now, _valueWei, ipfsAddress, title);
      idIndexes.push(_hash);
  }

  function addAddressIPFS(bytes32[2] memory _addressIPFS, uint _hash) public onlySubmitter(_hash){
    (dataToSubmission[_hash].addressIPFS[0], dataToSubmission[_hash].addressIPFS[1]) = (_addressIPFS[0],_addressIPFS[1]);
  }

  function updateWeiValue(uint _hash, uint _valueWei) public onlySubmitter(_hash){
    dataToSubmission[_hash].valueWei = _valueWei;
  }


  // VIEW FUNCTIONS

  function verifyHash(uint _hash, address _owner) public view  returns (bool) {
    //uint hashedData = uint(keccak256(abi.encodePacked(_data, dataToSubmission[_hash].date)));
    if (_hash == dataToSubmission[_hash].data && (dataToSubmission[_hash].submitter == _owner || addressToCopyrights[_owner][_hash].date != 0))
        return true;
      return false;
  }

  function dataExists(uint256 _hash) public view returns(bool){
      if(dataToSubmission[_hash].submitter != address(0))
          return true;
      return false;
  }

  function dataIsYourData(uint _hash, address _owner)  public view returns(bool){
      if(dataToSubmission[_hash].submitter == _owner)
          return true;
      return false;
  }

  function getTimestamp(uint _hash) public view originalDataExisting(_hash) returns (uint) {
    return dataToSubmission[_hash].date;
  }

  function getDataAddressIPFS(uint _hash) public view originalDataExisting(_hash) returns(bytes32,bytes32) {
    return (dataToSubmission[_hash].addressIPFS[0],dataToSubmission[_hash].addressIPFS[1]);
  }

  function getDataDetails(uint _hash) public view originalDataExisting(_hash) returns(address, uint, uint,uint, bytes32, bytes32){
      return (dataToSubmission[_hash].submitter, dataToSubmission[_hash].data, dataToSubmission[_hash].date, dataToSubmission[_hash].valueWei, dataToSubmission[_hash].addressIPFS[0], dataToSubmission[_hash].addressIPFS[1]);
  }

  function getNumBuyable() public view returns (uint){
      uint _numBuyable = 0;
     for(uint i=0; i < idIndexes.length;i++){
      if(dataToSubmission[idIndexes[i]].valueWei != 0)
        _numBuyable++;
    }
     return _numBuyable;
  }
  function getItemsBuyable(address _owner) public view returns (dataObject[] memory, uint[] memory, bool[] memory) {
    uint _numIndexes = getNumBuyable();
    bool[] memory _isYours = new bool[](_numIndexes);
    dataObject[] memory items = new dataObject[](_numIndexes);
    uint[] memory _hash = new uint[](_numIndexes);
    for(uint i=0; i < idIndexes.length; i++){
      if(dataToSubmission[idIndexes[i]].valueWei != 0){
        _numIndexes--;
        items[_numIndexes]= dataToSubmission[idIndexes[i]];
        _hash[_numIndexes]=idIndexes[i];
        if(dataToSubmission[idIndexes[i]].submitter == _owner || addressToCopyrights[_owner][idIndexes[i]].date != 0)
          _isYours[_numIndexes] = true;
      }
    }
    return (items, _hash, _isYours);
  }

  function getOwnItems(address _owner) public view returns (dataObject[] memory, bool[] memory, uint[] memory) {
    uint localId = 0;
    dataObject[] memory items = new dataObject[](idIndexes.length);
    uint[] memory _hash = new uint[](idIndexes.length);
    bool[] memory _isNotEmpty = new bool[](idIndexes.length);
    for(uint i=0; i < idIndexes.length;i++){
      if(dataToSubmission[idIndexes[i]].submitter == _owner){
        items[localId]= dataToSubmission[idIndexes[i]];
        _isNotEmpty[localId] = true;
        _hash[localId]=idIndexes[i];
        localId++;
      }
    }
    return (items, _isNotEmpty, _hash);
  }

  function getItemsPurchased(address _owner)public view returns (dataObject[] memory, bool[] memory) {
    uint localId = 0;
    dataObject[] memory items = new dataObject[](idIndexes.length);
    //uint[] memory _hash = new uint[](idIndexes.length);
    bool[] memory _isNotEmpty = new bool[](idIndexes.length);
    for(uint i=0; i < idIndexes.length;i++){
      if(addressToCopyrights[_owner][idIndexes[i]].date != 0){
        items[localId]= dataToSubmission[idIndexes[i]];
        items[localId].date = addressToCopyrights[_owner][idIndexes[i]].date;
        items[localId].valueWei = 0;
        _isNotEmpty[localId] = true;
        //_hash[localId]=idIndexes[i];
        localId++;
      }
    }
    return (items, _isNotEmpty);
  }

  function getBalance (address _from) public view returns (uint){
     return balances[_from];
  }

  function getDataShareFromAddressID(address _owner, uint _hash) public view returns (uint, uint) {
    return  (addressToCopyrights[_owner][_hash].data, addressToCopyrights[_owner][_hash].date);
  }


}
