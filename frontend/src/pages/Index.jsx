import { ACCESS_TOKEN } from "../components/constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Index() {
  const token = localStorage.getItem("access");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate()

  function CheckIfAuthenticated() {
    if (token) {
      setIsAuthenticated(true);
    }
  }

  useEffect(() => {
    CheckIfAuthenticated();
  }, []);

  function handleRegisterClick(){
    navigate("/register")
  }

  function handleLoginClick(){
    navigate("/Login")
  }

  function handleLogoutClick(){
    navigate("/logout")
  }

  return (
    <>
      Hello Welcome to Landing Page
      <div>
        <p>Simple Authentication With React and Django </p>

        {isAuthenticated === true ? (
          <div>
            <p>A User is Currently Login In</p>
            <button onClick={handleLogoutClick}>Logout</button>
          </div>
        ) : (
          <div>
            <button onClick={handleRegisterClick}>Register</button>
            <button onClick={handleLoginClick}>Login</button>
          </div>
        )}
      </div>
    </>
  );
}
