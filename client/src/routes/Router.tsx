import { Route, Routes } from 'react-router-dom';
import App from '../App';
import ROUTES from './routes';

const Router = () => {
  return (
    <Routes>
      <Route path={'/'} element={<App />}>
        <Route index={true} path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
      </Route>
      <Route path={ROUTES.DEFAULT} element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
