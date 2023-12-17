-- Active: 1694595215136@@127.0.0.1@5432@demo-store@public

CREATE TABLE
    IF NOT EXISTS coordinates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        lat FLOAT NOT NULL,
        lng FLOAT NOT NULL,
        UNIQUE(lat, lng)
    );

CREATE TABLE
    IF NOT EXISTS categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        clicked INT NOT NULL,
        UNIQUE(name)
    );

CREATE TABLE
    IF NOT EXISTS images (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        url VARCHAR(255) NOT NULL,
        alt VARCHAR(255) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(21) NOT NULL,
        price INT NOT NULL,
        quantity INT NOT NULL,
        description VARCHAR(255) NOT NULL,
        image UUID NOT NULL,
        category UUID NOT NULL,
        discount INT NOT NULL,
        rating FLOAT NOT NULL,
        clicked INT NOT NULL,
        isForSale BOOLEAN DEFAULT true,
        costPrice INT NOT NULL,
        supplier VARCHAR NOT NULL,
        FOREIGN KEY (category) REFERENCES categories(id),
        FOREIGN KEY (image) REFERENCES images(id),
        UNIQUE(name)
    );

CREATE TABLE
    IF NOT EXISTS product_coordinates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        product UUID NOT NULL,
        coordinates UUID NOT NULL,
        FOREIGN KEY (product) REFERENCES products(id),
        FOREIGN KEY (coordinates) REFERENCES coordinates(id)
    );

CREATE TABLE
    IF NOT EXISTS tags (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL UNIQUE
    );

CREATE TABLE
    IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS tag_values (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        tag UUID NOT NULL,
        FOREIGN KEY (tag) REFERENCES tags(id),
        UNIQUE(name, tag)
    );

CREATE TABLE
    IF NOT EXISTS product_tags (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        product UUID NOT NULL,
        tag_and_value_id UUID NOT NULL,
        FOREIGN KEY (product) REFERENCES products(id),
        FOREIGN KEY (tag_and_value_id) REFERENCES tag_values(id),
        UNIQUE(product, tag_and_value_id)
    );

INSERT INTO coordinates (lat, lng) VALUES
    (40.7128, -74.0060),
    (41.8781, -87.6298),
    (34.0522, -118.2437),
    (37.7749, -122.4194),
    (51.5074, -0.1278),
    (48.8566, 2.3522),
    (35.6895, 139.6917),
    (55.7558, 37.6176);


INSERT INTO
    categories (name, clicked)
VALUES ('Phones', 0), ('Computers', 0);

INSERT INTO tags (name)
VALUES ('brand'), ('material'), ('color'), ('storage');

INSERT INTO images (url, alt)
VALUES (
        'https://images.unsplash.com/photo-1581093458791-9f3c3250a8b0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvbmUlMjBwaG9uZSUyMHNob3BwaW5nJTIwY29tcHV0ZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        'phone'
    ), (
        'https://images.unsplash.com/photo-1581093458791-9f3c3250a8b0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvbmUlMjBwaG9uZSUyMHNob3BwaW5nJTIwY29tcHV0ZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        'computer'
    );

INSERT INTO
    products (
        name,
        price,
        quantity,
        description,
        image,
        category,
        discount,
        rating,
        clicked,
        costPrice,
        supplier
    )
