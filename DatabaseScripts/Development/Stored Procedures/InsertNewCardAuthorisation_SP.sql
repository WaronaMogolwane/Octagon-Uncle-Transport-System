CREATE PROCEDURE `InsertNewCardAuthorisation` (
IN _userId VARCHAR(45),
IN _authorizationCode VARCHAR(45),
IN _maskedCardNumber VARCHAR(45),
IN _cardExpiryMonth VARCHAR(45),
IN _cardExpiryYear VARCHAR(45),
IN _cardType VARCHAR(45),
IN _bankName VARCHAR(45),
IN _countryCode VARCHAR(45),
IN _dateCreated VARCHAR(45)
)
BEGIN
INSERT INTO CardAuthorisation
(
UserId,
AuthorizationCode,
MaskedCardNumber,
CardExpiryMonth,
CardExpiryYear,
CardType,
BankName,
CountryCode,
DateCreated
)
VALUES
(
 _userId,
 _authorizationCode,
 _maskedCardNumber,
 _cardExpiryMonth,
 _cardExpiryYear,
 _cardType,
 _bankName,
 _countryCode,
 _dateCreated
);
END
