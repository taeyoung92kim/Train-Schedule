var config = {
    apiKey: "AIzaSyCLqxeqQBnLbJYm93FEmE3suzaw3DZvD14",
    authDomain: "train-schedule-e37dd.firebaseapp.com",
    databaseURL: "https://train-schedule-e37dd.firebaseio.com",
    projectId: "train-schedule-e37dd",
    storageBucket: "train-schedule-e37dd.appspot.com",
    messagingSenderId: "1030740253024"
};

firebase.initializeApp(config);

let database = firebase.database();

let traininput = "";
let destinationinput = "";
let frequencyinput = 0;

let timeinput = "";
let nextArrival = 0;
let minsAway = 0;

$("#add-train").on("click", function () {

    event.preventDefault();

    traininput = $("#train-input").val().trim();
    destinationinput = $("#destination-input").val().trim();
    timeinput = $("#time-input").val().trim();
    frequencyinput = $("#frequency-input").val().trim();

    database.ref().push({
        traininput: traininput,
        destinationinput: destinationinput,
        timeinput: timeinput,
        frequencyinput: frequencyinput
    });

    let firstTimeConverted = moment(timeinput, "HH:mm").subtract(1, "years");
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    let tRemainder = diffTime % frequencyinput;
    let tMinutesTillTrain = frequencyinput - tRemainder;
    let trainTimeConverted = moment().add(tMinutesTillTrain, "minutes");
    let nextTrain = moment(trainTimeConverted).format("hh:mm");

    let addrow = "<tr><td>" + traininput + "</td>" + 
    "<td>" + destinationinput + "</td>" + 
    "<td>" + frequencyinput + "</td>" + 
    "<td>" + nextTrain + "</td>" + 
    "<td>" + tMinutesTillTrain + "</td></tr>";

    $("table").append(addrow); 
});