VALUES (
        'Samsung Galaxy S21',
        1000,
        540,
        'Samsung Galaxy S21 5G | Factory Unlocked Android Cell Phone | US Version 5G Smartphone | Pro-Grade Camera, 8K Video, 64MP High Res | 128GB, Phantom Gray (SM-G991UZAAXAA)', (
            SELECT id
            FROM images
            WHERE
                alt = 'phone'
        ), (
            SELECT id
            FROM categories
            WHERE
                name = 'Phones'
        ),
        0,
        5,
        0,
        500,
        'ivan electronics'
    ), (
        'Lenovo IdeaPad 3',
        500,
        800,
        'Lenovo IdeaPad 3 14 Laptop, 14.0 FHD 1920 x 1080 Display, AMD Ryzen 5 3500U Processor, 8GB DDR4 RAM, 256GB SSD, AMD Radeon Vega 8 Graphics, Narrow Bezel, Windows 10, 81W0003QUS, Abyss Blue', (
            SELECT id
            FROM images
            WHERE
                alt = 'computer'
        ), (
            SELECT id
            FROM categories
            WHERE
                name = 'Computers'
        ),
        0,
        5,
        0,
        250,
        'josh computing solutions'
    ), (
        'iPhone 12',
        900,
        600,
        'Apple iPhone 12 | 256GB | Space Gray | Unlocked', (
            SELECT id
            FROM images
            WHERE
                alt = 'phone'
        ), (
            SELECT id
            FROM categories
            WHERE
                name = 'Phones'
        ),
        0,
        4.6,
        0,
        550,
        'Apple Inc.'
    ), (
        'Google Pixel 5',
        800,
        450,
        'Google Pixel 5 | 128GB | Just Black | Unlocked', (
            SELECT id
            FROM images
            WHERE
                alt = 'phone'
        ), (
            SELECT id
            FROM categories
            WHERE
                name = 'Phones'
        ),
        0,
        4.4,
        0,
        480,
        'Google Technologies'
    ), (
        'OnePlus Nord 2',
        600,
        300,
        'OnePlus Nord 2 5G | 128GB | Blue Haze | Unlocked', (
            SELECT id
            FROM images
            WHERE
                alt = 'phone'
        ), (
            SELECT id
            FROM categories
            WHERE
                name = 'Phones'
        ),
        0,
        4.7,
        0,
        480,
        'OnePlus Ltd.'
    ), (
        'Dell Inspiron 14',
        700,
        400,
        'Dell Inspiron 14 Laptop, 14.0 FHD 1920 x 1080 Display, Intel Core i5, 8GB RAM, 512GB SSD, Intel UHD Graphics, Windows 10, Silver', (
            SELECT id
            FROM images
            WHERE
                alt = 'computer'
        ), (
            SELECT id
            FROM categories
            WHERE
                name = 'Computers'
        ),
        0,
        4.5,
        0,
        600,
        'Dell Technologies'
    ), (
        'HP Envy x360',
        850,
        350,
        'HP Envy x360 Convertible Laptop, 13.3-inch FHD Touchscreen, AMD Ryzen 7, 16GB RAM, 512GB SSD, Windows 10, Nightfall Black', (
            SELECT id
            FROM images
            WHERE
                alt = 'computer'
        ), (
            SELECT id
            FROM categories
            WHERE
                name = 'Computers'
        ),
        0,
        4.8,
        0,
        720,
        'HP Inc.'
    ), (
        'Acer Laptop 300',
        1200,
        200,
        'Acer Predator Helios 300 Gaming Laptop, 15.6-inch FHD 144Hz Display, Intel i7, 16GB RAM, 512GB SSD, NVIDIA GeForce RTX 3060, Windows 10', (
            SELECT id
            FROM images
            WHERE
                alt = 'computer'
        ), (
            SELECT id
            FROM categories
            WHERE
                name = 'Computers'
        ),
        0,
        4.9,
        0,
        950,
        'Acer Inc.'
    );

INSERT INTO
    tag_values (name, tag)
VALUES (
        'Samsung', (
            SELECT id
            FROM tags
            WHERE
                name = 'brand'
        )
    ), (
        'Lenovo', (
            SELECT id
            FROM tags
            WHERE
                name = 'brand'
        )
    ), (
        'Plastic', (
            SELECT id
            FROM tags
            WHERE
                name = 'material'
        )
    ), (
        'Metal', (
            SELECT id
            FROM tags
            WHERE
                name = 'material'
        )
    ), (
        'Black', (
            SELECT id
            FROM tags
            WHERE
                name = 'color'
        )
    ), (
        'White', (
            SELECT id
            FROM tags
            WHERE
                name = 'color'
        )
    ), (
        '128GB', (
            SELECT id
            FROM tags
            WHERE
                name = 'storage'
        )
    ), (
        'iPhone', (
            SELECT id
            FROM tags
            WHERE
                name = 'brand'
        )
    ), (
        'Google', (
            SELECT id
            FROM tags
            WHERE
                name = 'brand'
        )
    ), (
        'OnePlus', (
            SELECT id
            FROM tags
            WHERE
                name = 'brand'
        )
    ), (
        'Aluminum', (
            SELECT id
            FROM tags
            WHERE
                name = 'material'
        )
    ), (
        'Blue', (
            SELECT id
            FROM tags
            WHERE
                name = 'color'
        )
    ), (
        'Silver', (
            SELECT id
            FROM tags
            WHERE
                name = 'color'
        )
    ), (
        '512GB', (
            SELECT id
            FROM tags
            WHERE
                name = 'storage'
        )
    ), (
        '256GB', (
            SELECT id
            FROM tags
            WHERE
                name = 'storage'
        )
    );

