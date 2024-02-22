CREATE 
    DEFINER = `sqladmin`@`%` 
    TRIGGER  `OtpExpiryDateInsert`
 BEFORE INSERT ON `UserOtp` FOR EACH ROW 
    SET NEW . OtpExpireDate = DATE_ADD(CURRENT_TIMESTAMP(),
        INTERVAL 5 MINUTE)