CREATE DEFINER=`sqladmin`@`156.155.26.176` PROCEDURE `InsertNewRefund`(
    IN _TransactionId INT,
    IN _Amount INT,
    IN _Currency VARCHAR(10),
    IN _MerchantNote VARCHAR(500),
    IN _CustomerNote VARCHAR(500),
    IN _TransactionReference VARCHAR(50)
)
BEGIN
 SET @Reference = _TransactionReference;
    -- Insert into Refund table
    INSERT INTO `Refund`
    (
        `TransactionId`,
        `Amount`,
        `Currency`,
        `MerchantNote`,
        `CustomerNote`
    )
    VALUES
    (
        _TransactionId,
        _Amount,
        _Currency,
        _MerchantNote,
        _CustomerNote
    );

    -- Call UpdateTransaction stored procedure
   
    CALL UpdateTransaction(@Reference, 'refunded');
END