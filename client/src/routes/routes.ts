const ROUTES = {
    //add /erp
    HOME: '/erp',
    LOGIN: '/erp/login',
    REGISTER: '/erp/register',
    PRODUCT: '/erp/product/:pid', // use :product_id to identify the product
    PRODUCT_ROUTE: '/erp/product', // use :product_id to identify the product
    DEFAULT: '*'
};

export default ROUTES;