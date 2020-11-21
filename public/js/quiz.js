$(document).ready(function() {
  // quizContainer holds all of our questions
  var quizContainer = $('.quiz-container');
  var questionCategorySelect = $('#category');

  // Click events for the edit and delete buttons
  $(document).on('click', 'button.delete', handleQuestionDelete);
  $(document).on('click', 'button.edit', handleQuestionEdit);
  $(document).on('click', 'button.quizBtn', handleQuizTaking);

  // Variable to hold our questions
  var questions;

  // The code below handles the case where we want to get quiz questions for a specific quiz
  // Looks for a query param in the url for quiz_id
  var url = window.location.search;
  var quizId;
  if (url.indexOf('?quiz_id=') !== -1) {
    quizId = url.split('=')[1];
    getQuestions(quizId);
  }
  // If there's no quizId we just get all questions as usual
  else {
    getQuestions();
  }

  // This function grabs questions from the database and updates the view
  function getQuestions(quiz) {
    quizId = quiz || '';
    if (quizId) {
      quizId = '/?quiz_id=' + quizId;
    }
    $.get('/api/questions' + quizId, function(data) {
      console.log('Questions', data);
      questions = data;
      if (!questions || !questions.length) {
        displayEmpty(quiz);
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete questions
  function deleteQuestion(id) {
    $.ajax({
      method: 'DELETE',
      url: '/api/questions/' + id
    })
      .then(function() {
        getQuestions(questionCategorySelect.val());
      });
  }



  // InitializeRows handles appending all of our constructed question HTML inside quizContainer
  function initializeRows() {
    quizContainer.empty();
    var questionsToAdd = [];
    for (var i = 0; i < questions.length; i++) {
      questionsToAdd.push(createNewRow(questions[i]));
    }
    quizContainer.append(questionsToAdd);
  }

  // This function constructs a question's HTML
  function createNewRow(question) {
    var newQuestionCard = $('<div>');
    newQuestionCard.addClass('card');
    var newQuestionCardHeading = $('<div>');
    newQuestionCardHeading.addClass('card-header');
    var deleteBtn = $('<button>');
    deleteBtn.text('x');
    deleteBtn.addClass('delete btn btn-danger');
    var editBtn = $('<button>');
    editBtn.text('EDIT');
    editBtn.addClass('edit btn btn-info');
    let quizBtn = $('<button>');
    quizBtn.text('Take quiz');
    quizBtn.addClass('quizBtn btn btn-primary');
    quizBtn.attr('data-quiz', question.QuizId);
    var newQuestionTitle = $('<h2>');
    var newQuestionQuiz = $('<h5>');
    newQuestionQuiz.text('Quiz Name: ' + question.Quiz.name);
    let questionName = $('<h5>');
    questionName.text('Question: ' + question.id);
    newQuestionQuiz.css({
      float: 'right',
      color: 'blue',
      'margin-top':
      '-10px'
    });
    var newQuestionCardBody = $('<div>');
    var newQuestionBody = $('<p>');
    newQuestionCardHeading.append(deleteBtn);
    newQuestionCardHeading.append(editBtn);
    newQuestionCardHeading.append(quizBtn);
    newQuestionCardHeading.append(newQuestionTitle);
    newQuestionCardHeading.append(newQuestionQuiz);
    newQuestionCardBody.append(newQuestionBody);
    newQuestionCard.append(newQuestionCardHeading);
    newQuestionCard.append(newQuestionCardBody);
    newQuestionCard.data('question', question);
    newQuestionCard.data('quiz', question.QuizId);
    newQuestionCardHeading.append(questionName);
    return newQuestionCard;
  }

  // This function figures out which question we want to delete and then calls deleteQuestion
  function handleQuestionDelete() {
    var currentQuestion = $(this)
      .parent()
      .parent()
      .data('question');
    deleteQuestion(currentQuestion.id);
  }

  // This function figures out which question we want to edit and takes it to the appropriate url
  function handleQuestionEdit() {
    var currentQuestion = $(this)
      .parent()
      .parent()
      .data('question');
    window.location.href = '/question?question_id=' + currentQuestion.id;
  }

  function handleQuizTaking() {
    let quizId = $(this).attr('data-quiz');
    window.location.href = '/takequiz/' + quizId;
    console.log(quizId);
    console.log('Clicked on Take Quiz');
  }


  // This function displays a message when there are no questions
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = '';
    if (id) {
      partial = ' for Quiz #' + id;
    }
    quizContainer.empty();
    var messageH2 = $('<h2>');
    messageH2.css({ 'text-align': 'center', 'margin-top': '50px' });
    messageH2.html('No quizzes yet' + partial + ', navigate <a href=\'/question' + query +
    '\'>here</a> in order to get started.');
    quizContainer.append(messageH2);
  }

});
