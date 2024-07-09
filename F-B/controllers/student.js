const db=require("../db/db")
// const path=require("path")
const bcrypt=require("bcrypt")
const sql=db.sql


async function signin(req,res){
    try {
        const {UserName,emailID,Password} = req.body;
        const pool=await db.poolpromise

        const emailcheck=await pool
        .request()
        .input("emailID",sql.VarChar(50),emailID)
        .query("SELECT * FROM frontend.dbo.students WHERE emailID=@emailID")

        if(emailcheck.recordset.length>0){
            return res.status(400).json({message:"email already exist"})
        }

        const salt=await bcrypt.genSalt(10);
        const passwordhash=await bcrypt.hash(Password,salt)

        const result=await pool
        .request()
        .input("UserName",sql.VarChar,UserName)
        .input("emailID",sql.VarChar,emailID)
        .input("Password",sql.VarChar,Password)
        .query(`INSERT INTO frontend.dbo.students (UserName,emailID,Password)
        VALUES(@UserName,@emailID,@Password)`) 

        res.status(201).json({message:"user registered successfully"})
    }catch (error){
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }

    };
// };

async function registeruser(req,res){
    try {
        const {UserName,emailID,Password } = req.body;
        console.log(req.body)
        const pool=await db.poolpromise

        const hashedpassword = await bcrypt.hash(Password,10);

        let result=await pool.request()
        .input("UserName",sql.VarChar,UserName)
        .input("emailID",sql.VarChar,emailID)
        .input("Password",sql.VarChar,Password)
        .query(`INSERT INTO frontend.dbo.students (UserName,emailID,Password)
        VALUES(@UserName,@emailID,@Password)`)
        res.status(200).json({message:"Details Successfully Saved",result})

    } catch (err) {

        console.error('Error creating details:',err);
        res.status(500).send('Error creating details ')
    }
};
async function loginUser(req, res) {
    try {
        const { emailID, Password } = req.body;
        console.log(req.body);
        const pool = await db.poolpromise;

        const result = await pool.request()
            .input("emailID", sql.VarChar, emailID)
            .query(`SELECT UserName, emailID, Password FROM frontend.dbo.students WHERE emailID = @emailID`);

        if (result.recordset.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = result.recordset[0];

        if (Password !== user.Password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", user: { UserName: user.UserName, emailID: user.emailID } });

    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Error during login');
    }
};





module.exports={
    registeruser,
    loginUser,
    signin
}