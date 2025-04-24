import user from './assets/user.png';
import password from './assets/password.png';
import './login.css';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom"; 
import axios from 'axios';

function Login (){
    const location = useLocation();  // Correct usage
    const navigate = useNavigate(); 
    const [users,setUsers] = useState([]);
    const [action, setAction] = useState(location.state.action);
    // showMessage is true when the user is exist in database
    const [showMessage, setShowMessage] = useState(false);
    const [showMessage2, setShowMessage2] = useState(false);

    useEffect(() => {
        if (location.state?.action) {
            setAction(location.state.action);
        }
    }, [location.state]);
    useEffect(function () {
        axios.get('http://localhost:3001/getUsers')
        .then(function (res) {
            setUsers(res.data)
        })
        .catch(err => console.log(err));
    }, []);

    const [userData, setuserData] = useState("");
    const handleInputChange = (field, value) => {
        setuserData(prevState => ({
        ...prevState,
        [field]: value
        
        }));
    };
    // if a value exist in an array
    function valueExists() {
        for (let i = 0; i < users.length; i++) {
            if (users[i]["name"] === userData.name && users[i]["password"]===userData.password) {                    
                return users[i]["id"];
            }
        }
        return -1;
    }
    
    function HandleSignUp() {
        if(userData.name && userData.password) {
            // test if the username is unique  
            const id=valueExists();          
            if(id==-1) {
                axios.post("http://localhost:3001/createUser",userData)
                .then(function (req) {
                    navigate("/home2",{ state: {userId: req.data.insertId } } );
                })
            }else {
                setShowMessage(true);
            }
        }else {
            const Name=document.getElementById("name");
            const password=document.getElementById("password");
            if(userData.name) {
                Name.style.border="none"
                password.style.border = '2px solid red';
            }else {
                if(userData.password) {
                    password.style.border="none"
                    Name.style.border = '2px solid red';
                }else {
                    password.style.border = '2px solid red';
                    Name.style.border = '2px solid red';
                }
            }
        }
    }

    function HandleLogin() {
        if(userData.name && userData.password) {
            // test if the username is unique
            const id=valueExists();
            if(id!=-1) {
                navigate("/home2",{ state: { userId: id } } )
            }else {
                setShowMessage2(true);
            }
        }else {
            const Name=document.getElementById("name");
            const password=document.getElementById("password");
            if(userData.name) {
                Name.style.border="none"
                password.style.border = '2px solid red';
            }else {
                if(userData.password) {
                    password.style.border="none"
                    Name.style.border = '2px solid red';
                }else {
                    password.style.border = '2px solid red';
                    Name.style.border = '2px solid red';
                }
            }
        }
        
    }
    return(
        <div style={{
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            height: "100vh",
            width: "100vw",
            margin: "0",
            padding: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(#F7A8C4,#E53888)",
            position: "fixed",
            top: "0",
            left: "0"
        }}>
            

            <div className="back-home-container">
                <button className="back-home-btn" onClick={() => navigate("/")}> Back </button>
            </div>
            <div className='container'>
                <div className='header'>
                    <div className='text'>{action}</div>
                    <div className='underline'></div>
                </div>
                <div className='inputs'>
                    <div className='input' id="name">
                        <img src= {user} alt=""/>
                        <input type = "text" placeholder='Name'  onChange={(e) => handleInputChange('name', e.target.value)} />
                    </div>
                    <div className='input' id="password">
                        <img src={password} alt=""/>
                        <input type = "password" placeholder='Password'  onChange={(e) => handleInputChange('password', e.target.value)}/>
                    </div>
                </div>
                <div className='submit-container'>
                    {action === "Login" && (
                        <button  className="submit" onClick={() => {HandleLogin()}}>Login</button>
                    )}
                    {action === "SignUp" && (
                        <button className="submit" onClick={() => {HandleSignUp()}}>Sign Up</button>
                    )}
                </div>
                {showMessage && (
                    <div className="showMessage">you are already exist in the database</div>
                )}
                {showMessage2 && (
                    <div className="showMessage">you are not exist in the database you need to Sign Up</div>
                )}
            </div>
        
        </div>  
    );
}

export default Login;
