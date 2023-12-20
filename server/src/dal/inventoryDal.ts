import { AdminProduct } from '../types/Product';
import query from '../utils/queryDB';
import { redisClient } from '../app';


export const getAllProductsDal = async () => {  

  const RedisAllProducts = await (await redisClient).GET('products');  
  if (!RedisAllProducts) {
    const {rows}: { rows:AdminProduct[] }  = await query(selectAll);
    (await redisClient).set('products', JSON.stringify(rows))
    return rows;
  }
  else {
    return JSON.parse(RedisAllProducts);
  }
};

export const getProductByIdDal = async (id: string) => {    
  const RedisAllProducts = await (await redisClient).GET('products');  
  if (!RedisAllProducts) {
    const {rows}: { rows:AdminProduct[] } = await query(`SELECT p.id, 
    p.name, 
    p.price AS saleprice,
    p.quantity, 
    p.description, 
    c.name AS category,
    p.discount,
    p.rating, 
    p.clicked AS clicked,
    json_build_object('url', i.url, 'alt', i.alt) AS image, 
      json_build_object('longitude', c2.lng, 'latitude', c2.lat) AS coordinate,
    jsonb_object_agg(t.name, tv.name) AS tags,
    p.isForSale,
    p.costPrice,
    p.supplier
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
        ON tv.tag = t.id 
    WHERE p.id = '${id}' 
    GROUP BY p.id, c.name, i.url, i.alt, c2.lng, c2.lat;`)
    return rows[0];
  }
  else {
    const product = JSON.parse(RedisAllProducts).filter((product: AdminProduct)=> {
        if (product.id == id) {
          return product
        } 
    });
    return product[0]
  }
};

export const addNewProductDal = async (
  newProduct: Omit<AdminProduct, 'id'>
) => {
  const insertCategory = await query(`
  INSERT INTO categories (name, clicked)
  VALUES ('${newProduct.category}', 0)
  ON CONFLICT (name) DO NOTHING;
  `);
  
  const selectCategory = await query(`
  SELECT id FROM categories WHERE name = '${newProduct.category}';
  `);
  
  const category = await selectCategory.rows[0].id

  // Insert image
  const imageRes = await query(`
    INSERT INTO images (url, alt)
    VALUES ('${newProduct.image.url}', '${newProduct.image.alt}') returning *;`
  );

  // Insert product
  const res = await query(`
        INSERT INTO products (name, price, quantity, description, image, category, discount, rating, clicked, costprice, supplier)
        VALUES ('${newProduct.name}', ${newProduct.saleprice}, ${newProduct.quantity}, '${newProduct.description}', '${imageRes?.rows[0].id}', '${category}', ${newProduct.discount}, ${newProduct.rating}, ${newProduct.clicked}, ${newProduct.costprice}, '${newProduct.supplier}')
        returning *;
    `);

  const productId = res?.rows[0].id;

  // Insert tags
  for (const key in newProduct.tags) {
    const tagRes = await query(
      `INSERT INTO tags (name) VALUES ('${key}') ON CONFLICT (name) DO NOTHING returning *;`
    );
    let tagId = ' ';
    if (tagRes?.rows[0]) {
      tagId = tagRes.rows[0].id;
    } else {
      const idQuery = await query(`select id from tags where name = '${key}'`);
      tagId = idQuery?.rows[0].id;
    }

    const tagValueRes = await query(
      `INSERT INTO tag_values (name, tag) VALUES ('${newProduct.tags[key]}', '${tagId}') ON CONFLICT (name, tag) DO NOTHING returning *;`
    );
    let tagValueId = ' ';
    if (tagValueRes?.rows[0]) {
      tagValueId = tagValueRes?.rows[0].id;
    } else {
      const idQuery = await query(
        `select id from tag_values where name = '${newProduct.tags[key]}'`
      );
      tagValueId = idQuery?.rows[0].id;
    }

    await query(
      `INSERT INTO product_tags (product, tag_and_value_id) VALUES ('${productId}', '${tagValueId}') returning *;`
    );
  }

  // Insert coordinates
  const coordinatesRes = await query(
    `INSERT INTO coordinates (lat, lng) VALUES (${newProduct.coordinate.latitude}, ${newProduct.coordinate.longitude}) ON CONFLICT DO NOTHING returning *;`
  );

  let coordinatesId = ' ';
  if (coordinatesRes?.rows[0]) {
    coordinatesId = coordinatesRes.rows[0].id;
  } else {
    const idQuery = await query(
      `select id from coordinates where lat = ${newProduct.coordinate.latitude} and lng = ${newProduct.coordinate.longitude};`
    );
    coordinatesId = idQuery?.rows[0].id;
  }

  await query(
    `INSERT INTO product_coordinates (product, coordinates) VALUES ('${productId}', '${coordinatesId}') returning *;`
  );

  const {rows}: { rows:AdminProduct[] }  = await query(selectAll);
  (await redisClient).set('products', JSON.stringify(rows))
  
  // Get the product by ID
  const product = await getProductByIdDal(productId);

  return product;
};

