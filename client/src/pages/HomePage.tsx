import Dashboard from "../components/Home/dashboard/Dashboard"
import { useEffect } from "react";
import { useAppSelector } from "../utils/store/hooks"
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const {email} = useAppSelector((state) => state.email);
  const navigate = useNavigate();

  useEffect(() => {
    if (email === "") {
      navigate("/erp/login");
    }
  }, []); 

  return (
    <>
    <Dashboard/>
    </>
  )
}
