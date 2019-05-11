pragma solidity >=0.4.18;
contract Data {
    address owner;

  struct dataObject {
    address submitter;
    uint256 data;
    uint date;
  }

  constructor() public{
      owner = msg.sender;
  }

  mapping (uint => dataObject) private idToData;


  modifier dataExisting(uint _id){
      require(idToData[_id].submitter != address(0));
      _;
  }
  modifier greaterThanZero(int _id) {
    require(_id >= 0);
    _;
  }

  modifier dataNew(uint _id){
      require(idToData[_id].submitter == address(0));
      _;
  }

  function dataWrite(uint _data, int _id) public greaterThanZero(_id) dataNew(uint(_id))  {
      uint hashedData = uint(keccak256(abi.encodePacked(_data, uint(now))));
      idToData[uint(_id)] = dataObject(msg.sender, hashedData, now);
  }

  function verifyHash(uint _data, int __id) public view greaterThanZero(__id) returns (bool) {
    uint _id = uint(__id);
    uint hashedData = uint(keccak256(abi.encodePacked(_data, idToData[_id].date)));
    if (hashedData == idToData[_id].data)
        return true;
      return false;
  }

  function getTimestamp(uint _id) public view dataExisting(_id) returns (uint) {
    return idToData[_id].date;
  }


  function dataExists(uint256 _id) public view returns(bool){
      if(idToData[_id].submitter != address(0))
          return true;
      return false;
  }

  function getDataDetails(uint _id) public view dataExisting(_id) returns(address,uint,uint){
      return (idToData[_id].submitter, idToData[_id].data, idToData[_id].date);
  }
}
