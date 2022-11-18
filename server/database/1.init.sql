-- Active: 1667125469201@@127.0.0.1@3306@medical_center

CREATE DATABASE IF NOT EXISTS medical_center;

USE medical_center;

DROP TABLE IF EXISTS `patients`;              -- Pacjenci
DROP TABLE IF EXISTS `projects`;              -- Projekty badawcze
DROP TABLE IF EXISTS `participants`;          -- Pacjenci przypisani do projektu (uczestnicy)
DROP TABLE IF EXISTS `examinations`;          -- Badania
DROP TABLE IF EXISTS `orders`;                -- Zlecenia
DROP TABLE IF EXISTS `examinations_order`;    -- Badania przypisane do danego zlecenia
DROP TABLE IF EXISTS `participants_order`;    -- Zlecenia przypisane do uczestnika projektu


CREATE TABLE `patients` (
    `id`              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name`      VARCHAR(255) NOT NULL,
    `last_name`       VARCHAR(255) NOT NULL,
    `email`           VARCHAR(255) NOT NULL,
    `address`         VARCHAR(255) DEFAULT NULL,
    `city`            VARCHAR(255) DEFAULT NULL,
    `country`         VARCHAR(255) DEFAULT NULL,
    `date_of_birth`   DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `join_date`       DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,   -- data dołączenia do systemu
    
    PRIMARY KEY (`id`),
    CONSTRAINT `UQ_Patients_Email` UNIQUE (`email`)
);


CREATE TABLE `projects` (
    `id`              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`            VARCHAR(255) DEFAULT NULL,

    PRIMARY KEY (`id`),
    CONSTRAINT `UQ_Project_name` UNIQUE (`name`)
);


CREATE TABLE `participants` (
    `participant_id`    BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `project_id`        BIGINT UNSIGNED NOT NULL,
    `patient_id`        BIGINT UNSIGNED NOT NULL,
    `consent`           BOOLEAN DEFAULT FALSE,

    PRIMARY KEY (`participant_id`),
    FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `Unique_pair` (`project_id`, `patient_id`)
);


CREATE TABLE `examinations` (                                               -- BADANIA
    `examination_id`    BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title`             VARCHAR(255) NOT NULL,
    `description`       VARCHAR(2000) NULL,

    PRIMARY KEY (`examination_id`)
);


CREATE TABLE `orders` (                                                     -- ZLECENIA
    `order_id`              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `participant_id`        BIGINT UNSIGNED NOT NULL,
    `title`                 VARCHAR(255),
    `add_date`              TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `completion_date`       TIMESTAMP DEFAULT NULL,

    PRIMARY KEY (`order_id`),
    FOREIGN KEY (`participant_id`) REFERENCES `participants`(`participant_id`) ON DELETE CASCADE
);


CREATE TABLE `examinations_order` (                                         -- ZLECENIE BADAŃ
    `examination_id`    BIGINT UNSIGNED NOT NULL,
    `order_id`          BIGINT UNSIGNED NOT NULL,
    `result`            VARCHAR(2000) NULL,

    FOREIGN KEY (`examination_id`) REFERENCES `examinations`(`examination_id`) ON DELETE CASCADE,
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE,
    UNIQUE KEY `Unique_examination_order_pair` (`examination_id`, `order_id`)
);

