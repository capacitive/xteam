document.addEventListener('DOMContentLoaded', function(event){
  console.log('DOM loaded and parsed');

  var counterDiv = document.createElement('div');
  var answerDiv = document.getElementById('answer1');
  answerDiv.appendChild(counterDiv);
  
  document.getElementById('answer1').addEventListener('input', changeEventHandler);
}, false);

function changeEventHandler(event) {
  console.log('event fired: %o', event);

  var regEx = /([A-z|1-9])+/g;
  var arrayRegEx = regEx.exec(event.target.innerHTML);
  console.log(arrayRegEx);

  var counterDiv = event.target.childNodes[1];
  counterDiv.innerHTML = arrayRegEx.length;
}