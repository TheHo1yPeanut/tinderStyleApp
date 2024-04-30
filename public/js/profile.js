var backButton = document.getElementById("backButton");
var submitButton = document.getElementById("submit");

var selector1 = document.getElementById("select1");
var selector2 = document.getElementById("select2");

var descField = document.getElementById("descField");

var firstBlockActives = 0;
var secondBlockActives = 0;

try{
    var userData = JSON.parse(document.getElementById('userData').getAttribute('data-user'));
    console.log(userData);
    
    descField.value = userData.desc;

    for(let i = 0; i < userData.OP1.length; i++){
        document.getElementById(userData.OP1[i]).classList.add("prevActiveButton");
        document.getElementById(userData.OP2[i]).classList.add("prevActiveButton");
    
        selector1.value = userData.OP3;
        selector2.value = userData.OP4;
    }
} catch(error) {
    console.log(error);
}




var USERCHOICES = {
    OP1:[],
    OP2:[],
    OP3: 0,
    OP4: 0
};

var options = document.getElementsByClassName("choice");
for(let i = 0; i<options.length; i++){
    options[i].addEventListener("click", (e) => {
        if(e.target.classList.contains("c1")){
            if(!e.target.classList.contains("activeButton")){
                if(firstBlockActives < 4){
                    e.target.classList.toggle("activeButton");
                    firstBlockActives++;
                }
            } else {
                e.target.classList.toggle("activeButton");
                firstBlockActives -= 1;
            }
        } else {
            if(!e.target.classList.contains("activeButton")){
                if(secondBlockActives < 4){
                    e.target.classList.toggle("activeButton");
                    secondBlockActives++;
                }
            } else {
                e.target.classList.toggle("activeButton");
                secondBlockActives -= 1;
            }
        }
        //e.target.classList.toggle("activeButton");

    });
};

console.log(options);

backButton.addEventListener("click", () => {
    window.location.href = "/";
});


submitButton.addEventListener("click", () => {


    if(firstBlockActives != 4 || secondBlockActives != 4){
        alert("Please chose 4 on each panel!");
        return;
    }

    for(let i = 0; i<document.getElementsByClassName("c1").length; i++){
        if(document.getElementsByClassName("c1")[i].classList.contains("activeButton")){
            USERCHOICES.OP1.push(document.getElementsByClassName("c1")[i].id);
        }
    }

    for(let i = 0; i<document.getElementsByClassName("c2").length; i++){
        if(document.getElementsByClassName("c2")[i].classList.contains("activeButton")){
            USERCHOICES.OP2.push(document.getElementsByClassName("c2")[i].id);
        }
    }

    USERCHOICES.desc = descField.value;

    USERCHOICES.OP3 = selector1.value;
    USERCHOICES.OP4 = selector2.value;

    console.log(USERCHOICES);
  
    fetch('/userData', {method: "POST", headers: {"Content-type": "application/json"}, body: JSON.stringify(USERCHOICES)});
  });