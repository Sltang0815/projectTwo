$(document).ready(function() {
  // Getting references to the name input and quiz container, as well as the table body
  var nameInput = $("#quiz-name");
  var quizList = $("tbody");
  var quizContainer = $(".quiz-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Quiz
  $(document).on("submit", "#quiz-form", handleQuizFormSubmit);
  $(document).on("click", ".delete-quiz", handleDeleteButtonPress);

  // Getting the initial list of Quizs
  getQuizs();

  // A function to handle what happens when the form is submitted to create a new Quiz
  function handleQuizFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertQuiz function and passing in the value of the name input
    upsertQuiz({
      name: nameInput
        .val()
        .trim()
    });
  }

  // A function for creating an quiz. Calls getQuizs upon completion
  function upsertQuiz(quizData) {
    $.post("/api/quizs", quizData)
      .then(getQuizs);
  }

  // Function for creating a new list row for quizs
  function createQuizRow(quizData) {
    var newTr = $("<tr>");
    newTr.data("quiz", quizData);
    newTr.append("<td>" + quizData.name + "</td>");
    if (quizData.Questions) {
      newTr.append("<td> " + quizData.Questions.length + "</td>");
    } else {
      newTr.append("<td>0</td>");
    }
    newTr.append("<td><a href='/blog?quiz_id=" + quizData.id + "'>Go to Questions</a></td>");
    newTr.append("<td><a href='/cms?quiz_id=" + quizData.id + "'>Create a Question</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-quiz'>Delete Quiz</a></td>");
    return newTr;
  }

  // Function for retrieving quizs and getting them ready to be rendered to the page
  function getQuizs() {
    $.get("/api/quizs", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createQuizRow(data[i]));
      }
      renderQuizList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of quizs to the page
  function renderQuizList(rows) {
    quizList.children().not(":last").remove();
    quizContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      quizList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no quizs
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an Quiz before you can create a Question.");
    quizContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("quiz");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/quizs/" + id
    })
      .then(getQuizs);
  }
});