INSERT INTO
    product_tags (product, tag_and_value_id)
VALUES ( (
            SELECT id
            FROM products
            WHERE
                name = 'Samsung Galaxy S21'
        ), (
            SELECT id
            FROM tag_values
            WHERE
                name = 'Samsung'
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'Samsung Galaxy S21'
        ), (
            SELECT id
            FROM tag_values
            WHERE
                name = 'Plastic'
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'Lenovo IdeaPad 3'
        ), (
            SELECT id
            FROM tag_values
            WHERE
                name = 'Lenovo'
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'Lenovo IdeaPad 3'
        ), (
            SELECT id
            FROM tag_values
            WHERE
                name = 'Metal'
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'Lenovo IdeaPad 3'
        ), (
            SELECT id
            FROM tag_values
            WHERE
                name = 'Black'
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'Samsung Galaxy S21'
        ), (
            SELECT id
            FROM tag_values
            WHERE
                name = 'White'
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'Samsung Galaxy S21'
        ), (
            SELECT id
            FROM tag_values
            WHERE
                name = '128GB'
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'Lenovo IdeaPad 3'
        ), (
            SELECT id
            FROM tag_values
            WHERE
                name = '256GB'
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'iPhone 12'
        ), (
            SELECT id
            FROM tag_values
            WHERE
                name = 'iPhone'
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'Google Pixel 5'
        ), (
            SELECT id
            FROM tag_values
            WHERE
                name = 'Google'
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'OnePlus Nord 2'
        ), (
            SELECT id
            FROM tag_values
            WHERE
                name = 'OnePlus'
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'Google Pixel 5'
        ), (
            SELECT id
            FROM tag_values
            WHERE
                name = 'Aluminum'
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'OnePlus Nord 2'
        ), (
            SELECT id
            FROM tag_values
            WHERE
                name = 'Blue'
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'Dell Inspiron 14'
        ), (
            SELECT id
            FROM tag_values
            WHERE
                name = 'Aluminum'
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'HP Envy x360'
        ), (
            SELECT id
            FROM tag_values
            WHERE
                name = 'Silver'
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'Acer Laptop 300'
        ), (
            SELECT id
            FROM tag_values
            WHERE
                name = '256GB'
        )
    );

INSERT INTO
    product_coordinates (product, coordinates)
VALUES ( (
            SELECT id
            FROM products
            WHERE
                name = 'Lenovo IdeaPad 3'
        ), (
            SELECT id
            FROM coordinates
            WHERE
                lat = 40.7128
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'Samsung Galaxy S21'
        ), (
            SELECT id
            FROM coordinates
            WHERE
                lat = 41.8781
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'iPhone 12'
        ), (
            SELECT id
            FROM coordinates
            WHERE
                lat = 34.0522
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'Google Pixel 5'
        ), (
            SELECT id
            FROM coordinates
            WHERE
                lat = 37.7749
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'OnePlus Nord 2'
        ), (
            SELECT id
            FROM coordinates
            WHERE
                lat = 51.5074
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'Dell Inspiron 14'
        ), (
            SELECT id
            FROM coordinates
            WHERE
                lat = 48.8566
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'HP Envy x360'
        ), (
            SELECT id
            FROM coordinates
            WHERE
                lat = 35.6895
        )
    ), ( (
            SELECT id
            FROM products
            WHERE
                name = 'Acer Laptop 300'
        ), (
            SELECT id
            FROM coordinates
            WHERE
                lat = 55.7558
        )
    );

CREATE OR REPLACE FUNCTION add_user(p_email VARCHAR, p_password VARCHAR)
RETURNS TABLE (
  id UUID,
  email VARCHAR,
  password VARCHAR
) AS $$
BEGIN
  INSERT INTO users(email, password)
  VALUES (p_email, p_password)
  RETURNING id, email, password INTO id, email, password;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_user(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  email VARCHAR,
  password VARCHAR
) AS $$
BEGIN
  RETURN QUERY SELECT * FROM users WHERE users.id = p_user_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_user_by_email(p_email VARCHAR)
RETURNS TABLE (
  id UUID,
  email VARCHAR,
  password VARCHAR
) AS $$
BEGIN
  RETURN QUERY SELECT * FROM users WHERE users.email = p_email;
END;
$$ LANGUAGE plpgsql;
