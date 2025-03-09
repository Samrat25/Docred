// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateIssuer {

    struct Certificate {
        uint256 id;
        string name;
        string degree;
        uint256 dateIssued;
        address recipient;
        bool isValid;
    }

    mapping(uint256 => Certificate) public certificates;
    uint256 public certificateCount;
    
    // Event to emit when a new certificate is issued
    event CertificateIssued(uint256 certificateId, string name, string degree, address recipient);

    // Issue a new certificate
    function issueCertificate(string memory _name, string memory _degree, address _recipient) public {
        certificateCount++;
        certificates[certificateCount] = Certificate(
            certificateCount,
            _name,
            _degree,
            block.timestamp,
            _recipient,
            true
        );
        emit CertificateIssued(certificateCount, _name, _degree, _recipient);
    }

    // Verify a certificate's validity
    function verifyCertificate(uint256 _certificateId) public view returns (bool) {
        Certificate memory cert = certificates[_certificateId];
        return cert.isValid;
    }

    // Invalidate a certificate (if needed)
    function invalidateCertificate(uint256 _certificateId) public {
        certificates[_certificateId].isValid = false;
    }

    // Get certificate details
    function getCertificate(uint256 _certificateId) public view returns (string memory, string memory, uint256, address, bool) {
        Certificate memory cert = certificates[_certificateId];
        return (cert.name, cert.degree, cert.dateIssued, cert.recipient, cert.isValid);
    }
}
