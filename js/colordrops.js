'use strict';

function draw_logic(){
    // Draw ripples.
    core_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': function(entity){
          canvas_buffer.fillStyle = core_entities[entity]['color'];
          canvas_buffer.fillRect(
            core_entities[entity]['x'] - core_entities[entity]['width'],
            core_entities[entity]['y'] - core_entities[entity]['height'],
            core_entities[entity]['width'] * 2,
            core_entities[entity]['height'] * 2
          );
      },
    });
}

function logic(){
    ripple_timer += 1;
    if(ripple_timer >= core_storage_data['ripple-timer-max']){
        ripple_timer = 0;

        // Create new ripple.
        core_entity_create({
          'properties': {
            'color': '#' + core_random_hex(),
            'height': 0,
            'width': 0,
            'x': core_mouse['down-x'],
            'y': core_mouse['down-y'],
          },
        });
    }

    core_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': function(entity){
          // Increase size of ripple.
          core_entities[entity]['height'] += core_storage_data['height-speed'];
          core_entities[entity]['width'] += core_storage_data['width-speed'];

          if(core_entities[entity]['height'] > canvas_y
            || core_entities[entity]['width'] > canvas_x){
              core_entity_remove({
                'entities': [
                  entity,
                ],
              });
          }
      },
    });

    core_ui_update({
      'ids': {
        'ripples': core_entity_info['canvas']['count'],
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
      'storage': {
        'height-speed': 1,
        'ripple-timer-max': 25,
        'width-speed': 1,
      },
      'storage-menu': '<table><tr><td><input id=height-speed><td>Height Speed<tr><td><input id=ripple-timer-max><td>Ripple Timer Max<tr><td><input id=width-speed><td>Width Speed</table>',
      'title': 'ColorDrops.htm',
      'ui': '<span id=ui-ripples></span> Ripples',
    });
    canvas_init();
}

var ripple_timer = 99;
