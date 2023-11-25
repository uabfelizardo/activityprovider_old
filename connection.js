const mysql = require('mysql');
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'aps'
});

/**/
con.connect((err)=>{
    if(err){
        console.log("Database not connected");
    }else{
        console.log("Connected")
    }
});

module.exports = con;