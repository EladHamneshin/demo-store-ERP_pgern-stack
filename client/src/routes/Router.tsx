import { Route, Routes } from 'react-router-dom';
import App from '../App';
import ROUTES from './routes';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';

const Router = () => {
  return (
    <Routes>
      {/* add erp */}
      <Route path={'/'} element={<App />}>
        <Route index={true} path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
        {/* <Route path={ROUTES.EDIT_PRODUCT} element={<EditProductPage />} /> */}
      </Route>
      <Route path={ROUTES.DEFAULT} element={<NotFoundPage />} /> 
    </Routes>
  );
};

export default Router;
