import logo from "./assets/Logo.jpeg";
import bgImage from "./assets/connnn.jpg"; 
import { useNavigate } from "react-router-dom";

function Home(){

  const navigate = useNavigate(); 

    return(
        <>
        <div style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh"
      }}>
          <nav className="nav">
              <div className="logo">
                  <img src={logo} alt="Logo" className="logo-img" />
              </div>
              <div className="nav-links">
                <button className="nav-btn" onClick={() => navigate("/Login", { state: { action: "Login" } })} >Log In</button>
                <button className="nav-btn2" onClick={() => navigate("/Login", { state: { action: "SignUp" } })}>Sign In</button>
              </div>
          </nav>
        </div>
        </>
    );

}

export default Home;