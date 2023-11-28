import Dashboard from "../components/Home/dashboard/Dashboard"
import { useState, useEffect } from "react";
import { useAppSelector } from "../utils/store/hooks"
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const {email} = useAppSelector((state) => state.email);
  const navigate = useNavigate();

  useEffect(() => {
    if (email === "") {
      navigate("/login");
    }
  }, []);

  
  
  return (
    <>
    <Dashboard isUpdated={isUpdated} setIsUpdated={setIsUpdated}/>
    </>
  )
}
