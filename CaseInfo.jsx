import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CaseInfo.css'; 
import axios from 'axios';
function CaseInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const [PatientData, setPatientData] = React.useState(location.state.PatientData || {});

  const handleInputChange = (field, value) => {
    setPatientData(prevState => ({
      ...prevState,
    [field]: value
    
    }));
  };
  
  function handleSubmit(event) {  
    event.preventDefault();
    const name=PatientData.name,
          email=PatientData.email,
          phone=PatientData.phone,
          userId=PatientData.userId;
    if(name) {
      if(location.state.From=="insert") {
        axios.post("http://localhost:3001/insertPatients",{name,email,phone,userId})
      }else {
        const id=location.state?.PatientData.id;
        axios.post("http://localhost:3001/updatePatients",{id,name,email,phone})
      }
      navigate(-1);
    }else {
      const lableName=document.getElementById("nameLable");
      const inputName=document.getElementById("name");
      lableName.style.color="red";
      inputName.style.border = '2px solid red';
    }

  }
  return (
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
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      </div>
      <div className="container">
        <div className="header">
          <div className="text">User Information</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label id="nameLable" htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Enter your name" value={PatientData.name || ''} onChange={(e) => handleInputChange('name', e.target.value)} />
            </div>

            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Enter your email" value={PatientData.email || ''} onChange={(e) => handleInputChange('email', e.target.value)} />
            </div>

            <div className="input-field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" type="tel" placeholder="Enter your phone number" value={PatientData.phone || ''} onChange={(e) => handleInputChange('phone', e.target.value)} />
            </div>
            <div className='submit-container'>
              <button className='sub-btn'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CaseInfo;
