// const express = require("express") ;
// const c = require("colors") ;
import  express, { json }  from "express";
import  colors  from "colors";
import dotenv from "dotenv" ;
import morgan from "morgan";
import connectDB from "./config/db.js";
import  authRoutes from "./routes/authRoute.js" ;
import categoryRoutes from "./routes/categoryRoutes.js" ;
import productRoutes from "./routes/productRoutes.js" ;

import cors from "cors" ;

// configure env 
dotenv.config("/.env");

// database config
connectDB() ;

// rest object
const app = express() ;

//middlewares
app.use(morgan("dev")) ;
app.use(json()) ;
app.use( cors() ) ; 

//routes 
app.use("/api/v1/auth" , authRoutes ) ;
app.use("/api/v1/category" , categoryRoutes ) ;
app.use("/api/v1/product" , productRoutes ) ;

// rest api 
app.get("/" , (req,res)=>{
    res.send( 
       "<h1> Welcome to our ECOM website.</h1>"
    ) ;
}) ;

// app.get("/api/v1/auth/user-auth" , (req,res)=>{
//     res.status(200).send( {ok : true }) ;
// }) ;

// PORT 
const PORT = process.env.PORT || 8080;

app.listen( PORT , ()=>{
    console.log(`Server is running at ${PORT}`.bgCyan.white) ;
}) ;

