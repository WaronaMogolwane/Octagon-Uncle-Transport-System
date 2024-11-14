CREATE DEFINER=`sqladmin`@`156.155.26.176` PROCEDURE `InsertNewTransfer`(
in _TransferCode varchar(100),
in _UserId varchar(100),
in _Amount INT,
in _Currency VARCHAR(20),
in _Status VARCHAR(20),
in _Refernece VARCHAR(100),
in _Reason VARCHAR(100),
in _DateCreated DATETIME,
in _DateUpdated DATETIME,
in _TransactionType VARCHAR(50)
)
BEGIN
INSERT INTO `Transfers`
(
`TransferCode`,
`UserId`,
`Amount`,
`Currency`,
`Status`,
`Refernece`,
`Reason`,
`DateCreated`,
`DateUpdated`,
`TransactionType`)
VALUES
(
_UserId,
_Amount,
_Currency,
_Status,
_Refernece,
_Reason,
_DateCreated,
_DateUpdated,
_TransactionType);
END