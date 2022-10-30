-- Active: 1667125469201@@127.0.0.1@3306@medical_center
CREATE DATABASE IF NOT EXISTS medical_center;

USE medical_center;

DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS participants;

CREATE TABLE patients (
    id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name      VARCHAR(255) NOT NULL,
    last_name       VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    address         VARCHAR(255) DEFAULT NULL,
    city            VARCHAR(255) DEFAULT NULL,
    country         VARCHAR(255) DEFAULT NULL,
    date_of_birth   TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT UQ_Patients_Email UNIQUE (email)
);

CREATE TABLE projects (
    id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name            VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
);

INSERT INTO projects VALUES (1, 'Project 1');
INSERT INTO projects VALUES (2, 'Project 2');
INSERT INTO projects VALUES (3, 'Project 3');
INSERT INTO projects VALUES (4, 'Project 4');

INSERT INTO patients (first_name, last_name, email, address, city, country, date_of_birth)
VALUES ('Amanda', 'Wheeler', 'amanda.wheeler@mail.com', '79 Victoria St', 'London', 'England', STR_TO_DATE('1-01-1997', '%d-%m-%Y'));
INSERT INTO patients (first_name, last_name, email, address, city, country, date_of_birth)
VALUES ('Katniss', 'Everdeen', 'katniss.everdeen@mail.com', 'London SW1A 0AA', 'London', 'England', STR_TO_DATE('9-03-1998', '%d-%m-%Y'));
INSERT INTO patients (first_name, last_name, email, address, city, country, date_of_birth)
VALUES ('Sarah', 'Wilson', 'sarah.wilson@mail.com', '87 Brompton Road', 'London', 'England', STR_TO_DATE('23-03-1973', '%d-%m-%Y'));
INSERT INTO patients (first_name, last_name, email, address, city, country, date_of_birth)
VALUES ('Damian', 'Thomson', 'damian.thomson@mail.com', 'Lower Kings Road', 'Brighton', 'England', STR_TO_DATE('18-12-1974', '%d-%m-%Y'));
INSERT INTO patients (first_name, last_name, email, address, city, country, date_of_birth)
VALUES ('Natalia', 'Wojciak', 'natalia.wojcik@mail.com', 'plac Powstańców Warszawy 12', 'Kraków', 'Poland', STR_TO_DATE('23-04-2001', '%d-%m-%Y'));
INSERT INTO patients (first_name, last_name, email, address, city, country, date_of_birth)
VALUES ('Norbert', 'Piekarz', 'norbert.piekarz@mail.com', 'plac Szczepański 20', 'Kraków', 'Poland', STR_TO_DATE('12-12-2002', '%d-%m-%Y'));
INSERT INTO patients (first_name, last_name, email, address, city, country, date_of_birth)
VALUES ('Bartłomiej', 'Kaminsky', 'bartlomiej.kaminsky@mail.com', 'Złota 59', 'Warszawa', 'Poland', STR_TO_DATE('14-11-1998', '%d-%m-%Y'));

CREATE TABLE participants (
    project_id      BIGINT UNSIGNED NOT NULL,
    person_id       BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (person_id) REFERENCES patients(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

INSERT INTO participants VALUES ('1', '2');
INSERT INTO participants VALUES ('1', '4');
INSERT INTO participants VALUES ('1', '5');
INSERT INTO participants VALUES ('2', '6');
INSERT INTO participants VALUES ('2', '7');
INSERT INTO participants VALUES ('3', '1');
INSERT INTO participants VALUES ('3', '3');
