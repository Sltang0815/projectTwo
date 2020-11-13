DROP DATABASE IF EXISTS timesTables_db;
CREATE DATABASE timesTables_db;
USE timesTables_db;

-- Still need to create TABLE for username/results/etc

CREATE TABLE one_times (
	id INT AUTO_INCREMENT NOT NULL,
    equations varchar(255) NOT NULL,
    answers varchar(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE two_times (
	id INT AUTO_INCREMENT NOT NULL,
    equations varchar(255) NOT NULL,
    answers varchar(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE three_times (
	id INT AUTO_INCREMENT NOT NULL,
    equations varchar(255) NOT NULL,
    answers varchar(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE four_times (
	id INT AUTO_INCREMENT NOT NULL,
    equations varchar(255) NOT NULL,
    answers varchar(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE five_times (
	id INT AUTO_INCREMENT NOT NULL,
    equations varchar(255) NOT NULL,
    answers varchar(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE six_times (
	id INT AUTO_INCREMENT NOT NULL,
    equations varchar(255) NOT NULL,
    answers varchar(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE seven_times (
	id INT AUTO_INCREMENT NOT NULL,
    equations varchar(255) NOT NULL,
    answers varchar(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE eight_times (
	id INT AUTO_INCREMENT NOT NULL,
    equations varchar(255) NOT NULL,
    answers varchar(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE nine_times (
	id INT AUTO_INCREMENT NOT NULL,
    equations varchar(255) NOT NULL,
    answers varchar(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE ten_times (
	id INT AUTO_INCREMENT NOT NULL,
    equations varchar(255) NOT NULL,
    answers varchar(255) NOT NULL,
    PRIMARY KEY(id)
);