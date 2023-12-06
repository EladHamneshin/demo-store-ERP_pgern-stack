import Dashboard from "../components/Home/dashboard/Dashboard"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routes";

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('erp_token') === "") {
      navigate(ROUTES.LOGIN);
    }
  }, []); 

  return (
    <>
    <Dashboard/>
    </>
  )
}
