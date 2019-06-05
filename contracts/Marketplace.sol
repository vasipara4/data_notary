pragma solidity >=0.5.7;
// Enable the ABI v2 Coder
pragma experimental ABIEncoderV2;

contract Data {
   struct dataObject {
    address submitter;
    uint256 data;
    uint date;
    uint valueWei;
    bytes32[2] addressIPFS;
  }

  struct dataShare {
    uint256 data;
    uint date;
  }



  mapping (uint => dataObject) private idToData;
  mapping (address => mapping (uint => dataShare) ) private addressToCopyrights;
  uint[] private idIndexes;
  mapping(address => uint256) private balances;

  //MODIFIERS SECTION
  modifier originalDataExisting(uint _id){
      require(idToData[_id].submitter != address(0));
      _;
  }

  modifier originalDataNew(uint _id){
      require(idToData[_id].submitter == address(0));
      _;
  }

  modifier onlySubmitter(uint _id) {
    require(msg.sender == idToData[_id].submitter);
    _;
  }

  modifier newCopyrightsAddressEmpty(uint _id) {
    require(addressToCopyrights[msg.sender][_id].date == 0);
    _;
  }
  modifier canYouBuyCopyrights(uint _id) {
    require(idToData[_id].valueWei != 0);
    _;
  }


  //payable & money
  function takeCopyrights(uint _id) canYouBuyCopyrights(_id) newCopyrightsAddressEmpty(_id) public payable {
    if ( msg.value == idToData[_id].valueWei && (msg.value +  balances[idToData[_id].submitter] >= balances[idToData[_id].submitter])){
      addressToCopyrights[msg.sender][_id].data = idToData[_id].data;
      addressToCopyrights[msg.sender][_id].date = now;
      balances[idToData[_id].submitter] += msg.value;
    }
  }

    function withdrawFunds(uint amount) public returns(bool success) {
    require(balances[msg.sender] >= amount); // guards up front
    balances[msg.sender] -= amount;         // optimistic accounting
    msg.sender.transfer(amount);            // transfer
    return true;
}


  //FUNCTIONS SECTION
  function dataWrite(uint _data, uint _id, uint _valueWei) public originalDataNew(_id)  {
      bytes32[2] memory ipfsAddress;
      //uint hashedData = uint(keccak256(abi.encodePacked(_data, uint(now))));
      idToData[_id] = dataObject(msg.sender, _data, now, _valueWei, ipfsAddress);
      idIndexes.push(_id);
  }

  function addAddressIPFS(bytes32[2] memory _addressIPFS, uint _id) public onlySubmitter(_id){
    (idToData[_id].addressIPFS[0], idToData[_id].addressIPFS[1]) = (_addressIPFS[0],_addressIPFS[1]);
  }

  function updateWeiValue(uint _id, uint _valueWei) public onlySubmitter(_id){
    idToData[_id].valueWei = _valueWei;
  }


  // VIEW FUNCTIONS

  function verifyHash(uint _data, uint _id) public view  returns (bool) {
    //uint hashedData = uint(keccak256(abi.encodePacked(_data, idToData[_id].date)));
    if (_data == idToData[_id].data)
        return true;
      return false;
  }

  function dataExists(uint256 _id) public view returns(bool){
      if(idToData[_id].submitter != address(0))
          return true;
      return false;
  }

  function dataIsYourData(uint _id)  public view returns(bool){
      if(idToData[_id].submitter == msg.sender)
          return true;
      return false;
  }

  function getTimestamp(uint _id) public view originalDataExisting(_id) returns (uint) {
    return idToData[_id].date;
  }

  function getDataAddressIPFS(uint _id) public view originalDataExisting(_id) returns(bytes32,bytes32) {
    return (idToData[_id].addressIPFS[0],idToData[_id].addressIPFS[1]);
  }

  function getDataDetails(uint _id) public view originalDataExisting(_id) returns(address, uint, uint,uint, bytes32, bytes32){
      return (idToData[_id].submitter, idToData[_id].data, idToData[_id].date, idToData[_id].valueWei, idToData[_id].addressIPFS[0], idToData[_id].addressIPFS[1]);
  }

  function getNumBuyable() public view returns (uint){
      uint _numBuyable = 0;
     for(uint i=0; i < idIndexes.length;i++){
      if(idToData[idIndexes[i]].valueWei != 0)
        _numBuyable++;
    }
     return _numBuyable;
  }
  function getItemsBuyable(address _owner) public view returns (dataObject[] memory, uint[] memory, bool[] memory) {
    uint _numIndexes = getNumBuyable();
    bool[] memory _isYours = new bool[](_numIndexes);
    dataObject[] memory items = new dataObject[](_numIndexes);
    uint[] memory _id = new uint[](_numIndexes);
    for(uint i=0; i < idIndexes.length; i++){
      if(idToData[idIndexes[i]].valueWei != 0){
        _numIndexes--;
        items[_numIndexes]= idToData[idIndexes[i]];
        _id[_numIndexes]=idIndexes[i];
        if(idToData[idIndexes[i]].submitter == _owner || addressToCopyrights[_owner][idIndexes[i]].date != 0)
          _isYours[_numIndexes] = true;
      }
    }
    return (items, _id, _isYours);
  }

  function getOwnItems(address _owner)public view returns (dataObject[] memory, bool[] memory, uint[] memory) {
    uint localId = 0;
    dataObject[] memory items = new dataObject[](idIndexes.length);
    uint[] memory _id = new uint[](idIndexes.length);
    bool[] memory _isNotEmpty = new bool[](idIndexes.length);
    for(uint i=0; i < idIndexes.length;i++){
      if(idToData[idIndexes[i]].submitter == _owner){
        items[localId]= idToData[idIndexes[i]];
        _isNotEmpty[localId] = true;
        _id[i]=idIndexes[localId];
        localId++;
      }
    }
    return (items, _isNotEmpty, _id);
  }

  function getItemsPurchased(address _owner)public view returns (dataObject[] memory, bool[] memory, uint[] memory) {
    uint localId = 0;
    dataObject[] memory items = new dataObject[](idIndexes.length);
    uint[] memory _id = new uint[](idIndexes.length);
    bool[] memory _isNotEmpty = new bool[](idIndexes.length);
    for(uint i=0; i < idIndexes.length;i++){
      if(addressToCopyrights[_owner][idIndexes[i]].date != 0){
        items[localId]= idToData[idIndexes[i]];
        items[localId].date = addressToCopyrights[_owner][idIndexes[i]].date;
        items[localId].valueWei = 0;
        _isNotEmpty[localId] = true;
        _id[localId]=idIndexes[i];
        localId++;
      }
    }
    return (items, _isNotEmpty, _id);
  }

  function getBalance (address _from) public view returns (uint){
     return balances[_from];
  }

  function getDataShareFromAddressID(address _owner, uint _id) public view returns (uint, uint) {
    return  (addressToCopyrights[_owner][_id].data, addressToCopyrights[_owner][_id].date);
  }


}
