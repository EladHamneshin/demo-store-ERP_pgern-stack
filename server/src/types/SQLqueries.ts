export const getAllDataQuery =
    `SELECT p.id, 
        p.name, 
        p.price AS salePrice,
        p.quantity, 
        p.description, 
        c.name AS category,
        p.discount,
        p.rating, 
        p.clicked AS click,
        i.url AS image_url,
        i.alt AS image_alt,
        c2.lng AS longitude,
        c2.lat AS latitude,
        jsonb_object_agg(t.name, tv.name) AS tags
        FROM products p JOIN categories c 
            ON p.category = c.id 
        JOIN images i 
            ON p.image = i.id 
        JOIN product_coordinates pc 
            ON p.id = pc.product 
        JOIN coordinates c2 
            ON pc.coordinates = c2.id 
        LEFT JOIN product_tags pt 
            ON p.id = pt.product 
        LEFT JOIN tag_values tv 
            ON pt.tag_and_value_id = tv.id 
        LEFT JOIN tags t 
            ON tv.tag = t.id`



