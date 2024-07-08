'use strict';

function load_data(id){
    core_mouse['down-x'] = canvas_properties['width-half'];
    core_mouse['down-y'] = canvas_properties['height-half'];
}

function repo_drawlogic(){
    if(core_storage_data['type'] === 1){
        entity_group_modify({
          'groups': [
            'canvas',
          ],
          'todo': function(entity){
              canvas_setproperties({
                'fillStyle': entity_entities[entity]['color'],
              });
              canvas.fillRect(
                entity_entities[entity]['x'] - entity_entities[entity]['width'],
                entity_entities[entity]['y'] - entity_entities[entity]['height'],
                entity_entities[entity]['width'] * 2,
                entity_entities[entity]['height'] * 2
              );
              },
            });

        return;
    }

    entity_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': function(entity){
          canvas_draw_path({
            'properties': {
              'fillStyle': entity_entities[entity]['color'],
            },
            'style': 'fill',
            'vertices': [
              [
                'ellipse',
                entity_entities[entity]['x'],
                entity_entities[entity]['y'],
                entity_entities[entity]['width'],
                entity_entities[entity]['height'],
                0,
                0,
                Math.PI * 2,
              ],
            ],
          });
      },
    });
}

function repo_logic(){
    ripple_timer += 1;
    if(ripple_timer >= core_storage_data['ripple-timer-max']){
        ripple_timer = 0;

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
          entity_entities[entity]['height'] += core_storage_data['height-speed'];
          entity_entities[entity]['width'] += core_storage_data['width-speed'];

          if(entity_entities[entity]['height'] > Math.max(
              canvas_properties['height'],
              canvas_properties['width']
            )){
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
      'info': '<button id=restart type=button>Restart</button>',
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
        'type': 0,
        'width-speed': 1,
      },
      'storage-menu': '<table><tr><td><input class=mini id=height-speed step=any type=number><td>Height Speed'
        + '<tr><td><input class=mini id=ripple-timer-max min=1 step=any type=number><td>Ripple Timer Max'
        + '<tr><td><select id=type><option value=0>Ellipse<option value=1>Rectangle</select><td>Type'
        + '<tr><td><input class=mini id=width-speed step=any type=number><td>Width Speed</table>',
      'title': 'ColorDrops.htm',
    });
    canvas_init({
      'cursor': 'pointer',
    });
}
