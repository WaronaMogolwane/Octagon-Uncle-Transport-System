CREATE TABLE IF NOT EXISTS SuccessfulTransactions (
    TransactionId BIGINT UNSIGNED PRIMARY KEY,
    UserId VARCHAR(255),
    Amount DECIMAL(10, 2) NOT NULL,
    Currency VARCHAR(10) NOT NULL,
    Status VARCHAR(50) NOT NULL,
    Reference VARCHAR(255) UNIQUE NOT NULL,
    DateCreated DATETIME NOT NULL,
    DatePaid DATETIME,
    TransactionType VARCHAR(100),
    -- Add other relevant columns as needed, e.g., gateway_response, customer_id, etc.
    INDEX (UserId),
    INDEX (Reference),
    INDEX (DateCreated),
    INDEX (Status)
);
