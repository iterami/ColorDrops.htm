'use strict';

function create_ripple(){
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
                'fillStyle': entity['color'],
              });
              canvas.fillRect(
                entity['x'] - entity['width'],
                entity['y'] - entity['height'],
                entity['width'] * 2,
                entity['height'] * 2
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
              'fillStyle': entity['color'],
            },
            'style': 'fill',
            'vertices': [
              [
                'ellipse',
                entity['x'],
                entity['y'],
                entity['width'],
                entity['height'],
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
    if(core_storage_data['ripple-timer-max'] > 0){
        ripple_timer += 1;
        if(ripple_timer >= core_storage_data['ripple-timer-max']){
            ripple_timer = 0;

            create_ripple()
        }
    }

    entity_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': function(entity){
          entity['height'] += core_storage_data['height-speed'];
          entity['width'] += core_storage_data['width-speed'];

          if(entity['height'] > Math.max(
              canvas_properties['height'],
              canvas_properties['width']
            )){
              entity_remove({
                'entities': [
                  entity['id'],
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
          'onclick': canvas_setmode,
        },
      },
      'globals': {
        'ripple_timer': 0,
      },
      'info': '<button id=restart type=button>Restart</button>',
      'mousebinds': {
        'mousedown': {
          'todo': create_ripple,
        },
        'mousemove': {
          'todo': function(){
              if(core_mouse['down-0']){
                  core_mouse['down-x'] = core_mouse['x'];
                  core_mouse['down-y'] = core_mouse['y'];

                  create_ripple()
              }
          },
        },
      },
      'storage': {
        'height-speed': 1,
        'ripple-timer-max': 25,
        'type': 0,
        'width-speed': 1,
      },
      'storage-menu': '<table><tr><td><input class=mini id=height-speed step=any type=number><td>Height Speed'
        + '<tr><td><input class=mini id=ripple-timer-max min=0 step=any type=number><td>Ripple Timer Max'
        + '<tr><td><select id=type><option value=0>Ellipse<option value=1>Rectangle</select><td>Type'
        + '<tr><td><input class=mini id=width-speed step=any type=number><td>Width Speed</table>',
      'title': 'ColorDrops.htm',
    });
    canvas_init({
      'cursor': 'pointer',
    });
}
