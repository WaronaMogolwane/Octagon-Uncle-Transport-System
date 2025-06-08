CREATE DEFINER=`sqladmin`@`%` PROCEDURE `CheckPassengerSchedule`(IN _PassengerId VARCHAR(100))
BEGIN
    DECLARE count INT;
    DECLARE status INT;
    
SELECT 
    COUNT(*)
INTO count FROM
    PassengerSchedule
WHERE
    PassengerId = _PassengerId;
    
    IF count > 0 THEN
        SET status = 1;
    ELSE
        SET status = 0;
    END IF;
    
SELECT status AS status;
END