const express = require('express');
const app = express();
require('dotenv').config({ quiet: true });
const main = require('./config/db');
const userRouter = require('./Routes/userRoute')
const cors = require('cors')


app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true,
}))
app.use('/' , userRouter);
    



function initialConnection() {
    try {
        main()
            .then(() => {
                console.log('connected to db');

                app.listen(process.env.PORT, () => {
                    console.log(`listning at port no: ${process.env.PORT}`);

                })

            })
            .catch((err) => {
                console.log('Error: ', err.message);

            })
    }
    catch (err) {
        console.log('Error: ', err.message);

    }
}


initialConnection();


