'use strict';

function draw_logic(){
    // Draw ripples.
    core_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': function(entity){
          canvas_setproperties({
            'properties': {
              'fillStyle': core_entities[entity]['color'],
            },
          });
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

          if(core_entities[entity]['height'] > canvas_properties['height-half']
            || core_entities[entity]['width'] > canvas_properties['width-half']){
              core_entity_remove({
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
          'onclick': function(){
              canvas_setmode({
                'newgame': true,
              });
          },
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
      },
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
