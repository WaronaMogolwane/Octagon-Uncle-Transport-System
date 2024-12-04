CREATE DEFINER=`sqladmin`@`%` PROCEDURE `InsertNewBulkCharge`(
IN _Status TINYINT,
IN _Message VARCHAR(100),
IN _BatchCode VARCHAR(100),
IN _Reference VARCHAR(100),
IN _TotalCharges INT,
IN _PendingCharges INT,
IN _CreatedAt TIMESTAMP,
IN _UpdatedAt TIMESTAMP
)
BEGIN
INSERT INTO BulkCharges
(
Status,
Message,
BatchCode,
Reference,
TotalCharges,
PendingCharges,
CreatedAt,
UpdatedAt
)
VALUES
(
_Status,
_Message,
_BatchCode,
_Reference,
_TotalCharges,
_PendingCharges,
_CreatedAt,
_UpdatedAt
);
END