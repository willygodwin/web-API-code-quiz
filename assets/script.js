var questions = [   "Which of the following Attribute is used to include External JS code inside your HTML Document",
                    "Which of the following is not considered as an error in JavaScript?",
                    "The statement a===b refers to"
                ];


var answers =   [   ["src", "ext", "script", "link"],
                    ["Syntax error", "Missing semi-colons", "Division By zero", "All of the above"],
                    ["Both a and b are equal in value, type and reference address", "Both a and b are equal in value", "Both a and b are equal in value and type", "There is no such statement"]
                ]; 

var answer =    [   "src",
                    "Division By zero", 
                    "Both a and b are equal in value and type"
                ];


var questionOrder = [ false, false, false, false, false, false, false, false, false, false];

// var highScores = []; 


var secondsTotal = 120;
var timePenalty = 9;
var secondsElapsed = 0;
var isNotCorrect = false; 
var isCorrect = false; 
var score = 0;
var currentAnswer; 
var questionCount = 0; 

//input asking for player name, append name and score to object store object in storage
var userName; // Addd input to html
var minutesDisplay = $(".minutes-display");
var secondsDisplay = $(".seconds-display");


var highScores = JSON.parse(localStorage.getItem("highScores"));
if(highScores === null){
    highScores = []; 
}

// set highscores object using local storage set (JSON methods as well string to obejct)

console.log(highScores)

function questionIndex(){
    return Math.ceil(Math.random()* 10);
}

function startTimer(){

        interval = setInterval(function () {
            secondsElapsed = secondsElapsed + 1; 
      
            var totalTimeLeft = secondsTotal - secondsElapsed;
            //if the answer is wrong need to penalise 10 seconds 
            if(isNotCorrect) {
                secondsElapsed = secondsElapsed + timePenalty;
                totalTimeLeft = secondsTotal - secondsElapsed;
                var minutesLeft = Math.floor(totalTimeLeft/60);
                var secondsLeft = totalTimeLeft % 60;
            //   set nav bar timer 
                minutesDisplay.text(minutesLeft);
                secondsDisplay.text(secondsLeft);
                isNotCorrect = false; 

            } else{
                var minutesLeft = Math.floor(totalTimeLeft/60);
                var secondsLeft = totalTimeLeft % 60;
            
            //   Need to set the timer in the nav bar
                minutesDisplay.text(minutesLeft);
                secondsDisplay.text(secondsLeft);
            }
            
      
            if(minutesLeft === 0 && secondsLeft === 0) {
                alert("Times Up!");
                clearInterval(interval);
                interval = null;

                minutesDisplay.textContent = minutesLeft;
                secondsDisplay.textContent = "00";
            }
      
        }, 1000);
      

}

function scoreList(){
    
    highScores.sort(function(a, b) {
        return b[1] - a[1];
});
    console.log(highScores)

    for(var i = 0 ; i < 5; i ++){
        var a = i + 1; 
        var userID = "#user-" + a;
        var scoreID = "#score-" + a;
        console.log(userID);
        console.log(scoreID)
        $(userID).text(highScores[i][0]);
        $(scoreID).text(highScores[i][1]);
    }

}

function populateQuestion() {

    var index; 
    if (questionCount < 3){
        index = Math.floor(Math.random() * 3)
        while(questionOrder[index]) {
            index = Math.floor(Math.random() * 3)
        }

        $("#question").text(questions[index]); 
        $("#button-a").text(answers[index][0]);
        $("#button-b").text(answers[index][1]);
        $("#button-c").text(answers[index][2]);
        $("#button-d").text(answers[index][3]);
    
        currentAnswer = answer[index]; 
        questionOrder[index] = true; 
    }
    else {
        $("#question-body").hide();
        $("#highScores").show();
        $(".score").text("0");

        highScores.push([userName, score]);

        localStorage.setItem("highScores", JSON.stringify(highScores));
        scoreList();

    }  
    questionCount += 1; 

}



$(".start-quiz").on("click", function() {
    startTimer();
    $("#start-page").hide();
    populateQuestion();
    $("#question-body").show();
    userName = $("#user-name").val();
    console.log(userName);

});

$(".btn-secondary").on("click", function(event){
    
    if(event.target.textContent === currentAnswer) {
        score += 10; 
        $(".score").text(score)
        populateQuestion();
    }
    else {
        isNotCorrect = true; 
        score -= 5; 
        $(".score").text(score)

    }
}
);

    
    



