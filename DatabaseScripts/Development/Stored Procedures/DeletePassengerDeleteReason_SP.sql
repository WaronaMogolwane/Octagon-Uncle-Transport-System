CREATE PROCEDURE `DeletePassengerDeleteReason` (_PassengerId VARCHAR(100))
BEGIN
	DELETE
    FROM PassengerDeleteReason
    WHERE PassengerId =_PassengerId;
END
