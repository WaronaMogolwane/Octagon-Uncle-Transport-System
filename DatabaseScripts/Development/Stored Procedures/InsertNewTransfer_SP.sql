CREATE DEFINER=`sqladmin`@`156.155.26.176` PROCEDURE `InsertNewTransfer`(
in _TransferCode varchar(45),
in _Amount INT,
in _Currency VARCHAR(20),
in _Status VARCHAR(20),
in _Reference VARCHAR(100),
in _Reason VARCHAR(100),
in _DateCreated DATETIME,
in _DateUpdated DATETIME,
in _TransactionType VARCHAR(50),
in _PaystackId INT
)
BEGIN
SET @TransferCount = (SELECT COUNT(*) FROM Transfers
WHERE Reference = _Reference);
IF(@TransferCount = 0)
THEN
INSERT INTO `Transfers`
(
`TransferCode`,
`Amount`,
`Currency`,
`Status`,
`Reference`,
`Reason`,
`DateCreated`,
`DateUpdated`,
`TransactionType`,
`PaystackId`)
VALUES
(
_TransferCode,
_Amount,
_Currency,
_Status,
_Reference,
_Reason,
_DateCreated,
_DateUpdated,
_TransactionType,
_PaystackId);
ELSE
UPDATE Transfers
SET
Status = _Status,
DateUpdated = _DateUpdated
WHERE Reference = _Reference
AND
TransferCode = _TransferCode;
END IF;
END