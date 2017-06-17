'use strict';

function draw_logic(){
    // Draw ripples.
    for(var loop_counter = 0; loop_counter < ripples.length; loop_counter++){
        canvas_buffer.fillStyle = ripples[loop_counter]['color'];
        canvas_buffer.fillRect(
          ripples[loop_counter]['x'] - ripples[loop_counter]['width'],
          ripples[loop_counter]['y'] - ripples[loop_counter]['width'],
          ripples[loop_counter]['width'] * 2,
          ripples[loop_counter]['width'] * 2
        );
    }

    // Draw ripples.length and ripple_interval.
    canvas_buffer.fillStyle = '#fff';
    canvas_buffer.fillText(
      ripples.length,
      0,
      25
    );
}

function logic(){
    ripple_timer += 1;
    if(ripple_timer >= core_storage_data['frame-ms']){
        ripple_timer = 0;

        // Create new ripple.
        ripples.push({
          'color': '#' + core_random_hex(),
          'width': 0,
          'x': core_mouse['down-x'],
          'y': core_mouse['down-y'],
        });
    }

    var loop_counter = ripples.length - 1;
    if(loop_counter >= 0){
        do{
            if(ripples[loop_counter]['width'] > canvas_x){
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

function repo_init(){
    core_repo_init({
      'info': '<input onclick=canvas_setmode({newgame:true}) type=button value=Restart>',
      'mousebinds': {
        'mousedown': {
          'todo': function(){
              ripple_timer = 99;
          },
        },
      },
      'title': 'ColorDrops.htm',
    });
    canvas_init();
}

var ripples = [];
var ripple_timer = 99;
