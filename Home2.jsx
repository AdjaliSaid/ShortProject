import { useState, useEffect } from "react";  // Add this line
import "./home2.css";
import bgImage from "./assets/home2.jpg";
import { useLocation, useNavigate } from "react-router-dom"; 
import SearchBar from "./SearchBar"; 
import DataShow from "./DataShow"; // Import the DataShow component
function Home2() {
    const location = useLocation();
    const [dataFromSearch, setDataFromSearch] = useState("");    
    const [userData, setUserData] = useState(location.state);    
        useEffect(() => {
            if (location.state) {
                setUserData(location.state);
            }
        }, [location.state]);
    return (
        <>
            <div className="home" style={{ 
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover", 
                backgroundPosition: "center",
                height: "100vh", 
                width: "100%" 
                }}>
                    <div className="search-bar-container">
                        <SearchBar sendData={setDataFromSearch} userData={userData}/>
                        <DataShow search={dataFromSearch} userData={userData} />
                    </div>
            </div>
        </>
    );
}

export default Home2;
