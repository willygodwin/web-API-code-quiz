var questions = {
    1: "Which of the following Attribute is used to include External JS code inside your HTML Document",
    2: "Which of the following is not considered as an error in JavaScript?",
    3: "The statement a===b refers to"
};

var answers = {
    1: ["src", "ext", "script", "link"],
    2: ["Syntax error", "Missing semi-colons", "Division By zero", "All of the above"],
    3: ["Both a and b are equal in value, type and reference address", "Both a and b are equal in value", "Both a and b are equal in value and type", "There is no such statement"]
};

var answer = {
    1: "src",  
    2: "Division By zero", 
    3: "Both a and b are equal in value and type"

};

var secondsTotal = 120;
var timePenalty = 10;
var secondsElapsed = 0;
var isNotCorrect = false; 
var isCorrect = false; 

var minutesDisplay = document.querySelector(".minutes-display");
var secondsDisplay = document.querySelector(".seconds-display");

function questionIndex(){
    return Math.ceil(Math.random()* 10);
}

function startTimer(){


        // if(interval != null){
        //   return;
        // }

        
        interval = setInterval(function () {
            secondsElapsed = secondsElapsed + 1; 
      
            var totalTimeLeft = secondsTotal - secondsElapsed;
            var minutesLeft = Math.floor(totalTimeLeft/60);
            var secondsLeft = totalTimeLeft % 60;
        
        //   Need to set the timer in the nav bar
            minutesDisplay.textContent = minutesLeft;
            secondsDisplay.textContent = secondsLeft;

            //if the answer is wrong need to penalise 10 seconds 
            if(isNotCorrect) {
                totalTimeLeft = secondsTotal - timePenalty;
                var minutesLeft = Math.floor(totalTimeLeft/60);
                var secondsLeft = totalTimeLeft % 60;
            //   set nav bar timer 
                minutesDisplay.textContent = minutesLeft;
                secondsDisplay.textContent = secondsLeft;
                isNotCorrect = false; 

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
    

}



    $(".start-quiz").on("click", function() {
        startTimer();
        $("#start-page").hide();
        $("#question-body").show();
    });


// $(".start-quiz").on("click", startTimer);

