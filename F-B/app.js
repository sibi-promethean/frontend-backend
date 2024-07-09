const express=require("express")

const bodyparser=require("body-parser");
// const routes=require("./router/index")


const app = express();
const port = 3001;

app.use(bodyparser.json());

require("./router/index")(app)

app.listen(port,()=> {
    console.log(`server is listening to port ${port}`);
});