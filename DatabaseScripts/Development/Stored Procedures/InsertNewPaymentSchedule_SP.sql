CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertNewPaymentSchedule`(IN _UserId VARCHAR(50), IN _Amount INT, IN _CardAuthorisationId INT, IN _PaymentDay INT)
BEGIN
INSERT INTO PaymentsSchedule
(UserId,
Amount,
CardAuthorisationId,
PaymentDay)
VALUES
(_UserId,
_Amount,
_CardAuthorisationId,
_PaymentDay);
END