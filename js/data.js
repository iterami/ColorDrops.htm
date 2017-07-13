'use strict';

function load_data(id){
    core_entity_remove_all();

    core_mouse['down-x'] = canvas_x;
    core_mouse['down-y'] = canvas_y;
    ripple_timer = 99;
}
