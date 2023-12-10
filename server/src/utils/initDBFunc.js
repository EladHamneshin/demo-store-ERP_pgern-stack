const fs = require('fs');
const data = require('../../data.json');

const b = (data, outputFile) => {
    let query = '';
  
    data.forEach((category) => {
      // Insert or update categories
      query += `INSERT INTO categories (name, clicked) VALUES ('${category.category}', 0);`;
  
      category.products.forEach((product) => {
        // Insert or update images
        query += `INSERT INTO images (url, alt) VALUES ('${product.image.url}', '${product.image.alt}');`;
  
        // Insert or update products
        query += `
          INSERT INTO products (
            name, price, quantity, description, image, category, discount, rating, clicked, costPrice, supplier
          ) 
          VALUES (
            '${product.name}', ${product.saleprice}, ${product.quantity}, '${product.description}', 
            (SELECT id FROM images WHERE alt = '${product.image.alt}'), 
            (SELECT id FROM categories WHERE name = '${category.category}'), 
            ${product.discount}, ${product.rating}, ${product.clicked}, ${product.costprice}, '${product.supplier}'
          );`;
  
        // Insert or update tags, tag_values, and product_tags
        for (const key in product.tags) {
          query += `
            INSERT INTO tags (name) VALUES ('${key}') ON CONFLICT (name) DO NOTHING;
            INSERT INTO tag_values (name, tag) VALUES ('${product.tags[key]}', (SELECT id FROM tags WHERE name = '${key}')) ON CONFLICT (name, tag) DO NOTHING;
            INSERT INTO product_tags (product, tag_and_value_id) VALUES (
              (SELECT id FROM products WHERE name = '${product.name}'), 
              (SELECT id FROM tag_values WHERE name = '${product.tags[key]}' AND tag = (SELECT id FROM tags WHERE name = '${key}'))
            ) ON CONFLICT (product, tag_and_value_id) DO NOTHING;`;
        }
  
        // Insert or update coordinates and product_coordinates
        query += `INSERT INTO coordinates (lat, lng) VALUES (${product.coordinate.latitude}, ${product.coordinate.longitude}) ON CONFLICT DO NOTHING;`;
        query += `INSERT INTO product_coordinates (product, coordinates) VALUES (
          (SELECT id FROM products WHERE name = '${product.name}'), 
          (SELECT id FROM coordinates WHERE lat = ${product.coordinate.latitude} AND lng = ${product.coordinate.longitude})
        );`;
      });
    });
    fs.writeFileSync(outputFile, query, 'utf-8');
    // console.log(query);
  };
  
b(data, 'output.sql');