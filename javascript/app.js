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

function moveToSelection() {
    $('html, body').animate({
        scrollTop:$('.mainWorkoutSection').offset().top
    },1000)
}

myWorkoutPlaylist.showIntensityEasy = 
$('#easyBtn').on('click', function(e){
    e.preventDefault();
    moveToSelection();
    myWorkoutPlaylist.delete();
    let easyBtn = '15 Reps of:'
    $('#amount').append(`${easyBtn}`);
    
})

myWorkoutPlaylist.showIntensityModerate = 
$('#modBtn').on('click', function(e){
    e.preventDefault();
    moveToSelection();
    myWorkoutPlaylist.delete();
    let modBtn = '30 Reps of:'
    $('#amount').append(`${modBtn}`);
})

myWorkoutPlaylist.showIntensityIntense = 
$('#intenseBtn').on('click', function(e){
    e.preventDefault();
    moveToSelection();
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
        $('html,body').animate({
        scrollTop: $(".containerOfLists").offset().top},
        'slow');
    } else {
        clearTimeout(timeoutId);
        $(this).delay(100).appendTo($('#yourChoice'));
        $(this).off('mouseover'); 
        $(this).find('#image').css('display', 'none');
   
    }
});

myWorkoutPlaylist.clickToMoveBack = 
$('#yourChoice').on('click', 'li', function(){ 
    $(this).on('mouseover', function(){
        timeoutId = setTimeout ( () => {
            $(this).find('img').show(500);
        }, 800);
    })
    $(this).on('mouseout', function(){
        clearTimeout(timeoutId);
        $(this).find('img').hide(500);
    })
    $(this).appendTo($('#listOfWorkout'));
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
                if(clockTime < 20) {
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
    if($('#amount').is(':empty') || $('ol#yourChoice li').length === 0) {      
        Swal.fire({
            icon: 'warning',
            title: 'Please Choose the amount of Reps and movement',
            text: 'Yoou need atleast 4 workout moves!',
            confirmButtonText: 'Got it!'
            });
    } else {
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
    }
});
//Button that reset the clock 
$('#reset').on('click', function() {
    $('#clock-content').css('background', 'radial-gradient(#faf7ff 30%, rgb(134, 198, 199) 70%)');
    resetApp();

});
}

myWorkoutPlaylist.init = () => {
    myWorkoutPlaylist.startButton();
    myWorkoutPlaylist.timerClock();
    myWorkoutPlaylist.workoutMovements();
    $(this).scrollTop(0);
}

$(document).ready(function(){
    myWorkoutPlaylist.init();
});

   