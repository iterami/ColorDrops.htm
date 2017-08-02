'use strict';

function draw_logic(){
    // Draw ripples.
    core_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': function(entity){
          var width = core_entities[entity]['width'] * 2;
          canvas_buffer.fillStyle = core_entities[entity]['color'];
          canvas_buffer.fillRect(
            core_entities[entity]['x'] - core_entities[entity]['width'],
            core_entities[entity]['y'] - core_entities[entity]['width'],
            width,
            width
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
          core_entities[entity]['width'] += 1;

          if(core_entities[entity]['width'] > canvas_x){
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
        'ripple-timer-max': 25,
      },
      'storage-menu': '<table><tr><td><input id=ripple-timer-max><td>Ripple Timer Max</table>',
      'title': 'ColorDrops.htm',
      'ui': '<span id=ui-ripples></span> Ripples',
    });
    canvas_init();
}

var ripple_timer = 99;
