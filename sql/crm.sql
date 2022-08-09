SELECT * FROM product_types;
SELECT * FROM products;
SELECT * FROM organizations;
SELECT * FROM users;
SELECT * FROM roles;

DROP TABLE product_types CASCADE;
DROP TABLE products CASCADE;
DROP TABLE organizations CASCADE;
DROP TABLE users CASCADE;
DROP TABLE roles CASCADE;
-- ========================
-- users
-- ========================
SELECT * FROM users;

DELETE FROM users WHERE id = 1;

INSERT INTO users (email, password, role_id)
VALUES (
        'test1@email.com',
        'wizard',
        1
       );
-- ========================
-- roles
-- ========================
SELECT * FROM roles;

INSERT INTO roles (name) -- super, admin, recipient
VALUES (
        'recipient'
       )