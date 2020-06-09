// Make a name space object 
const myWorkoutPlaylist = {};

const arrayFullBody = ['Burpees', 'Frog Jump', 'Mountain Climbers', 'Butt Kicks', 'High Knee']

const arrayLegs = ['Power Squat', 'Surrender', 'Calf Raises', 'Side to Side Hop', 'Skaters']

const arrayAbs = ['Plank Hip Dips', 'Russian Twist', 'Bicycles Crunches', 'Plank Jacks', 'Sit ups']

const arrayArms = ['Push Up', 'Pike Push Up', 'Tricep Dips', 'Spiderman Push Up', 'Inchworm']

// When click 'Let's Sweat' button will scroll down to the main section with the ID of #down
myWorkoutPlaylist.startButton = function(){
    $('.startBtn').on('click', 'a[href^="#"]', function (e) {
        e.preventDefault();
        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 'slow');
        Swal.fire({
            title: 'Please Choose the amount of Reps you wish to do',
            text: 'Then choose only 4 moves to create your personal playlist',
            confirmButtonText: 'Got it!'
          });
    });
}

// Build a function to show level of intensity 
// Level of Intensity chosen by user
myWorkoutPlaylist.delete = function deleteReps(){
    $('#amount').empty();  
}

myWorkoutPlaylist.showIntensityEasy = 
$('#easyBtn').on('click', function(){
    myWorkoutPlaylist.delete();
    let easyBtn = '15 Reps of:'
    $('#amount').append(`${easyBtn}`);
})

myWorkoutPlaylist.showIntensityModerate = 
$('#modBtn').on('click', function(){
    myWorkoutPlaylist.delete();
    let modBtn = '30 Reps of:'
    $('#amount').append(`${modBtn}`);
})

myWorkoutPlaylist.showIntensityIntense = 
$('#intenseBtn').on('click', function(){
    myWorkoutPlaylist.delete();
    let intenseBtn = '50 Reps of:'
    $('#amount').append(`${intenseBtn}`);
})

let timeoutId = null;
// when you click on a workout move it will dispense to the playlist
myWorkoutPlaylist.workoutMovements = function() {

    
    $('.chooseThis').on('mouseover', function(){
      
            timeoutId = setTimeout ( () => {
                $(this).find('img').show(500);
                console.log($(this).find('img'));
            }, 800);
        })
    $('.chooseThis').on('mouseout', function(){
        clearTimeout(timeoutId);
        $(this).find('img').hide(500);
    })
    }

myWorkoutPlaylist.dispensePlaylist = 

$('.chooseThis').on('click', function (e) { 
    if($('#yourChoice')[0].children.length >= 4 ) {
        Swal.fire({
            title: 'Sorry!',
            text: 'You can only choose 4',
            confirmButtonText: 'OKAY'
          });

    } else {
        clearTimeout(timeoutId);
        $(this).delay(100).appendTo($('#yourChoice'));
        $(this).off('mouseover'); 
        $(this).find('#image').css('display', 'none');
   
    }
});

myWorkoutPlaylist.clickToMoveBack = 
$('#yourChoice').on('click', 'li', function(){
    $(this).appendTo($('#listOfWorkout')); 
    //$(this).find('#image').show();
    $('.chooseThis').on('mouseover', function(){
      
        timeoutId = setTimeout ( () => {
            $(this).find('img').show(500);
            console.log($(this).find('img'));
        }, 800);
    })
    $('.chooseThis').on('mouseout', function(){
        clearTimeout(timeoutId);
        $(this).find('img').hide(500);
    })
});


// the Time Clock section
myWorkoutPlaylist.timerClock = function() {
    let session = 30;
    let clockTime = session;
    let clockRunning = false;
    let countdownClock;
    
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
                if(clockTime < 20 && clockTime > 10) {
                    $('#clock-content').css('background', 'rgb(250, 185, 2)');

                } 

                if(clockTime <= 10){
                    $('audio#pop')[0].play();
                    $('#clock-content').css('background', 'rgb(255, 0, 0)')
                }
        }
        else if (clockTime === 0) {
            $('.popUp').show();
        }
    };

    //Start-Stop button when click on
    $('#clock-button').on('click', function() {
    
        // if($('#amount').is(':empty') || $('ol#yourChoice li').length === 0) {
        if(false){       
            Swal.fire({
                icon: 'warning',
                title: 'Please Choose the amount of Reps and movement',
                text: 'Yoou need atleast 4 workout moves!',
                confirmButtonText: 'Got it!'
              });
        } else {

            // setTimeout(function(){

                if (clockRunning) {
                    clockRunning = false;
                    window.clearInterval(countdownClock);
                    $('#clock-button').text('RESUME');
                    $('#reset').attr('disabled', false).show();
                } else {
                    clockRunning = true;
                    $('audio#readySetgo')[0].play();
                    setTimeout(function(){
                        countdownClock = window.setInterval(countdown, 1000);
                    }, 2200); 
                    $('#clock-button').text('STOP');
                    $('#reset').attr('disabled', true).hide();
                }
        
            // }, 2200); 
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
    myWorkoutPlaylist.workoutMovements();
}

$(document).ready(function(){
    myWorkoutPlaylist.init();
    console.log('start');

});

   