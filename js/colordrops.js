'use strict';

function draw_logic(){
    // Draw ripples.
    for(var entity in core_entities){
        canvas_buffer.fillStyle = core_entities[entity]['color'];
        canvas_buffer.fillRect(
          core_entities[entity]['x'] - core_entities[entity]['width'],
          core_entities[entity]['y'] - core_entities[entity]['width'],
          core_entities[entity]['width'] * 2,
          core_entities[entity]['width'] * 2
        );
    }
}

function logic(){
    ripple_timer += 1;
    if(ripple_timer >= core_storage_data['frame-ms']){
        ripple_timer = 0;

        // Create new ripple.
        core_entity_create({
          'properties': {
            'color': '#' + core_random_hex(),
            'width': 0,
            'x': core_mouse['down-x'],
            'y': core_mouse['down-y'],
          },
        });
    }

    for(var entity in core_entities){
        // Increase size of ripple.
        core_entities[entity]['width'] += 1;

        if(core_entities[entity]['width'] > canvas_x){
            core_entity_remove({
              'entities': [
                entity,
              ],
            });
        }
    }

    core_ui_update({
      'ids': {
        'ripples': core_entity_count,
      },
    });
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
      'ui': '<input id=ui-ripples>Ripples',
    });
    canvas_init();
}

var ripple_timer = 99;
