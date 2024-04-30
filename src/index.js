const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require('express-session');

const models = require("./config")



const app = express();
app.set("view engine", "ejs");
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use(session({
    secret: "SECRETKEY",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000 
    }
}));

const port = 3000;
app.listen(port, () => {
    console.log("Server is running");
});


app.get("/", async (req, res) => {
    if(req.session.userID){
        try{
            const userData = await models.dataModel.findOne({ user: req.session.userID.name });
                res.render("webView", { userData: userData });

        } catch(error) {
            console.log(error);
        }

    } else {
        res.render("login");
    }

});

app.get("/profile", async (req, res) => {

 if (req.session.userID) {
    try {
        const userData = await models.dataModel.findOne({ user: req.session.userID.name });

            res.render("profile", { userData: userData });

    } catch (error) {
        console.error("Error fetching user data:", error);
    }
} else {
    res.render("login");
}
});

app.get("/login", (req, res) => {
    if(req.session.userID){
        res.render("login");
    } else {
        res.render("login");
    }
});

app.get("/signup", (req, res) => {
        if(req.session.userID){
            res.render("/");
        } else {
            res.render("signup");
        }
});




app.post("/userSignup", async (req, res) => {

    var data = {
        name: req.body.name,
        password: req.body.password
    }

    try{
        const userExists = await models.userModel.findOne({name: data.name});

        if(!userExists){
            const userExists1 = await models.userModel.insertMany(data)
            req.session.userID = { name: req.body.name };
            res.redirect("/")
        } else {
            res.end();
        }
    }catch (error){
        console.log(error);
    }
});



app.post("/userLogin", async (req, res) => {

    var data = {
        name: req.body.name,
        password: req.body.password
    }

    try{
        const userExists = await models.userModel.findOne({name: data.name});

        console.log(models.userModel.findOne({name: data.name}));

        if(!userExists){
            res.end();
        } else {
            if(userExists.password == data.password){
                console.log("correct");
                req.session.userID = { name: req.body.name };
                console.log(req.session.userID);
                res.redirect("/");
            } else {
                res.end();
            }
        }
    }catch{
        console.log("Something went wrong");
    }

});

app.post("/userData", async (req, res) => {

    try{
        let data = {
            user: String(req.session.userID.name),
            desc: req.body.desc,
            OP1: req.body.OP1,
            OP2: req.body.OP2,
            OP3: String(req.body.OP3),
            OP4: String(req.body.OP4)
        }

        const userDataExists = await models.dataModel.findOne({user: req.session.userID.name});
    
        if(req.session.userID){
            if(!userDataExists){
                const userData = await models.dataModel.insertMany(data);
                res.end();
            } else {
                await models.dataModel.updateOne({ user: req.session.userID.name }, data);;
            }

        } else {
            res.end();
        }
    } catch (error) {
        console.log(error);
    }

});


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

app.get("/generate", async (req, res) => {

    try {

        if(req.session.userID){

            let userData = await models.dataModel.findOne({user: req.session.userID.name});



            let count = 10;

            const allEntries = await models.dataModel.find();

            const shuffledEntries = shuffleArray(allEntries);

            const randomEntries = shuffledEntries.slice(0, count);

            let sortedEntries = [];

            console.log(randomEntries);

            for(let i = 0; i < randomEntries.length; i++){
                if(!userData.blacklist.includes(randomEntries[i].user) && userData.user != randomEntries[i].user){

                    sortedEntries.push({user: randomEntries[i].user, score: 0});

                            for(let j = 0; j < 4; j++){
                            
                                if(userData.OP1[j] == randomEntries[i].OP1[j]){
                                
                                    for(let k = 0; k<sortedEntries.length; k++){
                                    
                                        if(sortedEntries[k].user == randomEntries[i].user){
                                            sortedEntries[k].score += 1;
                                        }
                                    
                                    }
                                
                                }
                            
                                if(userData.OP2[j] == randomEntries[i].OP2[j]){
                                
                                    for(let k = 0; k<sortedEntries.length; k++){
                                    
                                        if(sortedEntries[k].user == randomEntries[i].user){
                                            sortedEntries[k].score += 1;
                                        }
                                    
                                    }
                                
                                }
                            
                            
                            }

                        if(userData.OP3 == randomEntries[i].OP3){

                            for(let k = 0; k<sortedEntries.length; k++){

                                if(sortedEntries[k].user == randomEntries[i].user){
                                    sortedEntries[k].score += 1;
                                }

                            }

                        }

                        if(userData.OP4 == randomEntries[i].OP4){

                            for(let k = 0; k<sortedEntries.length; k++){

                                if(sortedEntries[k].user == randomEntries[i].user){
                                    sortedEntries[k].score += 1;
                                }

                            }

                        }

                } 
            }

            console.log(sortedEntries);


            res.json(sortedEntries);

        } else {
            res.render("login");
        }

    } catch (error) {
        // If an error occurs, send an error response
        console.error(error);
        res.end();
    }
});