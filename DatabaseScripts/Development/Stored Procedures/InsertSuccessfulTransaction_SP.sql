CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertSuccessfulTransaction`(
    IN _TransactionId BIGINT UNSIGNED,
    IN _UserId VARCHAR(255),
    IN _Amount DECIMAL(10, 2),
    IN _Currency VARCHAR(10),
    IN _Status VARCHAR(50),
    IN _Reference VARCHAR(255),
    IN _DateCreated DATETIME,
    IN _DatePaid DATETIME,
    IN _TransactionType VARCHAR(100)
)
BEGIN
    INSERT INTO SuccessfulTransactions (
        TransactionId,
        UserId,
        Amount,
        Currency,
        Status,
        Reference,
        DateCreated,
        DatePaid,
        TransactionType
    )
    VALUES (
        _TransactionId,
        _UserId,
        _Amount,
        _Currency,
        _Status,
        _Reference,
        _DateCreated,
        _DatePaid,
        _TransactionType
    )
    ON DUPLICATE KEY UPDATE
        UserId = _UserId,
        Amount = _Amount,
        Currency = _Currency,
        Status = _Status,
        DatePaid = _DatePaid,
        TransactionType = _TransactionType;
END