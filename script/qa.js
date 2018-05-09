
(function() {
  if ('registerElement' in document
      && 'import' in document.createElement('link')
      && 'content' in document.createElement('template')) {
    // platform is good!
  } else {
    // polyfill the platform!
    var e = document.createElement('script');
    e.src = '/bower_components/webcomponentsjs/webcomponents-lite.js';
    document.body.appendChild(e);
  }
})();

var pattern = /([A-z|0-9])+/g;
var maxwords;

document.addEventListener('DOMContentLoaded', function (event) {
  console.log('DOM loaded and parsed');
  //console.dir(event);
  var localStorage = window.localStorage;

  maxwords = document.getElementById('maxwords').dataset.maxWords;
  console.log(maxwords);

  for (var i = 1; i < 5; i++) {
    //set up the counter element:
    // var counterDiv = document.createElement('div');
    // counterDiv.className = 'counter';
    // counterDiv.id = 'counter' + i;
    //get a reference to the 'answer paragraph', and update from cache:
    var answerDiv = document.getElementById('answer' + i);
    var data = localStorage.getItem('answer' + i);
    if (data) {
      answerDiv.textContent = data;
    }

    //don't append to the 'answer paragraph' itself, but as a sibling:
    //answerDiv.parentElement.lastElementChild.appendChild(counterDiv);
    //wire up the 'answer edited' event:
    document.getElementById('answer' + i).addEventListener('input', changeEventHandler);
    document.getElementById('answer' + i).addEventListener('click', clickEventHandler);
  }
}, false);

function wordCount(text) {
  var array = text.match(pattern);
  return array.length;
}

function changeEventHandler(event) {
  //console.dir(event);
  var words = wordCount(event.target.textContent);

  if (words > parseInt(maxwords)) {
    event.target.contentEditable = false;
  } else {
    //find the sibling we set up earlier:
    var counterDiv = event.srcElement.nextElementSibling;
    counterDiv.className = 'counter';
    counterDiv.textContent = words + ' words';

    localStorage.removeItem(event.target.id);
    localStorage.setItem(event.target.id, event.target.textContent);
  }
}

function clickEventHandler(event) {
  event.target.contentEditable = true;
}