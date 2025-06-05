CREATE TABLE `TransferRecipient` (
    `TransferRecipientId` INT AUTO_INCREMENT PRIMARY KEY,
    `UserId` INT NOT NULL, 
    `RecipientCode` VARCHAR(255) NOT NULL,
    `PaystackId` INT NOT NULL,
    UNIQUE KEY `RecipientCode_UNIQUE` (`RecipientCode`),
    INDEX (`UserId`),
    INDEX (`PaystackId`) 
);