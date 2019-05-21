pragma solidity >=0.5.2;

// Enable the ABI v2 Coder
pragma experimental ABIEncoderV2;

contract Data {
    address private owner;

  struct dataObject {
    address submitter;
    uint256 data;
    uint date;
    bytes32[2] addressIPFS;
  }

  constructor() public{
      owner = msg.sender;
  }

  mapping (uint => dataObject) private idToData;



  //MODIFIERS SECTION
  modifier dataExisting(uint _id){
      require(idToData[_id].submitter != address(0));
      _;
  }

  modifier dataNew(uint _id){
      require(idToData[_id].submitter == address(0));
      _;
  }

  modifier onlySubmitter(uint _id) {
    require(msg.sender == idToData[_id].submitter);
    _;
  }
  modifier onlyOwner(){
    require(msg.sender == owner);
    _;
  }


  //FUNCTIONS SECTION
  function dataWrite(uint _data, uint _id) public dataNew(_id)  {
      bytes32[2] memory ipfsAddress;
      uint hashedData = uint(keccak256(abi.encodePacked(_data, uint(now))));
      idToData[_id] = dataObject(msg.sender, hashedData, now, ipfsAddress);
  }

  function addAddressIPFS(bytes32[2] memory _addressIPFS, uint _id) public onlySubmitter(_id){
    (idToData[_id].addressIPFS[0], idToData[_id].addressIPFS[1]) = (_addressIPFS[0],_addressIPFS[1]);
  }

  function verifyHash(uint _data, uint _id) public view  returns (bool) {
    uint hashedData = uint(keccak256(abi.encodePacked(_data, idToData[_id].date)));
    if (hashedData == idToData[_id].data)
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

  function getTimestamp(uint _id) public view dataExisting(_id) returns (uint) {
    return idToData[_id].date;
  }

  function getDataAddressIPFS(uint _id) public view dataExisting(_id) returns(bytes32,bytes32) {
    return (idToData[_id].addressIPFS[0],idToData[_id].addressIPFS[1]);
  }

  function getDataDetails(uint _id) public view dataExisting(_id) returns(address, uint, uint, bytes32, bytes32){
      return (idToData[_id].submitter, idToData[_id].data, idToData[_id].date, idToData[_id].addressIPFS[0], idToData[_id].addressIPFS[1]);
  }

  function deleteContract() public onlyOwner payable{
      //casting to address payable for solidity v5
      address payable addr = address(uint160(owner));
    selfdestruct(addr);
  }

}
