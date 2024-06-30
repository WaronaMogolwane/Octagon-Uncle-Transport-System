CREATE DEFINER=`sqladmin`@`%` PROCEDURE `AutoTruncateTempPassengerSchedule`()
BEGIN	
UPDATE Passenger 
SET 
    IsAssigned = '0'
WHERE
    PassengerId IN (SELECT 
            PassengerId
        FROM
            TempPassengerSchedule);   

	TRUNCATE TABLE TempPassengerSchedule;
END