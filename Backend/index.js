const express = require("express");

const mysql=require("mysql")

const cors=require("cors") 


const app=express() 

app.use(cors()); 
app.use(express.json())


const connection=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DBNAME
});


app.get("/",(req,res)=>{
    res.send("Hi")
})


app.post("/client",(req,res)=>{ 
    const {name,email,phone,message}=req.body 
    const values=[name,email,phone,message]

    
    connection.query(`INSERT INTO clients (name,email,phone,message) Values(?,?,?,?)`,values,(err,data)=>{
        if (err){
            return res.json("Form failed to Submit!")
            console.log(err)
        }
        console.log("Form Submitted Successfully.")
        return res.json("Form Submitted Successfully.")
    })

})

app.listen(2000,()=>{
    console.log("Server is started")
}) 