// const prompt = require('prompt-sync')();
const con=require('./connection');
const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 1000;

// const app = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('APi working ...!');
//   });

app.get('/',(req,res)=>{
    // con.query("Get working ...");
});


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
