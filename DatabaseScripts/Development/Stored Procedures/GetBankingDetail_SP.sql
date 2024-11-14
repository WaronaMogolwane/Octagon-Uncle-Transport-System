CREATE PROCEDURE `GetBankingDetail` (_BusinessId VARCHAR(100))
BEGIN
	SELECT *
    FROM BankingDetail
    WHERE BusinessId = _BusinessId;
END
