const express=require("express");
const app= express();
const mysql=require("mysql");
const cors=require("cors");
let mensaje="";

app.use(cors());//  doy aviso a la q usa cors
app.use(express.json());
// conexion a la base de datos
const db=mysql.createConnection({
    //host:"localhost",
    //user:"root",
    //password:"",
    //database:"empleados_crud"

    //host: "sql10.freemysqlhosting.net",
    //user:"sql10644248",
    //password:"LwNa8LhA2R",
    //port:"3306",
    //database:"sql10644248"

    host: "www.db4free.net",
    user:"juanca",
    password:"484000co",
    port:"3306",
    database:"juancabd"






});
// fin conexion

db.connect((error) =>{
    if(error){
        mensaje="ocurrio un poblema al conectar la base de datos!"
        console.log(mensaje);
    }
    else{
        mensaje="conectado ok, a la base de datos"
        console.log(mensaje);
        
    }
});



//creamos la funcion para guardar
app.post("/create",(request,response)=>{
    const nombre=request.body.nombre;
    const edad=request.body.edad;
    const pais=request.body.pais;
    const cargo=request.body.cargo;
    const experiencia=request.body.experiencia;

    db.query("INSERT INTO empleados(nombre,edad,pais,cargo,experiencia) VALUES(?,?,?,?,?)",[nombre,edad,pais,cargo,experiencia],
        (err,result)=>{
            if(err){
                console.log(err);
                
            }else{
                response.send("alta exitosa");
            }
        }
    );
});

// funcion para listar

app.get("/empleados",(request,response)=>{
    

    db.query("select * from empleados",
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                response.send(result);
                //console.log(result)
            }
        }
    );
});

// funcion para Actulizar
app.put("/update",(request,response)=>{
    const id=request.body.id;
    const nombre=request.body.nombre;
    const edad=request.body.edad;
    const pais=request.body.pais;
    const cargo=request.body.cargo;
    const experiencia=request.body.experiencia;

    db.query("update empleados set nombre=?,edad=?,pais=?,cargo=?,experiencia=? where id=?",[nombre,edad,pais,cargo,experiencia,id],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                response.send(result);
            }
        }
    );
});

// funcion para Eliminar
app.delete("/delete/:id",(request,response)=>{
    const id=request.params.id;
   
    db.query("delete from  empleados where id=?",id,
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                response.send(result);
            }
        }
    );
});







app.listen(3001,()=>{
    console.log("corriendo en el puerto 3001");

})
