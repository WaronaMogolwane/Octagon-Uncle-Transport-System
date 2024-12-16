CREATE DEFINER=`sqladmin`@`156.155.26.176` PROCEDURE `GetMonthlyPaymentDetails`(
  IN _UserId VARCHAR(50)
)
BEGIN 
SET 
  @LastPaymentDate = (
    SELECT 
      DatePaid 
    FROM 
      Transaction 
    ORDER BY 
      DatePaid DESC 
    LIMIT 
      1
  );
IF (
  MONTH(@LastPaymentDate) = MONTH(
    CURDATE()
  )
) THEN 
SET 
  @PaymentFailed = false;
SET 
  @NextPaymentDate = DATE_ADD(
    @LastPaymentDate, INTERVAL 1 MONTH
  );
SELECT 
  ps.Amount, 
  @NextPaymentDate AS NextPaymentDate, 
  @PaymentFailed AS PaymentFailed 
FROM 
  Transaction t 
  INNER JOIN PaymentsSchedule ps ON ps.UserId = t.UserId 
WHERE 
  MONTH(t.DatePaid) = MONTH(
    CURDATE()
  ) 
  AND ps.IsActive = '1' 
ORDER BY 
  t.DatePaid DESC 
LIMIT 
  1;
ELSE 
SET 
  @PaymentDay = (
    SELECT 
      PaymentDay 
    FROM 
      PaymentSchedule 
    WHERE 
      UserId = _UserId
  );
SET 
  @PaymentFailed = true;
SET 
  @NextPaymentDate = (
    SELECT 
      DATE_FORMAT(CURRENT_DATE, '%Y-%m-15')
  );
SET 
  @Amount = (
    SELECT 
      Amount 
    FROM 
      PaymentSchedule 
    WHERE 
      UserId = @UserId 
      AND IsActive = '1' 
    ORDER BY 
      t.DatePaid DESC 
    LIMIT 
      1
  );
SELECT 
  @Amount, 
  @NextPaymentDate AS NextPaymentDate, 
  @PaymentFailed AS PaymentFailed;
END IF;
END