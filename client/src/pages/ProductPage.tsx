import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../utils/store/hooks';
import { useEffect } from 'react';

export default function ProductPage() {
  const { email } = useAppSelector((state) => state.email);
  const navigate = useNavigate();

  useEffect(() => {
    if (email === '') {
      navigate('/login');
    }
  }, []);
  return <div>ProductPage</div>;
}
