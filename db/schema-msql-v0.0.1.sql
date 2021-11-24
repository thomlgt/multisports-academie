-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ms-bd
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ms-bd
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ms-bd` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `ms-bd` ;

-- -----------------------------------------------------
-- Table `ms-bd`.`captain`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ms-bd`.`captain` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(10) NOT NULL,
  `birthdate` DATE NOT NULL,
  `gender` TINYINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ms-bd`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ms-bd`.`admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ms-bd`.`team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ms-bd`.`team` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `captain_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_team_captain_idx` (`captain_id` ASC) VISIBLE,
  CONSTRAINT `fk_team_captain`
    FOREIGN KEY (`captain_id`)
    REFERENCES `ms-bd`.`captain` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ms-bd`.`place`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ms-bd`.`place` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `adress` VARCHAR(255) NOT NULL,
  `zip` VARCHAR(5) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ms-bd`.`image`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ms-bd`.`image` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `path` VARCHAR(255) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ms-bd`.`event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ms-bd`.`event` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `place_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `start_event` DATETIME NOT NULL,
  `end_event` DATETIME NOT NULL,
  `start_registration` DATETIME NOT NULL,
  `end_registration` DATETIME NOT NULL,
  `description` LONGTEXT NOT NULL,
  `min_members` INT NOT NULL,
  `max_members` INT NOT NULL,
  `min_female` INT NOT NULL,
  `min_age` INT NOT NULL,
  `price` DOUBLE NOT NULL,
  `max_team` INT NOT NULL,
  `image_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_event_place1_idx` (`place_id` ASC) VISIBLE,
  INDEX `fk_event_image1_idx` (`image_id` ASC) VISIBLE,
  CONSTRAINT `fk_event_place1`
    FOREIGN KEY (`place_id`)
    REFERENCES `ms-bd`.`place` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_image1`
    FOREIGN KEY (`image_id`)
    REFERENCES `ms-bd`.`image` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ms-bd`.`member`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ms-bd`.`member` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `team_id` INT NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `birthdate` DATE NOT NULL,
  `gender` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_member_team1_idx` (`team_id` ASC) VISIBLE,
  CONSTRAINT `fk_member_team1`
    FOREIGN KEY (`team_id`)
    REFERENCES `ms-bd`.`team` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ms-bd`.`activity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ms-bd`.`activity` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `rules` LONGTEXT NOT NULL,
  `duration` VARCHAR(255) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `points` VARCHAR(255) NOT NULL,
  `image_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_activity_image1_idx` (`image_id` ASC) VISIBLE,
  CONSTRAINT `fk_activity_image1`
    FOREIGN KEY (`image_id`)
    REFERENCES `ms-bd`.`image` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ms-bd`.`article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ms-bd`.`article` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `published` TINYINT NOT NULL DEFAULT 0,
  `image_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_article_image1_idx` (`image_id` ASC) VISIBLE,
  CONSTRAINT `fk_article_image1`
    FOREIGN KEY (`image_id`)
    REFERENCES `ms-bd`.`image` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ms-bd`.`participate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ms-bd`.`participate` (
  `event_id` INT NOT NULL,
  `team_id` INT NOT NULL,
  `registration_status` ENUM("pending", "validated", "cancelled") NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`event_id`, `team_id`),
  INDEX `fk_event_has_team_team1_idx` (`team_id` ASC) VISIBLE,
  INDEX `fk_event_has_team_event1_idx` (`event_id` ASC) VISIBLE,
  CONSTRAINT `fk_event_has_team_event1`
    FOREIGN KEY (`event_id`)
    REFERENCES `ms-bd`.`event` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_has_team_team1`
    FOREIGN KEY (`team_id`)
    REFERENCES `ms-bd`.`team` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ms-bd`.`compose`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ms-bd`.`compose` (
  `event_id` INT NOT NULL,
  `activity_id` INT NOT NULL,
  PRIMARY KEY (`event_id`, `activity_id`),
  INDEX `fk_event_has_activity_activity1_idx` (`activity_id` ASC) VISIBLE,
  INDEX `fk_event_has_activity_event1_idx` (`event_id` ASC) VISIBLE,
  CONSTRAINT `fk_event_has_activity_event1`
    FOREIGN KEY (`event_id`)
    REFERENCES `ms-bd`.`event` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_has_activity_activity1`
    FOREIGN KEY (`activity_id`)
    REFERENCES `ms-bd`.`activity` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ms-bd`.`scored`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ms-bd`.`scored` (
  `participate_event_id` INT NOT NULL,
  `participate_team_id` INT NOT NULL,
  `event_has_activity_event_id` INT NOT NULL,
  `event_has_activity_activity_id` INT NOT NULL,
  `score` INT NOT NULL DEFAULT 0,
  INDEX `fk_participate_activity_participate1_idx` (`participate_event_id` ASC, `participate_team_id` ASC) VISIBLE,
  INDEX `fk_participate_activity_event_has_activity1_idx` (`event_has_activity_event_id` ASC, `event_has_activity_activity_id` ASC) VISIBLE,
  CONSTRAINT `fk_participate_activity_participate1`
    FOREIGN KEY (`participate_event_id` , `participate_team_id`)
    REFERENCES `ms-bd`.`participate` (`event_id` , `team_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_participate_activity_event_has_activity1`
    FOREIGN KEY (`event_has_activity_event_id` , `event_has_activity_activity_id`)
    REFERENCES `ms-bd`.`compose` (`event_id` , `activity_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ms-bd`.`gallery`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ms-bd`.`gallery` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `event_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_gallery_event1_idx` (`event_id` ASC) VISIBLE,
  CONSTRAINT `fk_gallery_event1`
    FOREIGN KEY (`event_id`)
    REFERENCES `ms-bd`.`event` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ms-bd`.`appear`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ms-bd`.`appear` (
  `image_id` INT NOT NULL,
  `gallery_id` INT NOT NULL,
  PRIMARY KEY (`image_id`, `gallery_id`),
  INDEX `fk_image_has_gallery_gallery1_idx` (`gallery_id` ASC) VISIBLE,
  INDEX `fk_image_has_gallery_image1_idx` (`image_id` ASC) VISIBLE,
  CONSTRAINT `fk_image_has_gallery_image1`
    FOREIGN KEY (`image_id`)
    REFERENCES `ms-bd`.`image` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_image_has_gallery_gallery1`
    FOREIGN KEY (`gallery_id`)
    REFERENCES `ms-bd`.`gallery` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
