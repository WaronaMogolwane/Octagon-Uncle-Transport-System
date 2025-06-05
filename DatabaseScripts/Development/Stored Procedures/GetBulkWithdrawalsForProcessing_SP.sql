CREATE DEFINER=`root`@`localhost` PROCEDURE `GetBulkWithdrawalsForProcessing`()
BEGIN
    SELECT
        t.TransferCode,
        t.Amount,
        t.Reason,
        t.Reference,
        tr.RecipientCode
    FROM
        Transfers t
    JOIN
        TransferRecipient tr ON t.PaystackId = tr.PaystackId
    WHERE
        t.Status = 'pending';
END