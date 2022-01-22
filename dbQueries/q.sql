-- CREATE TABLE product(
-- 	product_id SERIAL PRIMARY KEY NOT NULL,
-- 	product_name VARCHAR(50) NOT NULL,
-- 	price INTEGER NOT NULL,
-- 	description TEXT
-- );

-- INSERT INTO product (product_name, price, description)
-- VALUES
-- ('Chocolate citrus', 10, 'Pastry bear claw bonbon jelly beans pastry cupcake icing')
-- ('Vanilla cream', 10, 'Toffee pastry fruitcake apple pie marshmallow jujubes croissant'),
-- ('Macaroons set', 15, 'Cupcake macaroon gummies carrot cake croissant'),
-- ('Chocolate marshmallow', 10, 'Sweet roll cotton candy marzipan macaroon brownie jelly beans liquorice');
-- ('Strawberry shortcake', 20, 'Apple pie macaroon croissant chupa chups brownie jelly beans'),
-- ('Blueberry nights', 10, 'Candy canes sweet roll lemon drops liquorice powder'),
-- ('Whipped cream', 10, 'Dessert macaroon toffee donut danish'),
-- ('Cream scheese', 10, 'Tart brownie shortbread croissant icing donut'),
-- ('Chocolate strawberry', 10, 'Croissant pastry tiramisu candy canes tiramisu I love macaroon'),
-- ('Sugar buicuit', 10, 'Sugar plum cookie ice cream tootsie roll apple pie chocolate cake'),
-- ('Black currant', 10, 'Pie topping jujubes caramels tiramisu biscuit muffin brownie carrot cake'),
-- ('Holiday set', 65, 'Muffin jujubes jelly soufflé ice cream lollipop shortbread tiramisu chocolate');

-- SELECT * FROM product



-- CREATE TABLE customer (
-- user_id SERIAL PRIMARY KEY NOT NULL,
-- user_name VARCHAR(60) NOT NULL,
-- user_pass VARCHAR(100) NOT NULL,
-- email VARCHAR(50) NOT NULL
-- );


-- CREATE TABLE customer (
-- customer_id SERIAL PRIMARY KEY NOT NULL,
-- customer_name VARCHAR(60) NOT NULL,
-- hashed_pass VARCHAR(100) NOT NULL,
-- email VARCHAR(50) NOT NULL
-- );

-- INSERT INTO customer(customer_name, hashed_pass, email)
-- VALUES 
-- ('Blueberry pie', '$2b$10$VcXAr33wvA0KqyhvfkVHBOWqQ58BUHvih/mNv2UrJ.QguagcMsWGa', '1@1'),
-- ('Spicy pumpkin', '$2b$10$L9d.ldIsLeSulPcJAae42eCItA2G5CWfKF1hrchaOsr5p2nHJXoHm', 'w@w')