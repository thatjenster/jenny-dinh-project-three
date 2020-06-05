// Make a name space object 
const myWorkoutPlaylist = {};

// cache selectors 
// When click 'Let's Sweat' button will scroll down to the main section with the ID of #down

myWorkoutPlaylist.startButton = function(){
    $('.startBtn').on('click', 'a[href^="#"]', function (e) {
        e.preventDefault();
        console.log("I was here");
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


// Workout playlist that you can choose
myWorkoutPlaylist.chooseYourPlaylist = 
$('#inputYourOwn').keypress(function (event) {
    let keycode = event.keyCode ?
    event.keyCode : event.which;
    
    if (keycode == "13") {
		if ($(this).val().length !== 0) {
			let count = $("span.box").length + 1;

			$("#listOfWorkout").prepend(
				'<li><input id="checkbox-' +
					count +
					'" type="checkbox"><label for="checkbox-' +
					count +
					'">' +
					$(this).val() +
					'<span class="box"></span></label></li>'
			);
			$(this).val("");
		}
	}
});


myWorkoutPlaylist.whenClick = 

$("#listOfWorkout").on("click", "label", function () {


});

// function of the button to START/STOP/RESET timer when neccessary 

let timerMinutes = 04;
let timerSeconds = 60;

myWorkoutPlaylist.timerClockStart = 
 $('#start').on('click', function(){
   let x = setInterval(

        function(){

            timerSeconds--;
            $('#mins').html(`${timerMinutes}`);
           
            if (timerSeconds < 10) {
                $('#seconds').html(`:0${timerSeconds}`);
                console.log(`Less than ${timerMinutes} ${timerSeconds}`);
            } else {
                $('#seconds').html(`:${timerSeconds}`);
                console.log(`TIMER:${timerMinutes} ${timerSeconds}`);
            }
            if (timerSeconds === 0 ) {
                timerMinutes--;
                timerSeconds = 60;
                console.log('This is working')
            } 

            if (timerMinutes === 2 && timerSeconds === 30){
                alert('Keep Going! Dont stop there');
                console.log(`I am at line 70 ${timerMinutes}m${timerSeconds}s`);
            } 

            if (timerSeconds === 60 && timerMinutes === -1) {
                clearInterval(x);
                alert('Congradulations!');
                console.log('This is cool');
            }    
            },1000)

            let stopTimer = function(){
                clearInterval(x);

            }

            $('#stop').on('click', function(){
                stopTimer();
                console.log('hello')
            })


            $('#reset').on('click', function(){
                $('#mins').html('05:');
                $('#seconds').html('00');
            })
});





$(document).ready(function(){
    // myWorkoutPlaylist.startButton();
});

   