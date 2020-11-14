$(document).ready(function() {
  // Getting jQuery references to the question body, title, form, and quiz select
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var cmsForm = $("#cms");
  var quizSelect = $("#quiz");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a question)
  var url = window.location.search;
  var questionId;
  var quizId;
  // Sets a flag for whether or not we're updating a question to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the question id from the url
  // In '?question_id=1', questionId is 1
  if (url.indexOf("?question_id=") !== -1) {
    questionId = url.split("=")[1];
    getQuestionData(questionId, "question");
  }
  // Otherwise if we have an quiz_id in our url, preset the quiz select box to be our Quiz
  else if (url.indexOf("?quiz_id=") !== -1) {
    quizId = url.split("=")[1];
  }

  // Getting the quizs, and their questions
  getQuizs();

  // A function for handling what happens when the form to create a new question is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the question if we are missing a body, title, or quiz
    if (!titleInput.val().trim() || !bodyInput.val().trim() || !quizSelect.val()) {
      return;
    }
    // Constructing a newQuestion object to hand to the database
    var newQuestion = {
      title: titleInput
        .val()
        .trim(),
      body: bodyInput
        .val()
        .trim(),
      QuizId: quizSelect.val()
    };

    // If we're updating a question run updateQuestion to update a question
    // Otherwise run submitQuestion to create a whole new question
    if (updating) {
      newQuestion.id = questionId;
      updateQuestion(newQuestion);
    }
    else {
      submitQuestion(newQuestion);
    }
  }

  // Submits a new question and brings user to blog page upon completion
  function submitQuestion(question) {
    $.post("/api/questions", question, function() {
      window.location.href = "/blog";
    });
  }

  // Gets question data for the current question if we're editing, or if we're adding to an quiz's existing questions
  function getQuestionData(id, type) {
    var queryUrl;
    switch (type) {
    case "question":
      queryUrl = "/api/questions/" + id;
      break;
    case "quiz":
      queryUrl = "/api/quizs/" + id;
      break;
    default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.QuizId || data.id);
        // If this question exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        quizId = data.QuizId || data.id;
        // If we have a question with this id, set a flag for us to know to update the question
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Quizs and then render our list of Quizs
  function getQuizs() {
    $.get("/api/quizs", renderQuizList);
  }
  // Function to either render a list of quizs, or if there are none, direct the user to the page
  // to create an quiz first
  function renderQuizList(data) {
    if (!data.length) {
      window.location.href = "/quizs";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createQuizRow(data[i]));
    }
    quizSelect.empty();
    console.log(rowsToAdd);
    console.log(quizSelect);
    quizSelect.append(rowsToAdd);
    quizSelect.val(quizId);
  }

  // Creates the quiz options in the dropdown
  function createQuizRow(quiz) {
    var listOption = $("<option>");
    listOption.attr("value", quiz.id);
    listOption.text(quiz.name);
    return listOption;
  }

  // Update a given question, bring user to the blog page when done
  function updateQuestion(question) {
    $.ajax({
      method: "PUT",
      url: "/api/questions",
      data: question
    })
      .then(function() {
        window.location.href = "/blog";
      });
  }
});
