function draw(){
    buffer.clearRect(
      0,
      0,
      width,
      height
    );

    ripple_timer += 1;
    if(ripple_timer > 23){
        ripple_timer = 0;

        // create new ripple
        ripples.push([
          drop_x,
          drop_y,
          0,
          ripple_type
            ? '#' + random_hex() + random_hex() + random_hex()
            : '#000'
        ]);

        // alternate between color ripple and #000 ripple
        ripple_type = !ripple_type;
    }

    if(ripples.length > 0){
        var loop_counter = ripples.length - 1;
        do{
            if(ripples[loop_counter][2] > x){
                ripples.splice(
                  loop_counter,
                  1
                );
            }
        }while(loop_counter--);

        loop_counter = 0;
        while(loop_counter < ripples.length - 1){
            // increase size of ripple
            ripples[loop_counter][2] += 1;

            // draw ripple
            buffer.fillStyle = ripples[loop_counter][3];
            buffer.fillRect(
              ripples[loop_counter][0] - ripples[loop_counter][2],
              ripples[loop_counter][1] - ripples[loop_counter][2],
              ripples[loop_counter][2] * 2,
              ripples[loop_counter][2] * 2
            );

            // move on to next ripple
            loop_counter += 1;
        }
    }

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
}

function random_hex(){
    return '0123456789abcdef'.charAt(Math.floor(Math.random() * 16));
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
}

var buffer = document.getElementById('buffer').getContext('2d');
var canvas = document.getElementById('canvas').getContext('2d');
var height = 0;
var ripples = [];
var ripple_timer = 99;
var ripple_type = 1;
var width = 0;
var x = 0;
var y = 0;

window.onresize = resize;
resize();

var drop_x = x;
var drop_y = y;

setInterval(
  'draw()',
  30
);

window.onkeydown = function(e){
    // clear and reset
    ripples.length = 0;
    drop_x = x;
    drop_y = y;
};

window.onmousedown = function(e){
    // change ripple origin
    ripple_type = 1;
    drop_x = e.pageX;
    drop_y = e.pageY;
};
