/*
 * Mélanger un array 
 * http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
 */
function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
        ;
    return o;
}


$('#page-wrapper').click(function () {

    // Tableau des variables
    var i = ['pow', 'blam', 'wizz', 'chou', 'wow', 'crap'];
    shuffle(i);
    var sound = new Audio('audio/' + i[0] + '.mp3');

    console.log(i[0]);

    $("head").append(
            $(document.createElement("link")).attr({rel: "stylesheet", type: "text/css", href: "css/anim_" + i[0] + ".css"})
            );
    

    $('#animation').css({opacity: 1}, 'easeInOutCubic'),
            $('#anim2').velocity({'background-size': '150%'}, [300, 25]),
            $("#anim2").rotate({
        angle: 0,
        animateTo: 370,
        duration: 2000
    });
    $('#anim3').velocity({'background-size': '100%'}, [0.17, 0.83, 0.67]),
            $('#anim4').velocity({'background-size': '100%'}, [0.25, 0.90, 0.75]),
            $('#anim5').velocity({opacity: 1, 'background-size': '110%'}, {
        easing: 'easeInOutCubic',
        delay: 200
    });

    sound.play();

    $("#overlay").velocity({opacity: 1}, {
        easing: 'easeInOutCubic',
        delay: 1000
    });


});







