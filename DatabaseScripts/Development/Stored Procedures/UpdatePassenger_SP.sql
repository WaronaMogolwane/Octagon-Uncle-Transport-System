CREATE DEFINER=`sqladmin`@`%` PROCEDURE `UpdatePassenger`(in _PassengerId varchar(100),in _FirstName varchar(100),in _LastName varchar(100),in _Age int,in _HomeAddress varchar(100),in _DestinationAddress varchar(100))
BEGIN
UPDATE Passenger  
 SET FirstName = _FirstName,
  	 LastName  = _LastName,
  	 Age  = _Age,
	 HomeAddress  = _HomeAddress,
  	 DestinationAddress  = _DestinationAddress 
WHERE PassengerId  = _PassengerId;
END