import mongoose  from "mongoose";


export const connection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName:"Anciton_platform"
    })
    .then(() => {
        console.log("connected to databse.");
    })
    .catch((err) => {
        console.log(`some error occured while connecting to databse ${err}`)
    })
}
