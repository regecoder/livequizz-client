
/* http://codepen.io/elaelation/pen/CxgmH/
 to modify total time, just input on variable totaltime
 */
var totaltime = 11;
setTimeout(
        function ()
        {

            function updateCounter(percent) {
                var deg;
                if (percent < (totaltime / 2)) {
                    deg = 90 + (360 * percent / totaltime);
                    $('.pie').css('background-image',
                            'linear-gradient(' + deg + 'deg, transparent 50%, #57D1FF 50%),linear-gradient(90deg, #57D1FF 50%, transparent 50%)'
                            );
                } else if (percent >= (totaltime / 2)) {
                    deg = -90 + (360 * percent / totaltime);
                    $('.pie').css('background-image',
                            'linear-gradient(' + deg + 'deg, transparent 50%, #003c54 50%),linear-gradient(90deg, #57D1FF 50%, transparent 50%)'
                            );
                }
            }

            var count = parseInt($('#time').text());
            myCounter = setInterval(function () {
                count += 1;

                $('#time').html((totaltime - count));

                if (totaltime - count <= 3) {
                    $('#time').css('color', 'red');
                }

                updateCounter(count);

                if (count === totaltime) {
                    clearInterval(myCounter);
                }
            }, 1000);


        }, 3000);


/* http://codepen.io/elaelation/pen/CxgmH/
 to modify total time, just input on variable totaltime
 */
/*var totaltime = 11;
 
 
 function updateCounter(percent) {
 var deg;
 if (percent < (totaltime / 2)) {
 deg = 90 + (360 * percent / totaltime);
 $('.pie').css('background-image',
 'linear-gradient(' + deg + 'deg, transparent 50%, #57D1FF 50%),linear-gradient(90deg, #57D1FF 50%, transparent 50%)'
 );
 } else if (percent >= (totaltime / 2)) {
 deg = -90 + (360 * percent / totaltime);
 $('.pie').css('background-image',
 'linear-gradient(' + deg + 'deg, transparent 50%, #003c54 50%),linear-gradient(90deg, #57D1FF 50%, transparent 50%)'
 );
 }
 }
 
 
 
 var count = parseInt($('#time').text());
 myCounter = setInterval(function () {
 count += 1;
 
 $('#time').html( (totaltime-count) );
 
 updateCounter(count);
 
 if (count == totaltime) {
 clearInterval(myCounter);
 }
 }, 1000);
 */