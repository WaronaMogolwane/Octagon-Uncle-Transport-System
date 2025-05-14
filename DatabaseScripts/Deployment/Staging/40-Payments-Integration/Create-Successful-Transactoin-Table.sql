CREATE TABLE `successfultransaction` (
  `TransactionId` int NOT NULL AUTO_INCREMENT,
  `UserId` text NOT NULL,
  `Amount` int NOT NULL,
  `Currency` varchar(10) NOT NULL,
  `Status` varchar(20) NOT NULL DEFAULT '1',
  `Reference` varchar(100) NOT NULL,
  `DateCreated` timestamp NOT NULL,
  `DatePaid` timestamp NULL DEFAULT NULL,
  `TransactionType` varchar(50) NOT NULL,
  `Attempts` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`TransactionId`),
  UNIQUE KEY `Reference_UNIQUE` (`Reference`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
