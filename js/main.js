'use strict';

function repo_drawlogic(){
    // Draw ripples.
    entity_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': function(entity){
          canvas_setproperties({
            'properties': {
              'fillStyle': entity_entities[entity]['color'],
            },
          });
          canvas_buffer.fillRect(
            entity_entities[entity]['x'] - entity_entities[entity]['width'],
            entity_entities[entity]['y'] - entity_entities[entity]['height'],
            entity_entities[entity]['width'] * 2,
            entity_entities[entity]['height'] * 2
          );
      },
    });
}

function repo_logic(){
    ripple_timer += 1;
    if(ripple_timer >= core_storage_data['ripple-timer-max']){
        ripple_timer = 0;

        // Create new ripple.
        entity_create({
          'properties': {
            'color': '#' + core_random_hex(),
            'height': 0,
            'width': 0,
            'x': core_mouse['down-x'],
            'y': core_mouse['down-y'],
          },
        });
    }

    entity_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': function(entity){
          // Increase size of ripple.
          entity_entities[entity]['height'] += core_storage_data['height-speed'];
          entity_entities[entity]['width'] += core_storage_data['width-speed'];

          if(entity_entities[entity]['height'] > canvas_properties['height-half']
            || entity_entities[entity]['width'] > canvas_properties['width-half']){
              entity_remove({
                'entities': [
                  entity,
                ],
              });
          }
      },
    });
}

function repo_init(){
    core_repo_init({
      'events': {
        'restart': {
          'onclick': core_repo_reset,
        },
      },
      'globals': {
        'ripple_timer': 0,
      },
      'info': '<input id=restart type=button value=Restart>',
      'mousebinds': {
        'mousedown': {
          'todo': function(){
              ripple_timer = 99;
          },
        },
        'mousemove': {
          'todo': function(){
              if(core_mouse['down-0']){
                  core_mouse['down-x'] = core_mouse['x'];
                  core_mouse['down-y'] = core_mouse['y'];

                  ripple_timer = 99;
              }
          },
        },
      },
      'reset': canvas_setmode,
      'storage': {
        'height-speed': 1,
        'ripple-timer-max': 25,
        'width-speed': 1,
      },
      'storage-menu': '<table><tr><td><input id=height-speed><td>Height Speed'
        + '<tr><td><input id=ripple-timer-max><td>Ripple Timer Max'
        + '<tr><td><input id=width-speed><td>Width Speed</table>',
      'title': 'ColorDrops.htm',
    });
    canvas_init();
}
