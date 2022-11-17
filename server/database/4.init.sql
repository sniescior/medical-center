-- Populate examinations table with random data

INSERT INTO `examinations` VALUES (1, "Badanie krwi", "Opis badania krwi");

INSERT INTO `examinations` VALUES (2, "Badanie słuchu", "Opis badania słuchu");

INSERT INTO `examinations` VALUES (3, "Badanie wzroku", "Opis badania wzroku");

INSERT INTO `examinations` VALUES (4, "Badanie wytrzymałości fizycznej", "Opis badania wytrzymałości fizycznej");

INSERT INTO `examinations` VALUES (5, "Tajne badanie 1", "Opis tajnego badania");

INSERT INTO `examinations` (`examination_id`, `title`) VALUES (6, "Tajne badanie 2");

INSERT INTO `examinations` VALUES (7, "Tajne badanie 3", "Opis tajnego badania");


-- Populate orders table with random data

INSERT INTO `orders` (`order_id`, `participant_id`, `title`) 
VALUES (1, 1, 'Zlecenie badań nr 1');
INSERT INTO `orders` (`order_id`, `participant_id`, `title`) 
VALUES (2, 1, 'Zlecenie badań nr 2');

INSERT INTO `orders` (`order_id`, `participant_id`, `title`) 
VALUES (3, 2, 'Zlecenie badań nr 3');
INSERT INTO `orders` (`order_id`, `participant_id`, `title`) 
VALUES (4, 2, 'Zlecenie badań nr 4');

INSERT INTO `orders` (`order_id`, `participant_id`, `title`) 
VALUES (5, 3, 'Zlecenie badań nr 5');
INSERT INTO `orders` (`order_id`, `participant_id`, `title`) 
VALUES (6, 3, 'Zlecenie badań nr 6');
INSERT INTO `orders` (`order_id`, `participant_id`, `title`) 
VALUES (7, 3, 'Zlecenie badań nr 7');

INSERT INTO `orders` (`order_id`, `participant_id`, `title`) 
VALUES (8, 10, 'Zlecenie badań nr 8');
INSERT INTO `orders` (`order_id`, `participant_id`, `title`) 
VALUES (9, 10, 'Zlecenie badań nr 9');

INSERT INTO `orders` (`order_id`, `participant_id`, `title`) 
VALUES (10, 11, 'Zlecenie badań nr 10');
INSERT INTO `orders` (`order_id`, `participant_id`, `title`) 
VALUES (11, 11, 'Zlecenie badań nr 11');

INSERT INTO `orders` (`order_id`, `participant_id`, `title`) 
VALUES (12, 14, 'Zlecenie badań nr 12');


-- Populate examinations_order table with random data

INSERT INTO `examinations_order` (`examination_id`, `order_id`, `result`) 
VALUES (1, 1, "Badanie przebiegło pomyślnie");

INSERT INTO `examinations_order` (`examination_id`, `order_id`, `result`) 
VALUES (1, 2, "Bez większych komplikacji");

INSERT INTO `examinations_order` (`examination_id`, `order_id`) 
VALUES (2, 2);

INSERT INTO `examinations_order` (`examination_id`, `order_id`) 
VALUES (2, 3);

INSERT INTO `examinations_order` (`examination_id`, `order_id`) 
VALUES (3, 2);

INSERT INTO `examinations_order` (`examination_id`, `order_id`) 
VALUES (3, 10);

INSERT INTO `examinations_order` (`examination_id`, `order_id`) 
VALUES (4, 10);

INSERT INTO `examinations_order` (`examination_id`, `order_id`) 
VALUES (7, 12);

