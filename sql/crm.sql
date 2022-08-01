SELECT * FROM product_types;
SELECT * FROM products;
SELECT * FROM organizations;
SELECT * FROM users;

DROP TABLE product_types CASCADE;
DROP TABLE products CASCADE;
DROP TABLE organizations CASCADE;
DROP TABLE users CASCADE;

INSERT INTO users (role_id, name, email, password)
VALUES (
        1,
        'test1',
        'test1@email.com',
        'wizard'
       );
