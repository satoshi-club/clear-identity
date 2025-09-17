// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";
import { Reencrypt } from "@fhevm/solidity/lib/Reencrypt.sol";

contract ClearIdentity is SepoliaConfig {
    using FHE for *;
    
    struct IdentityProfile {
        euint32 profileId;
        euint32 age;
        euint32 verificationLevel;
        ebool isVerified;
        ebool isActive;
        string publicName;
        string publicBio;
        address owner;
        uint256 createdAt;
        uint256 lastUpdated;
    }
    
    struct IdentityAttribute {
        euint32 attributeId;
        euint32 profileId;
        euint32 attributeType; // 0: Name, 1: Email, 2: Phone, 3: Address, 4: Document
        ebool isPrivate;
        ebool isVerified;
        string publicLabel;
        address verifier;
        uint256 timestamp;
    }
    
    struct VerificationRequest {
        euint32 requestId;
        euint32 profileId;
        euint32 attributeId;
        ebool isApproved;
        ebool isProcessed;
        address requester;
        address verifier;
        uint256 requestTime;
        uint256 processTime;
    }
    
    struct AccessLog {
        euint32 logId;
        euint32 profileId;
        ebool isAuthorized;
        address accessor;
        uint256 timestamp;
    }
    
    mapping(uint256 => IdentityProfile) public profiles;
    mapping(uint256 => IdentityAttribute) public attributes;
    mapping(uint256 => VerificationRequest) public verificationRequests;
    mapping(uint256 => AccessLog) public accessLogs;
    
    mapping(address => uint256) public userProfiles;
    mapping(address => euint32) public userReputation;
    mapping(address => bool) public authorizedVerifiers;
    
    uint256 public profileCounter;
    uint256 public attributeCounter;
    uint256 public requestCounter;
    uint256 public logCounter;
    
    address public owner;
    address public admin;
    
    event ProfileCreated(uint256 indexed profileId, address indexed owner);
    event AttributeAdded(uint256 indexed attributeId, uint256 indexed profileId, string publicLabel);
    event VerificationRequested(uint256 indexed requestId, uint256 indexed profileId, address indexed requester);
    event VerificationProcessed(uint256 indexed requestId, bool approved);
    event AccessGranted(uint256 indexed profileId, address indexed accessor);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin || msg.sender == owner, "Only admin can call this function");
        _;
    }
    
    modifier onlyAuthorizedVerifier() {
        require(authorizedVerifiers[msg.sender] || msg.sender == admin || msg.sender == owner, "Not authorized verifier");
        _;
    }
    
    constructor(address _admin) {
        owner = msg.sender;
        admin = _admin;
        authorizedVerifiers[msg.sender] = true;
        authorizedVerifiers[_admin] = true;
    }
    
    function createProfile(
        string memory _publicName,
        string memory _publicBio,
        externalEuint32 _age,
        bytes calldata _ageProof
    ) public returns (uint256) {
        require(bytes(_publicName).length > 0, "Public name cannot be empty");
        require(userProfiles[msg.sender] == 0, "Profile already exists");
        
        uint256 profileId = profileCounter++;
        
        profiles[profileId] = IdentityProfile({
            profileId: FHE.asEuint32(0), // Will be set properly later
            age: _age,
            verificationLevel: FHE.asEuint32(0),
            isVerified: FHE.asEbool(false),
            isActive: FHE.asEbool(true),
            publicName: _publicName,
            publicBio: _publicBio,
            owner: msg.sender,
            createdAt: block.timestamp,
            lastUpdated: block.timestamp
        });
        
        userProfiles[msg.sender] = profileId;
        
        emit ProfileCreated(profileId, msg.sender);
        return profileId;
    }
    
    function addAttribute(
        uint256 _profileId,
        uint256 _attributeType,
        string memory _publicLabel,
        externalEuint32 _encryptedData,
        bytes calldata _dataProof,
        bool _isPrivate
    ) public returns (uint256) {
        require(profiles[_profileId].owner == msg.sender, "Not profile owner");
        require(_attributeType <= 4, "Invalid attribute type");
        
        uint256 attributeId = attributeCounter++;
        
        attributes[attributeId] = IdentityAttribute({
            attributeId: FHE.asEuint32(0), // Will be set properly later
            profileId: FHE.asEuint32(_profileId),
            attributeType: FHE.asEuint32(_attributeType),
            isPrivate: FHE.asEbool(_isPrivate),
            isVerified: FHE.asEbool(false),
            publicLabel: _publicLabel,
            verifier: address(0),
            timestamp: block.timestamp
        });
        
        emit AttributeAdded(attributeId, _profileId, _publicLabel);
        return attributeId;
    }
    
    function requestVerification(
        uint256 _profileId,
        uint256 _attributeId,
        externalEuint32 _verificationData,
        bytes calldata _dataProof
    ) public returns (uint256) {
        require(profiles[_profileId].owner == msg.sender, "Not profile owner");
        require(attributes[_attributeId].profileId == FHE.asEuint32(_profileId), "Attribute not found");
        
        uint256 requestId = requestCounter++;
        
        verificationRequests[requestId] = VerificationRequest({
            requestId: FHE.asEuint32(0), // Will be set properly later
            profileId: FHE.asEuint32(_profileId),
            attributeId: FHE.asEuint32(_attributeId),
            isApproved: FHE.asEbool(false),
            isProcessed: FHE.asEbool(false),
            requester: msg.sender,
            verifier: address(0),
            requestTime: block.timestamp,
            processTime: 0
        });
        
        emit VerificationRequested(requestId, _profileId, msg.sender);
        return requestId;
    }
    
    function processVerification(
        uint256 _requestId,
        bool _approved,
        externalEuint32 _verificationScore,
        bytes calldata _scoreProof
    ) public onlyAuthorizedVerifier {
        require(verificationRequests[_requestId].requester != address(0), "Request not found");
        require(verificationRequests[_requestId].isProcessed == FHE.asEbool(false), "Already processed");
        
        verificationRequests[_requestId].isApproved = FHE.asEbool(_approved);
        verificationRequests[_requestId].isProcessed = FHE.asEbool(true);
        verificationRequests[_requestId].verifier = msg.sender;
        verificationRequests[_requestId].processTime = block.timestamp;
        
        if (_approved) {
            uint256 attributeId = uint256(FHE.decrypt(verificationRequests[_requestId].attributeId));
            attributes[attributeId].isVerified = FHE.asEbool(true);
            attributes[attributeId].verifier = msg.sender;
            
            // Update user reputation
            euint32 currentRep = userReputation[verificationRequests[_requestId].requester];
            euint32 newRep = currentRep + FHE.asEuint32(10);
            userReputation[verificationRequests[_requestId].requester] = newRep;
        }
        
        emit VerificationProcessed(_requestId, _approved);
    }
    
    function grantAccess(
        uint256 _profileId,
        address _accessor,
        externalEuint32 _accessLevel,
        bytes calldata _levelProof
    ) public {
        require(profiles[_profileId].owner == msg.sender, "Not profile owner");
        
        uint256 logId = logCounter++;
        
        accessLogs[logId] = AccessLog({
            logId: FHE.asEuint32(0), // Will be set properly later
            profileId: FHE.asEuint32(_profileId),
            isAuthorized: FHE.asEbool(true),
            accessor: _accessor,
            timestamp: block.timestamp
        });
        
        emit AccessGranted(_profileId, _accessor);
    }
    
    function revokeAccess(
        uint256 _profileId,
        address _accessor
    ) public {
        require(profiles[_profileId].owner == msg.sender, "Not profile owner");
        
        uint256 logId = logCounter++;
        
        accessLogs[logId] = AccessLog({
            logId: FHE.asEuint32(0), // Will be set properly later
            profileId: FHE.asEuint32(_profileId),
            isAuthorized: FHE.asEbool(false),
            accessor: _accessor,
            timestamp: block.timestamp
        });
    }
    
    function updateProfile(
        uint256 _profileId,
        string memory _publicName,
        string memory _publicBio
    ) public {
        require(profiles[_profileId].owner == msg.sender, "Not profile owner");
        
        profiles[_profileId].publicName = _publicName;
        profiles[_profileId].publicBio = _publicBio;
        profiles[_profileId].lastUpdated = block.timestamp;
    }
    
    function addAuthorizedVerifier(address _verifier) public onlyAdmin {
        authorizedVerifiers[_verifier] = true;
    }
    
    function removeAuthorizedVerifier(address _verifier) public onlyAdmin {
        authorizedVerifiers[_verifier] = false;
    }
    
    function getProfilePublicInfo(uint256 _profileId) public view returns (
        string memory publicName,
        string memory publicBio,
        address owner,
        uint256 createdAt,
        uint256 lastUpdated
    ) {
        return (
            profiles[_profileId].publicName,
            profiles[_profileId].publicBio,
            profiles[_profileId].owner,
            profiles[_profileId].createdAt,
            profiles[_profileId].lastUpdated
        );
    }
    
    function getAttributePublicInfo(uint256 _attributeId) public view returns (
        string memory publicLabel,
        address verifier,
        uint256 timestamp
    ) {
        return (
            attributes[_attributeId].publicLabel,
            attributes[_attributeId].verifier,
            attributes[_attributeId].timestamp
        );
    }
    
    // FHE decryption functions for authorized users
    function decryptAge(uint256 _profileId, bytes32 _publicKey) public view returns (bytes memory) {
        require(profiles[_profileId].owner == msg.sender || authorizedVerifiers[msg.sender], "Not authorized");
        return Reencrypt.reencrypt(profiles[_profileId].age, _publicKey, 0);
    }
    
    function decryptVerificationLevel(uint256 _profileId, bytes32 _publicKey) public view returns (bytes memory) {
        require(profiles[_profileId].owner == msg.sender || authorizedVerifiers[msg.sender], "Not authorized");
        return Reencrypt.reencrypt(profiles[_profileId].verificationLevel, _publicKey, 0);
    }
    
    function decryptUserReputation(address _user, bytes32 _publicKey) public view returns (bytes memory) {
        require(_user == msg.sender || authorizedVerifiers[msg.sender], "Not authorized");
        return Reencrypt.reencrypt(userReputation[_user], _publicKey, 0);
    }
}
