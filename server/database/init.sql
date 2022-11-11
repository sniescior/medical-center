-- Active: 1667125469201@@127.0.0.1@3306@medical_center
CREATE DATABASE IF NOT EXISTS medical_center;

USE medical_center;

DROP TABLE IF EXISTS `patients`;              -- Pacjenci
DROP TABLE IF EXISTS `projects`;              -- Projekty badawcze
DROP TABLE IF EXISTS `participants`;          -- Pacjenci przypisani do projektu (uczestnicy)
DROP TABLE IF EXISTS `examinations`;          -- Badania
DROP TABLE IF EXISTS `orders`;                -- Zlecenia
DROP TABLE IF EXISTS `examinations_order`;     -- Badania przypisane do danego zlecenia
DROP TABLE IF EXISTS `participants_order`;    -- Zlecenia przypisane do uczestnika projektu


CREATE TABLE patients (
    id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name      VARCHAR(255) NOT NULL,
    last_name       VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    address         VARCHAR(255) DEFAULT NULL,
    city            VARCHAR(255) DEFAULT NULL,
    country         VARCHAR(255) DEFAULT NULL,
    date_of_birth   TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    join_date       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,   -- data dołączenia do systemu
    PRIMARY KEY (id),
    CONSTRAINT UQ_Patients_Email UNIQUE (email)
);

INSERT INTO patients (id, first_name, last_name, email, address, city, country, date_of_birth)
VALUES (1, 'Amanda', 'Wheeler', 'amanda.wheeler@mail.com', '79 Victoria St', 'London', 'England', STR_TO_DATE('1-01-1997', '%d-%m-%Y'));
INSERT INTO patients (id, first_name, last_name, email, address, city, country, date_of_birth)
VALUES (2, 'Katniss', 'Everdeen', 'katniss.everdeen@mail.com', 'London SW1A 0AA', 'London', 'England', STR_TO_DATE('9-03-1998', '%d-%m-%Y'));
INSERT INTO patients (id, first_name, last_name, email, address, city, country, date_of_birth)
VALUES (3, 'Sarah', 'Wilson', 'sarah.wilson@mail.com', '87 Brompton Road', 'London', 'England', STR_TO_DATE('23-03-1973', '%d-%m-%Y'));
INSERT INTO patients (id, first_name, last_name, email, address, city, country, date_of_birth)
VALUES (4, 'Damian', 'Thomson', 'damian.thomson@mail.com', 'Lower Kings Road', 'Brighton', 'England', STR_TO_DATE('18-12-1974', '%d-%m-%Y'));
INSERT INTO patients (id, first_name, last_name, email, address, city, country, date_of_birth)
VALUES (5, 'Natalia', 'Wojciak', 'natalia.wojcik@mail.com', 'plac Powstańców Warszawy 12', 'Kraków', 'Poland', STR_TO_DATE('23-04-2001', '%d-%m-%Y'));
INSERT INTO patients (id, first_name, last_name, email, address, city, country, date_of_birth)
VALUES (6, 'Norbert', 'Piekarz', 'norbert.piekarz@mail.com', 'plac Szczepański 20', 'Kraków', 'Poland', STR_TO_DATE('12-12-2002', '%d-%m-%Y'));
INSERT INTO patients (id, first_name, last_name, email, address, city, country, date_of_birth)
VALUES (7, 'Bartłomiej', 'Kaminsky', 'bartlomiej.kaminsky@mail.com', 'Złota 59', 'Warszawa', 'Poland', STR_TO_DATE('14-11-1998', '%d-%m-%Y'));
INSERT INTO patients (id, first_name, last_name, email, address, city, country, date_of_birth)
VALUES (8, 'Czarek', 'Michalak', 'czarek.michalak@mail.com', 'Jurowiecka 1', 'Białystok', 'Poland', STR_TO_DATE('13-12-1999', '%d-%m-%Y'));
INSERT INTO patients (id, first_name, last_name, email, address, city, country, date_of_birth)
VALUES (9, 'Krystyna', 'Kowalczyk', 'krystyna.kowalczyk@mail.com', 'Stary Rynek 25', 'Poznań', 'Poland', STR_TO_DATE('11-11-1996', '%d-%m-%Y'));
INSERT INTO patients (id, first_name, last_name, email, address, city, country, date_of_birth)
VALUES (10, 'Damian', 'Nowicki', 'damian.nowicki@mail.com', 'Łąkowa 1-2', 'Gdańsk', 'Poland', STR_TO_DATE('12-4-1988', '%d-%m-%Y'));


CREATE TABLE `projects` (
    `id`              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`            VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `projects` VALUES (1, 'Project 1');
INSERT INTO `projects` VALUES (2, 'Project 2');
INSERT INTO `projects` VALUES (3, 'Project 3');
INSERT INTO `projects` VALUES (4, 'Project 4');

DROP TABLE `participants`;
CREATE TABLE `participants` (
    `participant_id`    BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `project_id`        BIGINT UNSIGNED NOT NULL,
    `patient_id`        BIGINT UNSIGNED NOT NULL,
    `consent`           BOOLEAN DEFAULT FALSE,

    PRIMARY KEY (`participant_id`),
    FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE,
    UNIQUE KEY Unique_pair (`project_id`, `patient_id`)
);


CREATE TABLE `examinations` (                                               -- BADANIA
    `examination_id`    BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title`             VARCHAR(255) NOT NULL,
    `description`       VARCHAR(2000) NULL,

    PRIMARY KEY (`examination_id`)
);

INSERT INTO `examinations` VALUES (1, "Badanie krwi", "Opis badania krwi");
INSERT INTO `examinations` VALUES (2, "Badanie słuchu", "Opis badania słuchu");
INSERT INTO `examinations` VALUES (3, "Badanie wzroku", "Opis badania wzroku");

CREATE TABLE `orders` (                                                     -- ZLECENIA
    `order_id`          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `project_id`        BIGINT UNSIGNED NOT NULL,
    `title`             VARCHAR(255),

    PRIMARY KEY (`order_id`),
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`)
);


CREATE TABLE `examinations_order` (                                         -- ZLECENIE BADAŃ
    `examination_id`    BIGINT UNSIGNED NOT NULL,
    `order_id`          BIGINT UNSIGNED NOT NULL,

    FOREIGN KEY (`examination_id`) REFERENCES `examinations`(`examination_id`) ON DELETE CASCADE,
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE,
    UNIQUE KEY Unique_examination_order_pair (`examination_id`, `order_id`)
);

INSERT INTO `orders` VALUES (1, 1, 'Zlecenie badań nr 1');
INSERT INTO `orders` VALUES (2, 1, 'Zlecenie badań nr 2');
INSERT INTO `orders` VALUES (3, 1, 'Zlecenie badań nr 3');
INSERT INTO `orders` VALUES (4, 43, 'Zlecenie badań nr 50');
INSERT INTO `orders` VALUES (5, 47, 'Zlecenie badań nr 50');

INSERT INTO `examinations_order` VALUES (1, 1);
INSERT INTO `examinations_order` VALUES (2, 1);
INSERT INTO `examinations_order` VALUES (3, 1);
INSERT INTO `examinations_order` VALUES (1, 2);


