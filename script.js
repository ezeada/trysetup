import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyAd_R6G5OVpUvBeTmAIoA-VC-yL7wfoCsY",
  authDomain: "fir-au-493d6.firebaseapp.com",
  projectId: "fir-au-493d6",
  storageBucket: "fir-au-493d6.appspot.com",
  messagingSenderId: "1029941525769",
  appId: "1:1029941525769:web:c06c7e8b0c8554508167d8",
  measurementId: "G-34LY6VSPLM"
};

const app = initializeApp(firebaseConfig);
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

var currentTab = 2;
showTab(currentTab);
var obj = new Object();

function showTab(n) {
  // This function will display the specified tab of the form
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 2)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  if (n == (x.length - 1)) {
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    var x = document.getElementsByClassName("step");
    for (let i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    createJson(currentTab);
  }
  // displays the correct step indicator
  if (currentTab < 4) {
    fixStepIndicator(currentTab)
  }
}

document.getElementById("prevBtn").addEventListener("click", function() {
  nextPrev(-1);
});
document.getElementById("nextBtn").addEventListener("click", function() {
  nextPrev(1);
});

function nextPrev(n) {
  // This function will figure out which tab to display
  createJson(currentTab);
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    currentTab = currentTab + n;
    //document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  if (currentTab != 4) {
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
      // If a field is empty...
      if (y[i].value == "") { // add extra validation
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        // and set the current valid status to false:
        valid = false;
      }
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}


//Send Message to Firebase
function sendMessage(name, email, number, single, gender, preferences, image) {
  const database = getDatabase();

  set(ref(database, 'users/' + Math.floor(Math.random() * 10000000)), {
    name: name,
    email: email,
    number: number,
    single: single,
    gender: gender,
    preferences: preferences,
    image: image
  }).then(() => {
    // //Show Alert Message
    // document.querySelector('.alert').style.display = 'block';
    // //Hide Alert Message After Seven Seconds
    //setTimeout(function () {
    //document.querySelector('.alert').style.display = 'none';
    //}, 7000);
    //document.getElementById('registrationform').reset();
  }).catch((error) => {
    alert(error)
  })
}
    
function createJson(tab) {
    if (tab == 0) { // first and last name
        obj.name = document.getElementById('firstname').value + " " + document.getElementById('lastname').value;
    } else if (tab == 1) { // email and number
        obj.email = document.getElementById('email').value;
        obj.number = document.getElementById('number').value;
    } else if (tab == 2) { // single
        obj.single = document.getElementById('Besetup').checked;
    } else if (tab == 3) { // gender, preferences
        obj.gender = document.getElementById("gender").value;
        obj.preferences = [];
        if (document.getElementById("menpref").checked) {
            obj.preferences.push("men");
        } 
        if (document.getElementById("womenpref").checked) {
            obj.preferences.push("women");
        } 
    } else if (tab == 4) { // profile image
        obj.image = document.getElementById("img");
        
    } else if (tab == 5) { // submit
       sendMessage(obj.name, obj.email, obj.number, obj.single, obj.gender, obj.preferences, obj.image);
    }

}
