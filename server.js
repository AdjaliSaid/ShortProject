const express=require("express");
const cors=require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app= express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"PatientsDB"
});
//start Patients handling
// response to home2 for print all the patients
app.get("/getPatients/:userId",function (req,res) {
    const id=req.params.userId;    
    const sql="SELECT * FROM patients WHERE userId = ?";
    db.query(sql,[id],function(err,data) {
        if(err) return res.json("Error");
        return res.json(data);
    });
})
// get request from home2 to insert a patient in database
app.post("/insertPatients",function (req,res) { 
    const VALUES = [req.body.name,req.body.email,req.body.phone,req.body.userId];  
    const sql="INSERT INTO patients (name,email,phone,userId) VALUES(?,?,?,?)";
    db.query(sql,VALUES);
})
// get request from home2 to update a patient in database
app.post("/updatePatients",function (req,res) { 
    const VALUES = [req.body.name,req.body.email,req.body.phone];  
    const id=req.body.id;
    const sql="UPDATE patients SET name=? , email=? , phone=? WHERE id=?";
    db.query(sql,[...VALUES,id]);
})
// get request from home2 to delete a patient in database
app.post("/deletePatients",function (req,res) { 
    const id=req.body.id;

    const sql="DELETE FROM patients WHERE id=?";
    db.query(sql,[id]);
})
//end Patients handling

//start users handling
// get request from home2 to insert a patient in database
app.post("/createUser",function (req,res) { 
    const VALUES = [req.body.name,req.body.password];
    const sql="INSERT INTO users (name,password) VALUES(?,?)";
    db.query(sql,VALUES,function(err,data) {
        if(err) return res.json("Error");
        return res.json(data);
    });
})
// response to login for get all the users
app.get("/getUsers",function (req,res) {
    const sql="SELECT * FROM users";
    db.query(sql,function(err,data) {
        if(err) return res.json("Error");
        return res.json(data);
    });
})
//end users handling

app.listen(3001,function () {
    console.log("server is run");
})