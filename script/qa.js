//var regEx = /([A-z]+)/g;

// $(document).ready(function(){

// });

document.addEventListener('DOMContentLoaded', function(event){
  console.log('DOM loaded and parsed');
  console.dir(event);

  var counterDiv = document.createElement('div');
  var answerDiv = document.getElementById('answer1');
  answerDiv.appendChild(counterDiv);
  
  document.getElementById('answer1').addEventListener('input', changeEventHandler);
}, false);

function wordCount(text){
  var array = text.split(' ');
  console.dir(array);
  return array.length;
}

function changeEventHandler(event) {
  //console.log('event fired: %o', event);

  var answerDiv = document.getElementById('answer1');
  var words = wordCount(event.target.textContent);

  var counterDiv = event.target.childNodes[1];
  counterDiv.textContent = words;
}