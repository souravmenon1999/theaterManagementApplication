import app from "./app.js";

const port = 1000;

function globalErrorHandler(err,req,res,next,){

    console.log(err);
   res.status(500).send('something broke')

}

app.use(globalErrorHandler);

app.listen(port, ()=>{
    console.log(`listening from ${port}`)
})