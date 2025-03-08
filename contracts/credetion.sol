// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentCredentialVerification {

    struct Student {
        string studentName;
        string degree;
        bool isRegistered;
    }

    // Mapping to store student credentials by student ID
    mapping(string => Student) public studentCredentials;

    // Event to log student registration
    event StudentRegistered(string studentID, string studentName, string degree);

    // Function to register student credentials
    function registerStudent(string memory _studentName, string memory _studentID, string memory _degree) public {
        require(bytes(_studentName).length > 0, "Student name is required");
        require(bytes(_studentID).length > 0, "Student ID is required");
        require(bytes(_degree).length > 0, "Degree is required");

        // Check if the student is already registered
        require(!studentCredentials[_studentID].isRegistered, "Student is already registered");

        // Register the student credentials
        studentCredentials[_studentID] = Student({
            studentName: _studentName,
            degree: _degree,
            isRegistered: true
        });

        // Emit event for registration
        emit StudentRegistered(_studentID, _studentName, _degree);
    }

    // Function to verify student credentials
    function verifyStudent(string memory _studentID) public view returns (bool) {
        // Return true if the student is registered, false otherwise
        return studentCredentials[_studentID].isRegistered;
    }
}
