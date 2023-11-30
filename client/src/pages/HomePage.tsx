import Dashboard from "../components/Home/Dashboard"
import { useEffect } from "react";
import { useAppSelector } from "../utils/store/hooks"
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routes";

export default function HomePage() {
  const {email} = useAppSelector((state) => state.email);
  const navigate = useNavigate();

  useEffect(() => {
    if (email === "") {
      navigate(ROUTES.LOGIN);
    }
  }, []);
  return (
    <>
    <Dashboard/>
    </>
  )
}
