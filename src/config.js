const mongoose = require("mongoose");
const { type } = require("os");
const connect = mongoose.connect("YOU DONT GET MY CONNECTION STRING");

connect.then(() => {
    console.log("connection");
}).catch(() => {
    console.log("failed to connect");
});


const loginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const userSettings = new mongoose.Schema({
    user:{
        type: String,
        required: false
    },
    desc:{
        type: String,
        required: false
    },
    OP1:{
        type: Array,
        required: false
    },
    OP2:{
        type: Array,
        required: false
    },
    OP3:{
        type: String,
        required: false
    },
    OP4:{
        type: String,
        required: false
    },
    blacklist:{
        type: Array,
        required: false
    }
});




const dataModel = new mongoose.model("userdata", userSettings);
const userModel = new mongoose.model("users", loginSchema);
module.exports = {userModel, dataModel};
