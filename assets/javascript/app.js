
// Initialize Firebase
var config = {
  apiKey: "AIzaSyB-imEw7CPyny_ZBxG192gec6DL7vcKXdo",
  authDomain: "train-project-9468b.firebaseapp.com",
  databaseURL: "https://train-project-9468b.firebaseio.com",
  projectId: "train-project-9468b",
  storageBucket: "train-project-9468b.appspot.com",
  messagingSenderId: "1048104326264"
};
firebase.initializeApp(config);

 var dataRef = firebase.database();

// Initial Values
var trainname = "";
var destination = "";
var frequency = ""; //in minutes

var currenttime= moment(moment().format('LT'), ["h:mm A"]).format("HH:mm"); //current time in 24 hours format HH:mm
var currenttimeConverted = moment.duration(currenttime).asMinutes() //current time in minutes
console.log("current time HH:mm  " + currenttime);
console.log("current time convert to minutes =  " + currenttimeConverted);



var firsttraintime = ""; //in HH:mm
var firsttraintimeConverted = moment.duration(firsttraintime).asMinutes() //first train time in minutes

var difftime = currenttimeConverted - firsttraintimeConverted // in minuttes, difference between current time and first train time
var tRemainder = "" //// in minutes, use Modulus (emainder) to calculate
var minutestonexttrain = ''; // in minutes
var nextarrival = ""; //in minutes
var nextarrivalFormatted = ""; //in HH:mm
var Key = "";
var intervalId;
var postData;


//time convert function to convert 24 hrs time format to 12 hrs AM/PM hour
function tConvert (time) {
time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
if (time.length > 1) { 
  time = time.slice (1); 
  time[5] = +time[0] < 12 ? 'PM' : 'AM'; // Set AM/PM
  time[0] = +time[0] % 12 || 12; 
}
return time.join (''); // return adjusted time or original string
}
//end of time convert function

$(document).ready(function() {
// runtimer();

//function to happen every minute
// function runtimer() {
//   clearInterval(intervalId);
//   intervalId = setInterval(updateminute, 20000);
// }

// //  The update minute function.
// function updateminute() {
// console.log("current time HH:mm  " + currenttime);
// console.log("current time convert to minutes =  " + currenttimeConverted);

//   dataRef.ref().push({
//    currenttime: currenttime,
//   });
// }



// Capture Button Click
$("#submit").on("click", function(event) {
    event.preventDefault();

    trainname = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firsttraintime = $("#first-train-time").val().trim();
    frequency = $("#frequency").val().trim();

    currenttime= moment(moment().format('LT'), ["h:mm A"]).format("HH:mm"); //current time in 24 hours format HH:mm
    currenttimeConverted = moment.duration(currenttime).asMinutes() //current time in minutes
console.log("current time HH:mm  " + currenttime);
console.log("current time convert to minutes =  " + currenttimeConverted);

     firsttraintimeConverted = moment.duration(firsttraintime).asMinutes() //first train time in minutes
     difftime = currenttimeConverted - firsttraintimeConverted// in minuttes, difference between current time and first train time
console.log("difftime is: " + difftime);

     tRemainder = difftime % frequency; //////in minutes, use Modulus (remainder) to calculate
console.log("tRemainder: " + tRemainder);
       minutestonexttrain = frequency - tRemainder;
console.log("minutes to next train: " + minutestonexttrain);
        nextarrival = moment().add(minutestonexttrain, "minutes");
        nextarrivalFormatted= tConvert(moment(nextarrival).format("hh:mm")); //returns a  12 hrs AM/PM format
console.log("next arrival is : " + nextarrivalFormatted);


    // Code for the push
    dataRef.ref().push({
      trainname: trainname,
      destination: destination,
      currenttime:currenttime,
      firsttraintime: firsttraintime, // HH:mm
      frequency: frequency, // in minutes
      nextarrivalFormatted:nextarrivalFormatted,
      minutestonexttrain:minutestonexttrain,
    });
  
        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train-time").val("");
        $("#frequency").val("");

     return false;
//end of onclick event
  });

  //function of updates 
  // function writeNewPost(trainname,destination,currenttime,firsttraintime,frequency,nextarrivalFormatted,minutestonexttrain) {
  //   // A post entry.
  //   var postData = {
  //     trainname: trainname,
  //     uid:uid,
  //     destination: destination,
  //     currenttime:currenttime,
  //     firsttraintime: firsttraintime, // HH:mm
  //     frequency: frequency, // in minutes
  //     nextarrivalFormatted:nextarrivalFormatted,
  //     minutestonexttrain:minutestonexttrain,
  //   };

  //   console.log("new" + postData);
  
  //   // Get a key for a new Post.
  //   var newPostKey = firebase.database().ref().child().push().key;
  
  //   // Write the new post's data simultaneously in the posts list and the user's post list.
  //   var updates = {};
  //   updates[newPostKey] = postData;
  
  //   return firebase.database().ref().update(updates);
  // }
//end of update function



// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function(childSnapshot) {

// Log everything that's coming out of snapshot
console.log(childSnapshot.val());


$('#train-table').append("<tr class='table-row' id=" + "'" + childSnapshot.key + "'" + ">" +
            "<td>"+ childSnapshot.val().trainname +"</td>" +
             "<td>" + childSnapshot.val().destination +"</td>" +
             "<td>" + childSnapshot.val().frequency + "mins" +"</td>" +
             "<td>" + childSnapshot.val().nextarrivalFormatted + "</td>" +
             "<td>" + childSnapshot.val().minutestonexttrain + "mins" +"<td>" + 
             "<button type='submit' id = 'remove' class='remove-train btn btn-primary'>" + "<i class='fa fa-trash'>" + "Remove" + "</td>" + 
             "</td>" +
             // lastly add a remove button
        "</tr>"); 
        $("body").on("click", "#remove", function(){
          dataRef = firebase.database();
          console.log(this) 
          $(this).closest ('tr').remove();
           thiskey = $(this).parent().parent().attr('id');
           console.log(thiskey);
           console.log(dataRef.ref().child(thiskey));
          //  dataRef.child(key).remove();
        });
// Handle the errors
}, function(errorObject){
  //console.log("Errors handled: " + errorObject.code)
  
});



//end of document ready
});