export const updateProductByIdDal = async (partsOfProductToUpdate: Partial<AdminProduct>, id: string) => {

    const {rows: updatedProduct}: any = await query(`UPDATE products
    SET
        name = '${partsOfProductToUpdate.name}',
        price = ${partsOfProductToUpdate.saleprice},
        quantity = ${partsOfProductToUpdate.quantity},
        description = '${partsOfProductToUpdate.description}',
        discount = ${partsOfProductToUpdate.discount},
        rating = ${partsOfProductToUpdate.rating},
        clicked = ${partsOfProductToUpdate.clicked},
        isforsale = ${partsOfProductToUpdate.isforsale},
        costprice = ${partsOfProductToUpdate.costprice},
        supplier = '${partsOfProductToUpdate.supplier}'

    WHERE id = '${id}';  `);

  if (partsOfProductToUpdate.coordinate) {
    const coordinatesRes = await query(
      `INSERT INTO coordinates (lat, lng) VALUES (${partsOfProductToUpdate.coordinate.latitude}, ${partsOfProductToUpdate.coordinate.longitude}) ON CONFLICT DO NOTHING returning *;`
    );
    let coordinatesId = '';
    if (coordinatesRes?.rows[0]) {
      coordinatesId = coordinatesRes.rows[0].id;
    } else {
      const idQuery = await query(
        `select id from coordinates where lat = ${partsOfProductToUpdate.coordinate.latitude} and lng = ${partsOfProductToUpdate.coordinate.longitude};`
      );
      coordinatesId = idQuery?.rows[0].id;
    }

    const { rows: updatedCoordinate }: any =
      await query(`UPDATE product_coordinates
        SET 
            coordinates = '${coordinatesId}'
        WHERE product = '${id}'
        `);
  }

  if (partsOfProductToUpdate.tags) {
    for (const key in partsOfProductToUpdate.tags) {
      const tagRes = await query(
        `INSERT INTO tags (name) VALUES ('${key}') ON CONFLICT (name) DO NOTHING returning *;`
      );
      let tagId = ' ';
      if (tagRes?.rows[0]) {
        tagId = tagRes.rows[0].id;
      } else {
        const idQuery = await query(
          `select id from tags where name = '${key}'`
        );
        tagId = idQuery?.rows[0].id;
      }

      const tagValueRes = await query(
        `INSERT INTO tag_values (name, tag) VALUES ('${partsOfProductToUpdate.tags[key]}', '${tagId}') ON CONFLICT (name, tag) DO NOTHING returning *;`
      );
      let tagValueId = ' ';
      if (tagValueRes?.rows[0]) {
        tagValueId = tagValueRes?.rows[0].id;
      } else {
        const idQuery = await query(
          `select id from tag_values where name = '${partsOfProductToUpdate.tags[key]}'`
        );
        tagValueId = idQuery?.rows[0].id;
      }

      await query(
        `INSERT INTO product_tags (product, tag_and_value_id) VALUES ('${id}', '${tagValueId}') ON CONFLICT (product, tag_and_value_id) DO NOTHING returning *;`
      );
    }
  }

  if (partsOfProductToUpdate.image) {
    const { rows: imageId }: any = await query(
      `select image from products where id = '${id}'`
    );
    const { rows: updatedImage }: any = await query(`UPDATE images
        SET 
            url = '${partsOfProductToUpdate.image.url}',
            alt = '${partsOfProductToUpdate.image.alt}'
        WHERE id = '${imageId[0].image}'
        `);
  }

  const {rows}: { rows:AdminProduct[] }  = await query(selectAll);
  (await redisClient).set('products', JSON.stringify(rows))

  const product = await getProductByIdDal(id);

  return product;
};

export const deleteProductByIdDal = async (id: string) => {
    const {rows: imageId} = await query(`select image from products where id = '${id}'`);
    const {rows} = await query(`delete from product_coordinates where product = '${id}';
    delete from product_tags where product = '${id}';
    delete from products where id = '${id}' returning * ;`);
    await query(`delete from images where id = '${imageId[0].image}'`);

    const {rows: rows2}: { rows:AdminProduct[] }  = await query(selectAll);
    (await redisClient).set('products', JSON.stringify(rows2))
}


const selectAll = `SELECT p.id, 
p.name, 
p.price AS saleprice,
p.quantity, 
p.description, 
c.name AS category,
p.discount,
p.rating, 
p.clicked AS clicked,
json_build_object('url', i.url, 'alt', i.alt) AS image, 
json_build_object('longitude', c2.lng, 'latitude', c2.lat) AS coordinate,
jsonb_object_agg(t.name, tv.name) AS tags,
p.isForSale,
p.costPrice,
p.supplier
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
    ON tv.tag = t.id 
    GROUP BY p.id, c.name, i.url, i.alt, c2.lng, c2.lat;`
