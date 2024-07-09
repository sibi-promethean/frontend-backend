const express=require("express")
const router=express.Router()

const service=require("../controllers/student")

let routes=(app)=>{
    router.post("/registeruser",service.registeruser)
    router.get("/loginuser",service.loginUser)
    router.post("/signin",service.signin)

    app.use("/api",router)


}

module.exports=routes