require('./bootstrap');

// On submit: prevent default, send form via axios, accept the response, display errors
$('#form').submit(function(event) {
  event.preventDefault();

  displayLoader();

  axios.post('/update', $(this).serialize())
    .then(response => {
      var data = response.data;
      var inputs = ['full_name', 'email', 'nickname', 'description', 'country', 'city'];

      if (data.success) {
        resetErrors(inputs);
        displayMessage('Information was updated.', 'success')
      }

      if (data.errors) {
        displayErrors(data.errors, inputs);
      }

      hideLoader('Update');

    });
});

// Display errors function
window.displayErrors = function(errors, inputs) {
  var input = '';
  for (var i = 0; i < inputs.length; i++) {
    input = inputs[i];
    $(`#${input}`).attr('class', 'form-control');
    $(`#${input}-error`).html('');
    if (errors[input]) {
      $(`#${input}`).addClass('failed');
      $(`#${input}-error`).html(errors[input][0]);
    }
  }
}

// Reset errors function
window.resetErrors = function(inputs) {
  var input = '';
  for (var i = 0; i < inputs.length; i++) {
    input = inputs[i];
    $(`#${input}`).attr('class', 'form-control');
    $(`#${input}-error`).html('');
  }
}

// Display and hide loader gif
window.displayLoader = function() {
  $('#submit-button').html('<img src="/img/loader.gif" width="40" height="40">');
}
window.hideLoader = function(text) {
  $('#submit-button').html(text);
}

// Display message function
window.displayMessage = function(message, status) {
  var messageContainer = $('#message');
  messageContainer
    .html(message)
    .attr('class', '')
    .addClass(status)
    .animate({left: '0px'});
  setTimeout(function() {
    messageContainer.animate({left: '-320px'})
  }, 3000);
};

$(document).ready(function() {

  // If we are on home page set the correct country
  if (window.location.pathname === '/home') {
    var country = $('#hidden-country').val();
    $('#country option:contains("' + country + '")').prop('selected', true);
  }

});
