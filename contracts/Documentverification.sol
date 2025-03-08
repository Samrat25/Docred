// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentVerification {
    mapping(bytes32 => bool) private documentHashes;

    event DocumentRegistered(bytes32 indexed hash);
    event DocumentVerified(bytes32 indexed hash, bool verified);

    function registerDocument(bytes32 _hash) public {
        require(!documentHashes[_hash], "Document already registered.");
        documentHashes[_hash] = true;
        emit DocumentRegistered(_hash);
    }

    function verifyDocument(bytes32 _hash) public view returns (bool) {
        return documentHashes[_hash];
    }
}