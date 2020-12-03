//Global variables contianing quiz contents 
var questions = [   "Which of the following Attribute is used to include External JS code inside your HTML Document",
                    "Which of the following is not considered as an error in JavaScript?",
                    "The statement a===b refers to",
                    "Which of the following are affected by hoisting?",
                    "Which of the following is not a javascript data-type?",
                    "When interpreter encounters an empty statements, what it will do:",
                    "The 'function' and 'var' are known as:",
                    "Which type of JavaScript language is ___",
                    "Inside which HTML element do we put the JavaScript?",
                    "How do you write 'Hello World' in an alert box?",
                ];


var answers =   [   ["src", "ext", "script", "link"],
                    ["Syntax error", "Missing semi-colons", "Division By zero", "All of the above"],
                    ["Both a and b are equal in value, type and reference address", "Both a and b are equal in value", "Both a and b are equal in value and type", "There is no such statement"],
                    ["const", "var", "let", "All of the above"],
                    ["string", "number", "boolean", "hashtable"],
                    ["Shows a warning", "Prompts to complete the statement", "Throws an error", "Ignores the statements"],
                    ["Keywords", "Data types", "Declaration statements", "Prototypes"],
                    ["Object-Oriented", "Object-Based", "Assembly-language", "High-level"],
                    ["<js>", "<scripting>", "<javascript>", "<script>"],
                    ["alert('Hello World')", "msgBox('Hello World')", "msg('Hellow World')", "alertBox('Hello World')"]
                ]; 

var answer =    [   "src",
                    "Division By zero", 
                    "Both a and b are equal in value and type",
                    "var",
                    "hashtable",
                    "Ignores the statements",
                    "Declaration statements", 
                    "Object-Based", 
                    "<script>", 
                    "alert('Hello World')"
                ];


var questionOrder = [ false, false, false, false, false, false, false, false, false, false];

//Global variables for internal use
var secondsTotal = 120;
var timePenalty = 9;
var secondsElapsed = 0;
var isNotCorrect = false; 
var score = 0;
var currentAnswer; 
var questionCount = 0; 

//HTML variables
var userName; 
var minutesDisplay = $(".minutes-display");
var secondsDisplay = $(".seconds-display");

// Get the array of all scores from storage if array is null set to empty array 
var highScores = JSON.parse(localStorage.getItem("highScores"));
if(highScores === null){
    highScores = []; 
}

// Generate a random question index 
function questionIndex(){
    return Math.floor(Math.random() * 10)
}

// Starts timer at the number set by global variable secondsTotal
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
            
            //  if the timer has runn out
            if(minutesLeft === 0 && secondsLeft === 0) {
                alert("Times Up!");
                quizEnd();
            }
      
        }, 1000);
      

}

//Function to populate the highest scores at the end of the quiz
function scoreList(){
    //sort the scores by highest first
    highScores.sort(function(a, b) {
        return b[1] - a[1];             //index 1 is the score hence sort by the score 
    });


    // Set the top 5 highest scores to the HTML
    for(var i = 0 ; i < 5; i ++) {
        var a = i + 1; 
        var userID = "#user-" + a;
        var scoreID = "#score-" + a;

        $(userID).text(highScores[i][0]);
        $(scoreID).text(highScores[i][1]);
    }
    $("#user-score").text(score);

}

//End of quiz triggered if users finishes or if time ends
function quizEnd(){ 
    clearInterval(interval);
    interval = null;

    //hide the questions and show the highest scores
    $("#question-body").hide();
    $("#highScores").show();
    $(".replay").show();
    $(".score").text("0");

    //Add username and score to list of highscores
    highScores.push([userName, score]); 
    //Store highscores array in the local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
    //Call the function score list which populates the top 5 highest scores
    scoreList();

}

// Populates the question with a random question from the global arrays
function populateQuestion() {

    var index; 
    if (questionCount < 10){
        index = questionIndex();
        while(questionOrder[index]) {
            index = questionIndex();
        }

        $("#question").text(questions[index]); 
        $("#button-a").text(answers[index][0]);
        $("#button-b").text(answers[index][1]);
        $("#button-c").text(answers[index][2]);
        $("#button-d").text(answers[index][3]);
    
        currentAnswer = answer[index];  //set current answer to the answer index
        questionOrder[index] = true;    //set question order to true so the questions have been seen. 
    }
    else {
        quizEnd();

    }  
    questionCount += 1; 

}

// Function allows the same user to restart the quiz
function replay(){ 
    //reset global variables
    questionCount = 0; 
    secondsElapsed = 0;
    score = 0;
    questionOrder = [false, false, false, false, false, false, false, false, false, false];
    // Resart quiz
    startTimer();
    $(".replay").hide();
    $("#highScores").hide();
    populateQuestion();
    $("#question-body").show();
}


// Click on the start quiz button
$(".start-quiz").on("click", function() {
    startTimer();
    $("#start-page").hide();
    populateQuestion();
    $("#question-body").show();
    userName = $("#user-name").val();
});


// Click on buttons to answer question
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
});

// Click on replay button
$(".replay").on("click", replay);
    
    



