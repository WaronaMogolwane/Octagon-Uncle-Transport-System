CREATE PROCEDURE `InsertNewPasengerDeleteReason` (_PassengerId VARCHAR(100), _Reason VARCHAR(100))
BEGIN
	INSERT INTO PassengerDeleteReason
    (PassengerId, Reason)
    VALUES
	(_PassengerId, _Reason);    
END
