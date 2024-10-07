CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertNewTransaction`(
in _TransactionId varchar(100),
in _UserId varchar(100),
in _Amount INT,
in _Currency VARCHAR(20),
in _Status VARCHAR(20),
in _Refernece varchar(100),
in _DateCreated TIMESTAMP,
in _DatePaid TIMESTAMP,
in _TransactionType VARCHAR(50)
)
BEGIN
INSERT INTO `Transaction`
(`TransactionId`,
`UserId`,
`Amount`,
`Currency`,
`Status`,
`Refernece`,
`DateCreated`,
`DatePaid`,
`TransactionType`)
VALUES
(_TransactionId,
_UserId,
_Amount,
_Currency,
_Status,
_Refernece,
_DateCreated,
_DatePaid,
_TransactionType);
END