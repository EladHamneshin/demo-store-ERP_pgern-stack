import React, { useEffect } from 'react';
import productsAPI from '../api/productsAPI'

interface MyComponentProps {
  apiUrl: string;
}

const MyComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productsAPI.getProduct('06025089-c459-4eea-8fae-22d00df4c9ae')
        console.log(response, 'Product');
        
        const data = await productsAPI.deleteProduct('06025089-c459-4eea-8fae-22d00df4c9ae')
        // const response = await userAPI.loginUser('yt7756321@gmail.com', 'sSomething23@$hrsec')
        // const myCookieValue = document.cookie.split(';').find(cookie => cookie.includes('jwt'));
        // setData(response);
        // Cookies.set('jwt', myCookieValue!)
        console.log(data, 'delete');

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};

export default MyComponent;
