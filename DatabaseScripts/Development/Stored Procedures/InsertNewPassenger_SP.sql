CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertNewPassenger`(in _PassengerId varchar(100),in _FirstName varchar(100),in _LastName varchar(100),in _Age int(2),in _HomeAddress varchar(100),in _DestinationAddress varchar(100),in _ParentId varchar(100),in _BusinessId varchar(100))
BEGIN
INSERT INTO Passenger
(PassengerId, FirstName, LastName, Age, HomeAddress, DestinationAddress, ParentId, BusinessId)
VALUES
(_PassengerId, _FirstName, _LastName, _Age, _HomeAddress, _DestinationAddress, _ParentId, _BusinessId);
END