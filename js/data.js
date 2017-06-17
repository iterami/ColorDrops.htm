'use strict';

function load_data(id){
    ripples.length = 0;

    core_mouse['down-x'] = canvas_x;
    core_mouse['down-y'] = canvas_y;
    ripple_timer = 99;
}
