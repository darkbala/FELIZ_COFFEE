// eslint-disable-next-line no-unused-vars
const mysql=require('mysql')

// Configuration
const conn=mysql.createConnection({
    host:"127.0.0.1",
    user:"localhost",
    database:"feliz_data",
    password:''

});

conn.connect(err=>{
    if(err){
        console.log(err)
        return err;
    }else{
        console.log('Database----ok')
    }
})