import  { useEffect, useState } from 'react';
import React from 'react';
import './searchBar.css'; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";


function SearchBar ({sendData,userData }){
    const navigate = useNavigate(); // Initialize navigation function
    const [search,setSearch] = useState('');
    useEffect(function () {
        sendData(search);
    },[search])
    const handleAddClick = () => {
        
        navigate("/CaseInfo",{ state: { From: "insert",PatientData: userData } });
    };



    return ( 
        <div className="search-container">
            <div className='input-wrapper'>
                <input placeholder='Type to search...' onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <button className='Add-button' onClick={handleAddClick} >+</button>
        </div>
    );
}

export default SearchBar;