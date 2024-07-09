const sql=require("mssql/msnodesqlv8")

const conn={
    database:"frontend",
    server:"sibi\\SQLEXPRESS",
    options: {
        trustedConnection: true,
        trustServerCertificate: true,
      },
};

const poolpromise=new sql.ConnectionPool(conn,(err)=>{
    if(err) throw err;
    console.log("database connected")


})

module.exports={
    sql,
    poolpromise
}