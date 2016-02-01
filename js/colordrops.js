'use strict';

function draw(){
    buffer.clearRect(
      0,
      0,
      width,
      height
    );

    var loop_counter = ripples.length - 1;
    if(loop_counter >= 0){
        for(loop_counter = 0; loop_counter < ripples.length - 1; loop_counter++){
            // Draw ripple.
            buffer.fillStyle = ripples[loop_counter]['color'];
            buffer.fillRect(
              ripples[loop_counter]['x'] - ripples[loop_counter]['width'],
              ripples[loop_counter]['y'] - ripples[loop_counter]['width'],
              ripples[loop_counter]['width'] * 2,
              ripples[loop_counter]['width'] * 2
            );
        }
    }

    // Draw ripples and ripple_interval.
    buffer.fillStyle = '#fff';
    buffer.fillText(
      ripples.length,
      0,
      25
    );
    buffer.fillText(
      ripple_interval,
      0,
      50
    );

    canvas.clearRect(
      0,
      0,
      width,
      height
    );
    canvas.drawImage(
      document.getElementById('buffer'),
      0,
      0
    );

    window.requestAnimationFrame(draw);
}

function logic(){
    ripple_timer += 1;
    if(ripple_timer >= ripple_interval){
        ripple_timer = 0;

        // Create new ripple.
        ripples.push({
          'color': random_hex(),
          'width': 0,
          'x': drop_x,
          'y': drop_y,
        });
    }

    var loop_counter = ripples.length - 1;
    if(loop_counter >= 0){
        do{
            if(ripples[loop_counter]['width'] > x){
                ripples.splice(
                  loop_counter,
                  1
                );
            }
        }while(loop_counter--);

        for(loop_counter = 0; loop_counter < ripples.length - 1; loop_counter++){
            // Increase size of ripple.
            ripples[loop_counter]['width'] += 1;
        }
    }
}

function random_hex(){
    var choices = '0123456789abcdef';
    return '#'
      + choices.charAt(Math.floor(Math.random() * 16))
      + choices.charAt(Math.floor(Math.random() * 16))
      + choices.charAt(Math.floor(Math.random() * 16));
}

function resize(){
    height = window.innerHeight;
    document.getElementById('buffer').height = height;
    document.getElementById('canvas').height = height;
    y = height / 2;

    width = window.innerWidth;
    document.getElementById('buffer').width = width;
    document.getElementById('canvas').width = width;
    x = width / 2;

    buffer.font = '23pt sans-serif';
}

var buffer = document.getElementById('buffer').getContext('2d', {
  'alpha': false,
});
var canvas = document.getElementById('canvas').getContext('2d', {
  'alpha': false,
});
var drop_x = 0;
var drop_y = 0;
var height = 0;
var ripples = [];
var ripple_interval = 23;
var ripple_timer = 99;
var width = 0;
var x = 0;
var y = 0;

window.onkeydown = function(e){
    var key = e.keyCode || e.which;

    // +: drop_counter++;
    if(key === 187){
        ripple_interval++;

    // -: drop_counter--;
    }else if(key === 189){
        ripple_interval = ripple_interval > 0
          ? ripple_interval - 1
          : 0;

    // ESC: clear and reset.
    }else if(key === 27){
        ripples.length = 0;

        drop_x = x;
        drop_y = y;
        ripple_interval = 23;
        ripple_timer = 99;
    }
};

window.onload = function(){
    window.onresize = resize;
    resize();

    drop_x = x;
    drop_y = y;

    window.requestAnimationFrame(draw);
    window.setInterval(
      logic,
      30
    );
};

window.onmousedown = 
  window.ontouchstart = function(e){
    // Change ripple origin.
    drop_x = e.pageX;
    drop_y = e.pageY;
    ripple_timer = 99;
};
