
let hint = document.querySelector(".angabe");
let fullNameOFcounty = [];
let savedScore = parseInt(localStorage.getItem("savedScore"));

let score = savedScore || 0;
let scoreh1 = document.querySelector(".score");
scoreh1.textContent = score;

async function countyinformation(element){ 
        
        try{
            let getTheCounty = await fetch(`https://restcountries.com/v3.1/alpha/${element}`);
            let countryinfo = await getTheCounty.json();
            if(!getTheCounty.ok){
                console.log("error");
            }
            fullNameOFcounty.push(countryinfo[0].name.common);
        } catch(error){

        }};
    
    
    let countrynameArray = [];
    let capitalcityArray = [];
    let hintselect;
    let rightAnswer;
    let answerposibi = [];
    let allCountries;
    let classOfanswer;
    all();

    //Hinweis wird angezeigt u
    function setHint(){
        let angabe = document.querySelector(".angabe")
        hintselect = Math.floor(Math.random() * 246);

        angabe.textContent = capitalcityArray[hintselect];
        return hintselect;
    }

    //Die haupstädte werden in array gelistet
    async function getthecountybycapital(){
        try{
            
        let getThecoByCap = await fetch(`https://restcountries.com/v3.1/capital/${capitalcityArray[hintselect]}`);
        let theanswer = await getThecoByCap.json();
        console.log(theanswer);
        rightAnswer = theanswer[0].name.common;
        console.log(rightAnswer);
        if (!getThecoByCap.ok) {
            console.log("Fehler beim Abrufen der Daten:", getThecoByCap.status);
            return;
        }
        classOfanswer = ".a1"
        setAnswer(classOfanswer);

    }catch(error){

    }
}

    function getthecountrybyFlag(){

    }


    //leveln aktivieren - Capital
    let cityQuiz = document.querySelector(".city").onclick = function(){
        let allPosibi = document.querySelectorAll(`.antworten button`);
        allPosibi.forEach(element => {element.setAttribute("class", "a1");
    });
        setHint();
        getthecountybycapital();
        
        
    }

    //antwortmöglichkeiten werden in die Buttons gelistet
    function setAnswer(classs){
        let allPosibi = document.querySelectorAll(`.antworten ${classs}`);
        answerposibi = [];
        for( i = 0; i <=3; i++){
            answerposibi.push(Math.floor(Math.random() * 246 +1));

        }
        let placeOfansw = Math.floor(Math.random() * 4)
        
        console.log(answerposibi);
        for(i = 0; i < 4 ; i++) {
            allPosibi[i].textContent = countrynameArray[answerposibi[i]];
        };
        
       
        console.log(rightAnswer);
        allPosibi[placeOfansw].textContent = rightAnswer;
        //richtiger antwort wird angeklickt
        allPosibi.forEach(element => { 
            element.onclick = function(){                
            if (Array.from(Object.values(allPosibi)).indexOf(element) == placeOfansw){
                if (classs === ".a1"){
                    setHint();
                    getthecountybycapital();
                    score= score +1;
                } else if(classs === ".a2"){
                    setFlagAsHint();
                    score= score+1;
                } else if (classs === ".a3"){
                    setPopulationAsHint();
                    score= score +1;
                } else if(classs === ".a4"){
                    setneighborsAsHint();
                    score= score +1;
                }
                scoreh1.textContent = score;
                localStorage.setItem("savedScore", score.toString());
            };
        };
        });

        
    }



    //alle länder werden gelistet
    async function all(){
        try{
            let getAll = await fetch("https://restcountries.com/v3.1/all");
            allCountries = await getAll.json();
            console.log(allCountries);
            

            for(let i = 0; i <= 249; i++){
                console.log(allCountries[i].name.common + i);
                countrynameArray.push(allCountries[i].name.common);
                
                 
            };
            for(let a = 0; a <= 249; a++){
                if (a == 44 || a == 87 || a == 91 || a == 152){
                    continue;
                } else{
                    console.log(a);
                    capitalcityArray.push(allCountries[a].capital[0]);
                    
                }
                  
            };

            console.log(capitalcityArray);
            
            
            if (!getAll){
                console.log("all error")
                
            };

        }catch(error){
            
        }
    }
    
    let flagQuiz = document.querySelector(".flag").onclick = function(){
        let allPosibi = document.querySelectorAll(`.antworten button`);
        allPosibi.forEach(element => {element.setAttribute("class", "a2");
    });

        setFlagAsHint();
        
        
    }

    function setFlagAsHint(){
        let answerposibi = [];
        answerposibi.push(Math.floor(Math.random() * 250));
        let flagOFthecountry = allCountries[answerposibi].flags.svg;
        rightAnswer = allCountries[answerposibi].name.common;
        console.log(rightAnswer);
        let placeHolder = document.querySelector(".angabe");
        placeHolder.innerHTML = `<img class="flag" src="${flagOFthecountry}">`;
        classOfanswer = ".a2"
        setAnswer(classOfanswer);
    }

    let populationQuiz = document.querySelector(".popu").onclick = function(){
        let allPosibi = document.querySelectorAll(`.antworten button`);
        allPosibi.forEach(element => {element.setAttribute("class", "a3");
    });

        setPopulationAsHint();
        
        
    }

    function setPopulationAsHint (){
        let answerposibi = [];
        answerposibi.push(Math.floor(Math.random() * 250));
        let popuOFthecountry = allCountries[answerposibi].population;
        popuOFthecountry = Number(popuOFthecountry).toLocaleString("de-DE")
        rightAnswer = allCountries[answerposibi].name.common;
        console.log(rightAnswer);
        let placeHolder = document.querySelector(".angabe");
        placeHolder.innerHTML = popuOFthecountry;
        classOfanswer = ".a3"
        setAnswer(classOfanswer);

    }
    
    let borderQuiz = document.querySelector(".border").onclick = function(){
        let allPosibi = document.querySelectorAll(`.antworten button`);
        allPosibi.forEach(element => {element.setAttribute("class", "a4");
    });
        setneighborsAsHint();
        fullNameOFcounty = [];

        
        
    }
    function setneighborsAsHint(){
        
        let answerposibi = [];
        answerposibi.push(Math.floor(Math.random() * 250));
        
        let borderOFthecountry = allCountries[answerposibi].borders;
        if(borderOFthecountry == undefined){
            setneighborsAsHint();
        } else{
            console.log(borderOFthecountry);
            borderOFthecountry.forEach(element=>{
            countyinformation(element);
            
        });
    
            console.log(fullNameOFcounty);
            rightAnswer = allCountries[answerposibi].name.common;
            
            let placeHolder = document.querySelector(".angabe");
            console.log("ahllo")
            placeHolder.innerHTML = fullNameOFcounty;
            classOfanswer = ".a4"
            setAnswer(classOfanswer);
        };
        
    };



   