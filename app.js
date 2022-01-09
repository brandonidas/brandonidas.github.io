

var i = 0;
var txt = 'Hi, I\'m Brandon';
var speed = 45;

function typeWriter() {
    if (i < txt.length) {
        document.getElementById("demo").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

function untypeWriter() {
    var speed = 60;
    var currentText = document.getElementById("demo").innerHTML;
    var j = currentText.length - 1;
    if (0 <= j) {
        currentText = currentText.substr(0, j)
        document.getElementById("demo").innerHTML = currentText;
        j--;
        setTimeout(untypeWriter, speed);
    }
}

function quotesTypeWriter() {
    var currentText = document.getElementById("demo").innerHTML;
    var quotes = [
        "Here are some direct quotes from me",
        "OBJECTIVE: survive",
        "The light was as the beginning of the tunnel.",
        // "The nicotine in your vape gives you the dopamine that's naturally supposed to come from pursuing meaningful goals. That's why you have such a strange nihilistic attitude towards everything.",
        "I just REALLY wanna work at Palantir as a delta."
    ]
}
// document.body.onload = function () {
//   typeWriter();
//   //setTimeout(untypeWriter, 1500);
// };

//   ("#manifest").delay(5000).fadeIn(500); //

var displayAll = false;
window.onload = function ()  //executes when the page finishes loading
{
    if (!displayAll) {
        typeWriter();
        setTimeout(classByString, 1000, "demo", "blink_me_on_off");
        setTimeout(unclassByString, 2000, "demo", "blink_me_on_off");
        setTimeout(unclassByString, 2200, "manifest", "hide"); //milliseconds
        setTimeout(unfadeByID, 2099, "manifest"); //milliseconds
        setTimeout(lineByIDAndLength, 3000, "line", 310); //milliseconds
    } else {
        typeWriter();
        setTimeout(classByString, 0, "demo", "blink_me_on_off");
        setTimeout(unclassByString, 0, "demo", "blink_me_on_off");
        setTimeout(unclassByString, 0, "manifest", "hide"); //milliseconds
        setTimeout(unfadeByID, 0, "manifest"); //milliseconds
        setTimeout(lineByIDAndLength, 0, "line", 310); //milliseconds

    }
};

function classByString(id, toClass) {
    var currentClass = document.getElementById(id).className;
    currentClass = currentClass.concat(" ", toClass)
    document.getElementById(id).className = currentClass;
}

function unclassByString(id, unclass) {
    var currentClass = document.getElementById(id).className;
    document.getElementById(id).className = currentClass.replace(unclass, "");
}

function unfadeByID(id) {
    var element = document.getElementById(id);
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}


// var id = null;
// function lineByIDAndLength(id, length) {
//   var elem = document.getElementById(id);
//   var pos = 0;
//   clearInterval(id);
//   id = setInterval(frame, 1);
//   function frame() {
//     if (pos > length) { // find way to see view port
//       clearInterval(id);
//     } else {
//       pos++;
//       elem.style.width = pos + 'px';
//     }
//   }
// }
var id = null;
function lineByIDAndLength(id, length) {
    var elem = document.getElementById(id);
    var pos = 0;
    clearInterval(id);
    id = setInterval(frame, 1);
    targetWidth = document.getElementById('top_bar').clientWidth;
    function frame() {
        if (pos > targetWidth) { // find way to see view port
            clearInterval(id);
        } else {
            pos++;
            elem.style.width = pos + 'px';
        }
    }
}