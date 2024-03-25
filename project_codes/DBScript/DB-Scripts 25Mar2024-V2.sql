CREATE DATABASE `dbms_project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;


CREATE TABLE `admin` (
  `AdminID` int NOT NULL AUTO_INCREMENT,
  `Admin_Name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `Admin_role` varchar(50) NOT NULL,
  PRIMARY KEY (`AdminID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cartid` (
  `CartID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`CartID`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `category` (
  `CategoryID` int NOT NULL AUTO_INCREMENT,
  `Category_Name` varchar(50) NOT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `Name_of_the_customer` varchar(50) NOT NULL,
  `Delivery_Address` varchar(50) NOT NULL,
  `Email_Address` varchar(50) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `Phone_number` bigint NOT NULL,
  `AdminID` int NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `Email_Address_UNIQUE` (`Email_Address`),
  KEY `fk_customers_admin` (`AdminID`),
  CONSTRAINT `fk_customers_admin` FOREIGN KEY (`AdminID`) REFERENCES `admin` (`AdminID`) ON DELETE CASCADE,
  CONSTRAINT `check_phone_number` CHECK ((`Phone_number` between 1000000000 and 9999999999))
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `delivery_partner` (
  `PartnerID` int NOT NULL AUTO_INCREMENT,
  `Name_of_the_partner` varchar(50) NOT NULL,
  `Vehicle_Details` varchar(50) NOT NULL,
  `Phone_number` bigint NOT NULL,
  `AdminID` int NOT NULL,
  PRIMARY KEY (`PartnerID`),
  KEY `fk_delivery_partner_admin` (`AdminID`),
  CONSTRAINT `fk_delivery_partner_admin` FOREIGN KEY (`AdminID`) REFERENCES `admin` (`AdminID`) ON DELETE CASCADE,
  CONSTRAINT `check_phone_number1` CHECK ((`Phone_number` between 1000000000 and 9999999999))
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `item` (
  `ProductID` int NOT NULL AUTO_INCREMENT,
  `Name_of_the_item` varchar(50) NOT NULL,
  `Availability` int NOT NULL,
  `Description` varchar(50) NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `CategoryID` int NOT NULL,
  `AdminID` int NOT NULL,
  PRIMARY KEY (`ProductID`),
  KEY `fk_item_admin` (`AdminID`),
  KEY `fk_item_category` (`CategoryID`),
  CONSTRAINT `fk_item_admin` FOREIGN KEY (`AdminID`) REFERENCES `admin` (`AdminID`) ON DELETE CASCADE,
  CONSTRAINT `fk_item_category` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `log1` (
  `logno` int NOT NULL AUTO_INCREMENT,
  `log` varchar(50) NOT NULL,
  PRIMARY KEY (`logno`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `order` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `OrderID` int NOT NULL,
  `ItemID` int NOT NULL,
  `Quantity` int NOT NULL,
  `price` double NOT NULL,
  `OrderDate` datetime DEFAULT NULL,
  `Mode_of_payment` varchar(50) NOT NULL,
  `Trip_Status` int NOT NULL,
  `CustomerID` int NOT NULL,
  `PartnerID` int NOT NULL,
  `VendorID` int NOT NULL,
  `CategoryID` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `orderid` (
  `OrderID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`OrderID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `shoppingcart` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CartID` int NOT NULL,
  `ItemID` int NOT NULL,
  `Quantity` int NOT NULL,
  `price` double NOT NULL,
  `OrderDate` datetime DEFAULT NULL,
  `Mode_of_payment` varchar(50) NOT NULL,
  `Trip_Status` int NOT NULL,
  `CustomerID` int NOT NULL,
  `PartnerID` int NOT NULL,
  `VendorID` int NOT NULL,
  `CategoryID` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `vendor` (
  `VendorID` int NOT NULL AUTO_INCREMENT,
  `Name_of_the_vendor` varchar(50) NOT NULL,
  `Contact_Details` varchar(50) NOT NULL,
  `Address` varchar(50) NOT NULL,
  `AdminID` int NOT NULL,
  PRIMARY KEY (`VendorID`),
  KEY `fk_vendor_admin` (`AdminID`),
  CONSTRAINT `fk_vendor_admin` FOREIGN KEY (`AdminID`) REFERENCES `admin` (`AdminID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `inventory_required` (
  `ProductID` int NOT NULL,
  `Quantity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Exec2SQL`(IN txtCmd text)
BEGIN
    SET @S1 = JSON_UNQUOTE(JSON_EXTRACT(txtCmd, '$.SQL1'));
    SET @S2 = concat('Select (', JSON_UNQUOTE(JSON_EXTRACT(txtCmd, '$.SQL2')), ') InputOutputText');
    PREPARE dynamic_statement1 FROM @S1;
    EXECUTE dynamic_statement1;
    PREPARE dynamic_statement1 FROM @S2;
    EXECUTE dynamic_statement1;    
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Exec3SQL`(IN txtCmd text)
BEGIN
    SET @S1 = JSON_UNQUOTE(JSON_EXTRACT(txtCmd, '$.SQL1'));
    SET @S2 = JSON_UNQUOTE(JSON_EXTRACT(txtCmd, '$.SQL2'));
    SET @S3 = concat('Select (', JSON_UNQUOTE(JSON_EXTRACT(txtCmd, '$.SQL3')), ') InputOutputText');
    PREPARE dynamic_statement1 FROM @S1;
    EXECUTE dynamic_statement1;
    PREPARE dynamic_statement1 FROM @S2;
    EXECUTE dynamic_statement1;
    PREPARE dynamic_statement1 FROM @S3;
    EXECUTE dynamic_statement1;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Proc_DynamicExec`(IN txtCmd text)
BEGIN
    #call Proc_DynamicExec('{"SQL1":"INSERT INTO log1 (`log`) VALUES (''test H1'')","SQL2":"SELECT * FROM project1.log1 where logno = (select max(logno) from project1.log1)"}');
	SET @S1 =JSON_UNQUOTE(JSON_EXTRACT(txtCmd, '$.ProcName'));
    if @S1 = 'ProcLog1' then
		call ProcLog1(txtCmd);
	elseif @S1 = 'ProcLog2' then
		call ProcLog2(txtCmd);
	elseif @S1 = 'ValidateAdmin' then
		call ValidateAdmin(txtCmd);
    elseif @S1 = 'Exec2SQL' then
		call Exec2SQL(txtCmd);    
	elseif @S1 = 'Exec3SQL' then
		call Exec3SQL(txtCmd);      
    else
		Select (SELECT JSON_ARRAYAGG(JSON_OBJECT('logno',logno,'log',log)) FROM log1 where logno=(select max(logno) from log1)) InputOutputText;
	end if;
    
   
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ProcLog1`(IN txtCmd text)
BEGIN
    SET @S1 = JSON_UNQUOTE(JSON_EXTRACT(txtCmd, '$.SQL1'));   #->> '$.SQL1'
    SET @S2 = concat('Select (', JSON_UNQUOTE(JSON_EXTRACT(txtCmd, '$.SQL2')), ') InputOutputText');
    PREPARE dynamic_statement1 FROM @S1;
    EXECUTE dynamic_statement1;
    PREPARE dynamic_statement1 FROM @S2;
    EXECUTE dynamic_statement1;    
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ProcLog2`(IN txtCmd text)
BEGIN
    SET @S1 = JSON_UNQUOTE(JSON_EXTRACT(txtCmd, '$.SQL1'));   #->> '$.SQL1'
    SET @S2 = concat('Select (', JSON_UNQUOTE(JSON_EXTRACT(txtCmd, '$.SQL2')), ') InputOutputText');
    PREPARE dynamic_statement1 FROM @S1;
    EXECUTE dynamic_statement1;
    PREPARE dynamic_statement1 FROM @S2;
    EXECUTE dynamic_statement1;    
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ValidateAdmin`(IN txtCmd text)
BEGIN
    #SET @S1 = JSON_UNQUOTE(JSON_EXTRACT(txtCmd, '$.SQL1'));   #->> '$.SQL1'
    SET @S2 = concat('Select (', JSON_UNQUOTE(JSON_EXTRACT(txtCmd, '$.SQL2')), ') InputOutputText');
    #PREPARE dynamic_statement1 FROM @S1;
    #EXECUTE dynamic_statement1;
    PREPARE dynamic_statement1 FROM @S2;
    EXECUTE dynamic_statement1;    
END$$
DELIMITER ;


DELIMITER //

CREATE TRIGGER update_item_quantity
AFTER INSERT ON `order`
FOR EACH ROW
BEGIN
    UPDATE item
    SET Availability = Availability - NEW.Quantity
    WHERE ProductID = NEW.ItemID;
END;
//

DELIMITER ;

DELIMITER //

CREATE TRIGGER update_inventory_required
AFTER UPDATE ON `item`
FOR EACH ROW
BEGIN

	IF (NEW.Availability < 0) then
    
		insert into inventory_required(ProductID, Quantity)
		values(NEW.ProductID , NEW.Availability * (-1) ) ;
    
    end if ;
    
END;
//

DELIMITER ;
