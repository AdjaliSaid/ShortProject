import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import './DataShow.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function DataShow({search,userData }) {
    const [patients,setPatients] = useState([]);
    useEffect(function () {
      const userId=userData.userId;
      axios.get(`http://localhost:3001/getPatients/${userId}`)
      .then(function (res) {
        setPatients(res.data)
      })
      .catch(err => console.log(err));
    },[])
    const navigate = useNavigate(); 
    const columns = [
        { 
        name: 'Name',
        selector: row => row.name,
        sortable: true
        },
        {
        name: 'Email',
        selector: row => row.email,
        sortable: true
        },
        {
        name: 'Phone',
        selector: row => row.phone,
        sortable: true
        },
        {
          name: 'Actions',
          cell: row => (
              <div>
                  <button 
                      onClick={() => handleUpdate(row.id)} 
                      className="update-btn">
                      Upd
                  </button>
                  <button 
                      onClick={() => handleDelete(row.id)} 
                      className="delete-btn">
                      Del
                  </button>
              </div>
          ),
          ignoreRowClick: true, // Prevent row click event from triggering on this column
          button: true
        }
    ];

    const handleRowClick = (row) => {
      navigate(`/CaseInfo`, { state: { From: "update",PatientData: row } }); // Pass user data as state
    };
    

    const handleUpdate = (id) => {
      const selectedUser = patients.find(user => user.id === id);
      if (selectedUser) {
          navigate(`/CaseInfo`, { state: { From: "update",PatientData: selectedUser } });
      }
  };
  

  const handleDelete = (id) => {
    axios.post("http://localhost:3001/deletePatients",{id});
    window.location.reload();
  };

  const filteredPatients = patients.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
});

  return (
    <div className="data-table-container">
      <DataTable 
        columns={columns} 
        data={filteredPatients} 
        fixedHeader
        onRowClicked={handleRowClick}
        highlightOnHover // Makes it look clickable
        pointerOnHover // Changes cursor to pointer
      />
    </div>  
  );
}

export default DataShow;