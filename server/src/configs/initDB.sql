-- Active: 1694592686543@@127.0.0.1@5432@demo_store
CREATE TABLE
    IF NOT EXISTS coordinates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        lat FLOAT NOT NULL,
        lng FLOAT NOT NULL,
        UNIQUE(lat,lng)
    );

CREATE TABLE
    IF NOT EXISTS categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        clicked INT NOT NULL
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
        rating INT NOT NULL,
        clicked INT NOT NULL,
        isForSale BOOLEAN DEFAULT true,
        costPrice INT NOT NULL,
        supplier VARCHAR NOT NULL,
        FOREIGN KEY (category) REFERENCES categories(id),
        FOREIGN KEY (image) REFERENCES images(id)
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
    IF NOT EXISTS tag_values (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        tag UUID NOT NULL,
        FOREIGN KEY (tag) REFERENCES tags(id)
    );

CREATE TABLE
    IF NOT EXISTS product_tags (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        product UUID NOT NULL,
        tag_and_value_id UUID NOT NULL,
        FOREIGN KEY (product) REFERENCES products(id),
        FOREIGN KEY (tag_and_value_id) REFERENCES tag_values(id)
    );

INSERT INTO coordinates (lat, lng) values (40.7128, -74.0060);

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
                lat = 40.7128
        )
    );

