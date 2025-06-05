CREATE DEFINER=`sqladmin`@`%` PROCEDURE `GetMonthlyPaymentDetails`(
  IN _UserId VARCHAR(50)
)
BEGIN 
  -- Declare variables
  DECLARE _Amount VARCHAR(50);
  DECLARE _PaymentDay INT;
  DECLARE _LastPaymentDate DATE;
  DECLARE _NextPaymentDate VARCHAR(10); -- Use VARCHAR to control format
  DECLARE _PaymentFailed BOOLEAN DEFAULT FALSE;

  -- Get Amount and PaymentDay in one query
  SELECT CONCAT(Amount), PaymentDay 
  INTO _Amount, _PaymentDay
  FROM PaymentsSchedule 
  WHERE UserId = _UserId AND IsActive = '1'
  LIMIT 1;

  -- Get LastPaymentDate
  SELECT MAX(DatePaid) 
  INTO _LastPaymentDate
  FROM SuccessfulTransaction 
  WHERE UserId = _UserId AND Status = 'success' AND Amount = _Amount;

  -- Generate NextPaymentDate with correct formatting
  SET _NextPaymentDate = DATE_FORMAT(
    DATE_ADD(IFNULL(_LastPaymentDate, '1000-01-01'), INTERVAL 1 MONTH), 
    CONCAT('%Y-%m-', _PaymentDay)
  );

  -- Fix date format to match expected output (remove leading zero from day)
  SET _NextPaymentDate = DATE_FORMAT(STR_TO_DATE(_NextPaymentDate, '%Y-%m-%d'), '%Y-%m-%e');

  -- Check if payment failed
  IF (MONTH(IFNULL(_LastPaymentDate, '1000-01-01')) <> MONTH(CURDATE())) THEN
    SET _NextPaymentDate = DATE_FORMAT(CURRENT_DATE, CONCAT('%Y-%m-', _PaymentDay));
    SET _NextPaymentDate = DATE_FORMAT(STR_TO_DATE(_NextPaymentDate, '%Y-%m-%d'), '%Y-%m-%e');

    IF (_NextPaymentDate < CURDATE() OR IFNULL(_LastPaymentDate, '1000-01-01') < (_NextPaymentDate - INTERVAL 1 MONTH)) THEN
      SET _PaymentFailed = TRUE;
    END IF;
  END IF;

  -- Return results with exact formatting
  SELECT 
    _Amount AS Amount,  -- Ensure Amount stays in string format (no decimal places)
    _NextPaymentDate AS NextPaymentDate,  -- Correct day format
    _PaymentFailed AS PaymentFailed;
END