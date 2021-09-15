//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.16;

contract StorageSystem {

  uint public totalFiles = 0; 
  mapping(uint => fileDetails) public files;

  struct fileDetails {
    string fileName;
    string fileHash;
    string fileType;
    string fileDescription;
    uint fileId;
    uint fileSize;
    uint uploadTime;
    address payable uploader;
  }

  event fileAdded( string fileName, string fileHash, string fileType, string fileDescription, uint fileId, uint fileSize, uint uploadTime, address payable uploader);

    constructor() public {
  }

  function addingFile( string memory _fileName, string memory _fileHash, string memory _fileType, string memory _fileDescription, uint _fileSize) public {

    require(bytes(_fileHash).length > 0,'Hash is required');
    require(bytes(_fileName).length > 0,'Hash is required');
    require(bytes(_fileType).length > 0,'Hash is required');
    require(bytes(_fileDescription).length > 0,'Hash is required');
    require(_fileSize > 0,'Hash is required');
    require(msg.sender !=address(0),'Uploader should not be the deployer');
    totalFiles++;
    files[totalFiles] = fileDetails( _fileName, _fileHash, _fileType, _fileDescription, totalFiles,  _fileSize, block.timestamp, msg.sender);
    emit fileAdded( _fileName, _fileHash, _fileType, _fileDescription, totalFiles,  _fileSize, block.timestamp, msg.sender);
  }
}