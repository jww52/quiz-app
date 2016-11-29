var quiz = {
    correctCount: 0,
    currentQuestion: 0,
    questions: [{
        question: "What is the name for the body of water in the Gulf of California?",
        answers: ["Black Sea", "Sea of California", "Sea of Cortes", "Marianas Trench"],
        correct: "Sea of Cortes"
    }, {
        question: "What is the surface area in miles of the Gulf of California?",
        answers: ["10,000", "30,000", "100,000", "250,000"],
        correct: "100,000"
    }, {
        question: "About how many estuaries flow into the Gulf of California?",
        answers: ["50", "100", "250", "300"],
        correct: "300"
    }, {
        question: "Which whales are known to migrate to the Sea of Cortes?",
        answers: ["Orca", "Beluga", "Humpback", "Dragon"],
        correct: "Humpback"
    }, {
        question: "What is the average depth of the Sea of Cortes in feet?",
        answers: ["20,000", "10,000", "5,000", "2,684"],
        correct: "2,684"
    }, {
        question: "What isthe highest average temperature of the water?",
        answers: ["100", "75", "65", "55"],
        correct: "75"
    }, {
        question: "How many islands exist in the Gulf of California?",
        answers: ["200", "45", "37", "2"],
        correct: "37"
    }, {
        question: "What is the name of the Native American tribe local to the area?",
        answers: ["Yaqui", "Arawak", "Iroquois", "Apache"],
        correct: "Yaqui"
    }, {
        question: "How many native dolphins remain in the Sea of Cortes?",
        answers: ["12", "60! The Vaquita Dolphins are the most endangered sea mammal in the world!", "Too many to count!", "7,000"],
        correct: "60! The Vaquita Dolphins are the most endangered sea mammal in the world!"
    }, {
        question: "How many endemic species of fish are found in the Gulf of California",
        answers: ["90", "4", "0", "15"],
        correct: "90"
    }]
};

$(document).ready(function() {
    $(".question, .next-question, .final-page").hide();

    function lastQuestion() {
        $("div.question").hide();
        $(".final-page").show();
        $(".next-question").text("Play Again!");
    }

    function generateQuestion() {
        if (quiz.currentQuestion === quiz.questions.length) {
            lastQuestion();
        } else {
            $("div.question").prepend(quiz.questions[quiz.currentQuestion].question);
            var answerList = quiz.questions[quiz.currentQuestion].answers;
            console.log(answerList);
            for (var i = 0; i < answerList.length; i++) {
                $("div.question").append("<ul> <li>" + answerList[i] + "</li>");
            }
        }
    }

    //jquery event delegation
    function questionCheck() {
        $(".question").on('click', 'li', function(e) {
            e.preventDefault();
            if ($(this).text() === quiz.questions[quiz.currentQuestion].correct) {
                $(".question").text("Yes! The correct answer was " + quiz.questions[quiz.currentQuestion].correct + "!");
                quiz.correctCount += 1;
                console.log(quiz.correctCount);
                $(".numCorrect").text(quiz.correctCount);
                $(".next-question").css("margin-top", "20px");
            } else {
                $(".question").text("Sorry! The correct answer was " + quiz.questions[quiz.currentQuestion].correct + "!");
                $(".next-question").css("margin-top", "20px");
            }
        });
    }

    function nextQuestion() {
        $(".next-question").on('click', function(e) {
            e.preventDefault();
            if ($(".next-question").text() === "Play Again!") {
                $(".final-page").hide();
                $(".next-question").text("Next Question");
                quiz.currentQuestion = 0;
                quiz.correctCount = 0;
                $(".numCorrect").text(quiz.correctCount);
                $("div.question, .next-question").show();
                generateQuestion();
            } else {
                quiz.currentQuestion += 1;
                $("div.question").empty();
                generateQuestion();
            }
        });
    }

    $(".start-quiz").click((function() {
        $(".box").hide();
        $("div.question, .next-question").show();
        nextQuestion();
        generateQuestion();
        questionCheck();
    }));
});