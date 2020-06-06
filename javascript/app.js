// Make a name space object 
const myWorkoutPlaylist = {};


// When click 'Let's Sweat' button will scroll down to the main section with the ID of #down
myWorkoutPlaylist.startButton = function(){
    $('.startBtn').on('click', 'a[href^="#"]', function (e) {
        e.preventDefault();
        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 'slow');
    });
}

// Build a function to show level of intensity 
// Level of Intensity chosen by user
myWorkoutPlaylist.delete = function deleteReps(){
    $('#amount').empty();  
}

myWorkoutPlaylist.showIntensityEasy = $('#easyBtn').on('click', function(){
    myWorkoutPlaylist.delete();
    let easyBtn = '15 Reps of:'
    $('#amount').append(`${easyBtn}`);
})

myWorkoutPlaylist.showIntensityModerate = $('#modBtn').on('click', function(){
    myWorkoutPlaylist.delete();
    let modBtn = '30 Reps of:'
    $('#amount').append(`${modBtn}`);
})

myWorkoutPlaylist.showIntensityIntense = $('#intenseBtn').on('click', function(){
    myWorkoutPlaylist.delete();
    let intenseBtn = '50 Reps of:'
    $('#amount').append(`${intenseBtn}`);
})

// when you click on a workout move it will dispense to the playlist
myWorkoutPlaylist.listToMove =
$('#listOfWorkout').on('click', 'li', function () {
    console.log(this)
    $(this)
      .appendTo( $('#yourChoice') )
});

myWorkoutPlaylist.clickToMoveBack = 
$('#yourChoice').on('click', 'li', function(){
    $(this).appendTo($('#listOfWorkout'))
});


myWorkoutPlaylist.timerClock = function() {
    let session = 300;
    let clockTime = session;
    let clockRunning = false;
    let countdownID;
    
    let inMinSec = function(time) {
        let minute = Math.floor(time / 60);
        let second = time % 60;
    
        if (second < 10) {
            second = '0' + second.toString();
        }
        return minute + ':' + second;
    };
    
    let updateTimer = function() {
            $('#clock-counter').text(inMinSec(session));
        }
    
    let updateClockCounter = function() {
        $('#clock-counter').text(inMinSec(clockTime));
    }

    //Initialize the the user interface
    let resetApp = function() {
        clockTime = session;
        updateTimer();
        updateClockCounter();
        $('#clock-button').text('START');
        $('#reset').attr('disabled', true);
    }
    
    resetApp();
    
    let countdown = function() {
        if (clockTime > 0 && clockRunning) {
            clockTime -= 1;
            updateClockCounter();
        }
    };
    //Start-Stop button when click on
    $('#clock-button').on('click', function() {
        if (clockRunning) {
            clockRunning = false;
            window.clearInterval(countdownID);
            $('#clock-button').text('RESUME');
            $('#reset').attr('disabled', false);
        } else {
            clockRunning = true;
            countdownID = window.setInterval(countdown, 1000);
            $('#clock-button').text('STOP');
            $('#reset').attr('disabled', true);
        }
    });

    //Button that reset the clock 
    $('#reset').on('click', function() {
        resetApp();
    
    });
}

myWorkoutPlaylist.init = () => {
    myWorkoutPlaylist.startButton();
    myWorkoutPlaylist.timerClock();
}

$(document).ready(function(){
    myWorkoutPlaylist.init();
});

   