//import express from "express";
//import cors from "cors";                                                  //Import generating unknown error.

const Client = require('pg').Client;
const Pool = require('pg').Pool;
const pool = new Pool(
    {   
        "host": "localhost",
        "user": "postgres",
        "password": "root",
        "port": 5432,
        "database": "postgres"
    }
);

const express = require("express");
const cors = require("cors");                                           

const app = express();
app.use(cors());
app.use(express.json());

app.get('/details', async function(req, res) {
    
    let results;

    try {
        console.log("CONNECTED");
        results = await(pool.query("SELECT * FROM employees ORDER by id"));
        console.table(results.rows);
    }
    catch(e) {
        console.log(e);
    }
    finally {
        res.send(JSON.stringify(results.rows));
    }
    
});

app.get('/details/:id', async function(req, res) {
    
    let id = req.params.id;
    let results;
   
    try {
        results = await(pool.query("SELECT * FROM employees WHERE id=" + id + ""));
    }
    catch(e) {
        console.log(e);
    }
    finally {
        res.send(JSON.stringify(results.rows));
    }

});

app.post('/details', async function(req, res) {

    try {
        await(pool.query("INSERT INTO employees (id, firstname, middlename, lastname, email, phone, role, address) VALUES ('" 
                                + req.body.id + "','" + req.body.firstname + "','" + req.body.middlename + "','" 
                                + req.body.lastname + "','" + req.body.email + "','" + req.body.phone + "','" 
                                + req.body.role + "','" + req.body.address + "')"));

        console.log(req.body.firstname);
    }
    catch(e) {
        console.log(e);
    }
});


app.patch('/details/:id', async function(req, res) {

    let id = req.params.id;
    let results;
   
    try {
        await(pool.query("UPDATE employees SET firstname ='" + req.body.firstname + 
                                        "',lastName ='" + req.body.lastname + 
                                        "',middlename = '" + req.body.middlename + 
                                        "',email = '" + req.body.email + 
                                        "',phone ='" + req.body.phone + 
                                        //"',role ='" + req.body.role + 
                                        "',address ='" + req.body.address + 
                                        "'WHERE id=" + id + ""));

        results = await(pool.query("SELECT * FROM employees"));
    }
    catch(e) {
        console.log(e);
    }
    finally {
        res.send(JSON.stringify(results.rows));
    }
});


app.delete('/details/:id', async function(req, res) {

    let id = req.params.id;

    try {
       await(pool.query("DELETE FROM employees WHERE id=" + id + ""));
    }
    catch(e) {
        console.log(e);
    }
    finally {
        res.send();
    }
});

var port = process.env.PORT || 3000;
app.listen(port);