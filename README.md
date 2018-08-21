# Train-Schedule
https://yebicen.github.io/Train-Schedule/



BASIC:

- First I created a public firebase DB at https://train-project-9468b.firebaseio.com, and checking back and forth the realtime DB.

- Then I listed all initial variables across the project from line 16 to line 37

- I use moment JS for obtaining current time in relative format, also for converting time format.

- The main part is to log out current time in minutes for calculation, and use the math of remainder to calculate the train waiting time, see codes for main variables below:
currenttime= moment(moment().format('LT'), ["h:mm A"]).format("HH:mm"); //current time in 24 hours format HH:mm
currenttimeConverted = moment.duration(currenttime).asMinutes() //current time in minutes
firsttraintimeConverted = moment.duration(firsttraintime).asMinutes() //first train time in minutes
difftime = currenttimeConverted - firsttraintimeConverted// in minuttes, difference between current time and first train time
tRemainder = difftime % frequency; //in minutes, use Modulus (remainder) to calculate
minutestonexttrain = frequency - tRemainder;
nextarrival = moment().add(minutestonexttrain, "minutes");
nextarrivalFormatted= tConvert(moment(nextarrival).format("hh:mm")); //returns a  12 hrs AM/PM format


- Then I use push and append child to save the data in firebase, and dynamically generate table elements from the childSnapshot


BONUS:
- Line 156 to Line 165, I created a remove button at the same time with the table elements, under the same userID.
I was able to remove the specified table content from the DOM by code line 170:
$(this).closest ('tr').remove();

- I was able to log the correct key by onlick the remove button, using the child/parent method of firebase, see line 171-172 as below:
thiskey = $(this).parent().parent().attr('id');

- I am removing the data node from the database by code on line 176:
dataRef.ref().child(thiskey).remove();
});

- I was also trying to update the real time timer using fire base update method from line 120-145 and timer interval from line 53-69. But it doesn't quite work out, so I comment them out.



