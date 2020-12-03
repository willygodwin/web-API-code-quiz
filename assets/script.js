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




var secondsTotal = 120;
var timePenalty = 10;
var secondsElapsed = 0;
var isNotCorrect = false; 
var isCorrect = false; 
var currentAnswer; 

var minutesDisplay = $(".minutes-display");
var secondsDisplay = $(".seconds-display");

function questionIndex(){
    return Math.ceil(Math.random()* 10);
}

function startTimer(){

        interval = setInterval(function () {
            secondsElapsed = secondsElapsed + 1; 
      
            var totalTimeLeft = secondsTotal - secondsElapsed;
            //if the answer is wrong need to penalise 10 seconds 
            if(isNotCorrect) {
                totalTimeLeft = secondsTotal - timePenalty;
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

function populateQuestion() {

    var index; 

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

function checkAnswer() {
    


    

}



    $(".start-quiz").on("click", function() {
        startTimer();
        $("#start-page").hide();
        populateQuestion();
        $("#question-body").show();

    });

    $(".btn-secondary").on("click", function(event){
        if(event.target.textContent === currentAnswer) {
            populateQuestion();
            isCorrect = true; 
        }
        else {
            isNotCorrect = true; 

        }
    }
    );


// $(".start-quiz").on("click", startTimer);

