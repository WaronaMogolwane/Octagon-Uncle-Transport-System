CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertNewTransaction`(
in _TransactionId varchar(100),
in _UserId varchar(100),
in _Amount INT,
in _Currency VARCHAR(50),
in _Status VARCHAR(20),
in _Reference varchar(100),
in _DateCreated DATETIME,
in _DatePaid DATETIME,
in _TransactionType VARCHAR(50)
)
BEGIN
INSERT INTO `Transaction`
(
`TransactionId`,
`UserId`,
`Amount`,
`Currency`,
`Status`,
`Reference`,
`DateCreated`,
`DatePaid`,
`TransactionType`)
VALUES
(_TransactionId,
_UserId,
_Amount,
_Currency,
_Status,
_Reference,
_DateCreated,
_DatePaid,
_TransactionType)
ON DUPLICATE KEY UPDATE
Status = _Status,
DatePaid = _DatePaid;
END