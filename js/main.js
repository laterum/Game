
$(document).ready(function(){
    var screen = $('#screen');
    var start = $('#start');
    var score = $('.score');
    var table = $('#table');

    table.height($(window).height()/2);
    screen.height($(window).height()/2);

    var maxY = screen.height();
    var maxX = screen.width();
    var clickCounter = 0;
    var firstRun = true;

    var square = $("<div id='square' class='shape' style='position:fixed;'></div>");

    var bindClickListener = function() {
        screen.click(function(e) {
            if (e.target.id === "square") {
                clickCounter++;
                $('#score').text(clickCounter);
                drawTheBoard();
            }
        })
    };
    var drawTheBoard = function() {
        $('.shape').remove();
        drawTheSquare();
    };
    var drawTheSquare = function() {
        var squareClone = square;
        squareClone.css(getCSS());
        screen.append(squareClone);
    };
    var getCSS = function() {
        var randomY = Math.floor(Math.random() * maxY);
        var randomX = Math.floor(Math.random() * maxX);
        var randomDimensions = Math.floor(Math.random() * 10 + 50);
        return {
            'top': randomY * 0.6 + 172,
            'left': randomX * 0.6 + 150,
            'width': randomDimensions,
            'height': randomDimensions,
            'background': getRandomColor(),
            'opacity': 0.60
        }

    };
    var getRandomColor = function() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        var intervalID = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.text(minutes + ":" + seconds);

            if (--timer < 0) {
                clearInterval(intervalID);
                $('#myModal').modal('show');
                score.text('');
                score.append(clickCounter);
                start.attr('data-flag','ready');
                $('.shape').remove();
                $('#score').text('0');

            }
        }, 1000);
    }

    start.click(function () {
        if (start.attr('data-flag') === 'ready') {
            clickCounter = 0;
            var timeLeft = 60,
                display = $('#timer');
            startTimer(timeLeft, display);
            if (firstRun) {
                bindClickListener();
                firstRun = false;
            }
            drawTheBoard();
            score.text(clickCounter);
            start.attr('data-flag','no');
        }
    });

    $('.btn-primary').click(function () {
        var name = $('#get-score').val();
        table.append($("<div class='tab-score'><p class='player'></p><span class='player-score'></span></div>"));
        $('.player').last().append(name);
        $('.player-score').last().append(clickCounter);
        $('#myModal').modal('hide');
        score.text('');
        $('#get-score').val('')
    })
});