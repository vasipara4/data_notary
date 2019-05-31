pragma solidity >=0.5.7;
// Enable the ABI v2 Coder
pragma experimental ABIEncoderV2;

contract Data {
   struct dataObject {
    address submitter;
    uint256 data;
    uint date;
    uint valueGwei;
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
    require(idToData[_id].valueGwei != 0);
    _;
  }


  //payable

  //send to contract
  function takeCopyrights(uint _id) canYouBuyCopyrights(_id) newCopyrightsAddressEmpty(_id) public payable {
    if ( msg.value == idToData[_id].valueGwei && (msg.value +  balances[idToData[_id].submitter] >= balances[idToData[_id].submitter])){
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
  function dataWrite(uint _data, uint _id, uint _valueGwei) public originalDataNew(_id)  {
      bytes32[2] memory ipfsAddress;
      //uint hashedData = uint(keccak256(abi.encodePacked(_data, uint(now))));
      idToData[_id] = dataObject(msg.sender, _data, now, _valueGwei, ipfsAddress);
      idIndexes.push(_id);
  }

  function addAddressIPFS(bytes32[2] memory _addressIPFS, uint _id) public onlySubmitter(_id){
    (idToData[_id].addressIPFS[0], idToData[_id].addressIPFS[1]) = (_addressIPFS[0],_addressIPFS[1]);
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
      return (idToData[_id].submitter, idToData[_id].data, idToData[_id].date, idToData[_id].valueGwei, idToData[_id].addressIPFS[0], idToData[_id].addressIPFS[1]);
  }

  function getAllIndexes() public view returns (uint[] memory){
     return idIndexes;
  }
  function getItemsBuyable() public view returns (dataObject[] memory) {
     uint[] memory indexes = getAllIndexes();
     dataObject[] memory items = new dataObject[](indexes.length);

    for(uint i=0; i < indexes.length;i++){
      if(idToData[indexes[i]].valueGwei != 0)
        items[i]= idToData[indexes[i]];
    }
    return items;
  }

  function getBalance (address _from) public view returns (uint){
     return balances[_from];
  }

  function getDataShareFromAddressID(address _owner, uint _id) public view returns (uint) {
    return  addressToCopyrights[_owner][_id].data;
  }


}
