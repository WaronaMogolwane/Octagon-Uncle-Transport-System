CREATE DEFINER=`sqladmin`@`localhost` PROCEDURE `InsertNewCustomer`()
BEGIN
INSERT INTO `Dev-Octagon-Uncle-Transport`.`Customer`
(
`Customercode`,
`UserId`,
`Domain`,
`DateCreated`)
VALUES
(
_customerCode,
_userId,
_domain,
_dateCreated
);
END