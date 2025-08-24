import app from '../src/app.js'
import connectdb from '../src/db/index.js'

connectdb().then(()=>{
    app.listen(process.env.PORT,()=>{
      console.log("CORS_ORIGIN from backend process.env:", process.env.CORS_ORIGIN);
        console.log(`http://localhost:${process.env.PORT}`)
      })
}).catch(e=>console.log("some error has occured"))
