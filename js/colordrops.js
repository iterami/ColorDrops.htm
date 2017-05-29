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
    canvas_buffer.fillText(
      ripple_interval,
      0,
      50
    );
}

function logic(){
    ripple_timer += 1;
    if(ripple_timer >= ripple_interval){
        ripple_timer = 0;

        // Create new ripple.
        ripples.push({
          'color': '#' + core_random_hex(),
          'width': 0,
          'x': core_input_mouse['down-x'],
          'y': core_input_mouse['down-y'],
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
    canvas_init();
    core_input_binds_add({
      'keybinds': {
        27: {
          'todo': function(){
              ripples.length = 0;

              core_input_mouse['down-x'] = canvas_x;
              core_input_mouse['down-y'] = canvas_y;
              ripple_interval = 23;
              ripple_timer = 99;
          },
        },
        83: {
          'todo': function(){
              ripple_interval = ripple_interval > 0
                ? ripple_interval - 1
                : 0;
          },
        },
        87: {
          'todo': function(){
              ripple_interval++;
          },
        },
      },
      'mousebinds': {
        'mousedown': {
          'todo': function(){
              ripple_timer = 99;
          },
        },
      },
    });

    core_input_mouse['down-x'] = canvas_x;
    core_input_mouse['down-y'] = canvas_y;
}

var ripples = [];
var ripple_interval = 23;
var ripple_timer = 99;
