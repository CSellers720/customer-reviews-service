CREATE DATABASE IF NOT EXISTS fec_reviews;

USE fec_reviews;

CREATE TABLE IF NOT EXISTS reviews (
  review_id INT unsigned NOT NULL AUTO_INCREMENT,
  username VARCHAR(150) NOT NULL,
  fecha DATE NOT NULL,
  rating INT(5) NOT NULL,
  title varchar(150) NOT NULL,
  review_body text NOT NULL,
  PRIMARY KEY (review_id)
);

CREATE TABLE IF NOT EXISTS images (
  image_id INT unsigned NOT NULL AUTO_INCREMENT,
  image_url VARCHAR(500) NOT NULL,
  review_id INT unsigned NOT NULL,
  PRIMARY KEY (image_id),
  FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
