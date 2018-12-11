$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC9MwFMFcSaqQSM2dSy1UtKgNF6kEfzFFo",
        authDomain: "train-schedule-52bad.firebaseapp.com",
        databaseURL: "https://train-schedule-52bad.firebaseio.com",
        projectId: "train-schedule-52bad",
        storageBucket: "train-schedule-52bad.appspot.com",
        messagingSenderId: "604100610194"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    //add trains
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        //user input
        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTrain = parseInt($("#train-time-input").val().trim());
        var frequency = $("#frequency-input").val().trim();

        //turn vars to object
        var addTrain = {
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        };

        // console.log(addTrain);

        //push to database
        database.ref().push(addTrain);

        //clear input values
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#train-time-input").val("");
        $("#frequency-input").val("");
    });

    //Firebase event + HTML 
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        //vars
        var trainName = childSnapshot.val().trainName;
        var destination = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().firstTrain;
        var frequency = childSnapshot.val().frequency;

        //math for time properties
        var currentTime = moment();
        // console.log(currentTime);
        var firstTrainTime = moment(firstTrain, "HH:mm").subtract(1, "years");
        // console.log(firstTrainTime);
        var timeDiff = moment().diff(firstTrainTime, "minutes");
        // console.log(timeDiff);
        var remainder = timeDiff % frequency;
        // console.log(remainder);
        var minLeft = frequency - remainder;
        // console.log(minLeft);
        var x = (currentTime.add(minLeft, "minutes")).format("HH:mm");
        // console.log(x);

        //new row to table
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(x),
            $("<td>").text(minLeft),
        );

        //add new row
        $("#train-table > tbody").append(newRow);
            
    });

}); 