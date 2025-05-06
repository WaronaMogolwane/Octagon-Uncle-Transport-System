CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetMonthlyPaymentDetails`(
  IN _UserId VARCHAR(50)
)
BEGIN 
SET 
  @Amount = (
    SELECT 
      Amount 
    FROM 
      PaymentsSchedule 
    WHERE 
      UserId = _UserId 
      AND IsActive = '1' 
    LIMIT 
      1
  );
SET 
  @PaymentDay = (
    SELECT 
      PaymentDay 
    FROM 
      PaymentsSchedule 
    WHERE 
      UserId = _UserId
  );
SET 
  @LastPaymentDate = (
    SELECT 
      DatePaid 
    FROM 
      Transaction 
      WHERE UserId = _UserId
      AND Status = 'success'
    ORDER BY 
      DatePaid DESC 
    LIMIT 
      1
  );
  SET 
  @NextPaymentDate =  DATE_FORMAT(DATE_ADD(IFNULL(@LastPaymentDate, "1000-01-01"), INTERVAL 1 MONTH
  ), CONCAT('%Y-%m-', @PaymentDay));
SET 
  @PaymentFailed = false;
IF (
  MONTH(IFNULL(@LastPaymentDate, "1000-01-01")) = MONTH(
    CURDATE()
  )
) THEN 
SET 
  @PaymentFailed = false;
SELECT 
    @Amount AS Amount,
    @NextPaymentDate AS NextPaymentDate,
    @PaymentFailed AS PaymentFailed
FROM
    Transaction t
        INNER JOIN
    PaymentsSchedule ps ON ps.UserId = t.UserId
WHERE
    MONTH(DatePaid) = MONTH(CURDATE())
        AND ps.IsActive = '1'
        AND ps.UserId = _UserId
LIMIT 1;
ELSE 
SET 
  @NextPaymentDate = (
    SELECT 
      DATE_FORMAT(CURRENT_DATE, CONCAT('%Y-%m-', @PaymentDay))
  );
    IF(@NextPaymentDate < CURDATE())
  THEN
SET 
  @PaymentFailed = true;
  END IF;

SELECT 
    CONCAT(@Amount) AS Amount,
    @NextPaymentDate AS NextPaymentDate,
    @PaymentFailed AS PaymentFailed;
END IF;
END