$(document).ready(function() {
  // blogContainer holds all of our questions
  var blogContainer = $(".blog-container");
  var questionCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleQuestionDelete);
  $(document).on("click", "button.edit", handleQuestionEdit);
  // Variable to hold our questions
  var questions;

  // The code below handles the case where we want to get blog questions for a specific quiz
  // Looks for a query param in the url for quiz_id
  var url = window.location.search;
  var quizId;
  if (url.indexOf("?quiz_id=") !== -1) {
    quizId = url.split("=")[1];
    getQuestions(quizId);
  }
  // If there's no quizId we just get all questions as usual
  else {
    getQuestions();
  }

  // This function grabs questions from the database and updates the view
  function getQuestions(quiz) {
    quizId = quiz || "";
    if (quizId) {
      quizId = "/?quiz_id=" + quizId;
    }
    $.get("/api/questions" + quizId, function(data) {
      console.log("Questions", data);
      questions = data;
      if (!questions || !questions.length) {
        displayEmpty(quiz);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete questions
  function deleteQuestion(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/questions/" + id
    })
      .then(function() {
        getQuestions(questionCategorySelect.val());
      });
  }

  // InitializeRows handles appending all of our constructed question HTML inside blogContainer
  function initializeRows() {
    blogContainer.empty();
    var questionsToAdd = [];
    for (var i = 0; i < questions.length; i++) {
      questionsToAdd.push(createNewRow(questions[i]));
    }
    blogContainer.append(questionsToAdd);
  }

  // This function constructs a question's HTML
  function createNewRow(question) {
    var formattedDate = new Date(question.createdAt).toLocaleDateString();
    var newQuestionCard = $("<div>");
    newQuestionCard.addClass("card");
    var newQuestionCardHeading = $("<div>");
    newQuestionCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newQuestionTitle = $("<h2>");
    var newQuestionDate = $("<small>");
    var newQuestionQuiz = $("<h5>");
    newQuestionQuiz.text("Written by: " + question.Quiz.name);
    newQuestionQuiz.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newQuestionCardBody = $("<div>");
    newQuestionCardBody.addClass("card-body");
    var newQuestionBody = $("<p>");
    newQuestionTitle.text(question.title + " ");
    newQuestionBody.text(question.body);
    newQuestionDate.text(formattedDate);
    newQuestionTitle.append(newQuestionDate);
    newQuestionCardHeading.append(deleteBtn);
    newQuestionCardHeading.append(editBtn);
    newQuestionCardHeading.append(newQuestionTitle);
    newQuestionCardHeading.append(newQuestionQuiz);
    newQuestionCardBody.append(newQuestionBody);
    newQuestionCard.append(newQuestionCardHeading);
    newQuestionCard.append(newQuestionCardBody);
    newQuestionCard.data("question", question);
    return newQuestionCard;
  }

  // This function figures out which question we want to delete and then calls deleteQuestion
  function handleQuestionDelete() {
    var currentQuestion = $(this)
      .parent()
      .parent()
      .data("question");
    deleteQuestion(currentQuestion.id);
  }

  // This function figures out which question we want to edit and takes it to the appropriate url
  function handleQuestionEdit() {
    var currentQuestion = $(this)
      .parent()
      .parent()
      .data("question");
    window.location.href = "/cms?question_id=" + currentQuestion.id;
  }

  // This function displays a message when there are no questions
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Quiz #" + id;
    }
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No questions yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    blogContainer.append(messageH2);
  }

});
