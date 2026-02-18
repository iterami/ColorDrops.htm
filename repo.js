'use strict';

function create_ripple(){
    entity_create({
      'properties': {
        'color': '#' + core_random_hex(),
        'height': 0,
        'width': 0,
        'x': core_pointer.down_x,
        'y': core_pointer.down_y,
      },
    });
}

function draw_ellipse(entity){
    canvas_draw_path({
      'properties': {
        'fillStyle': entity.color,
      },
      'style': 'fill',
      'vertices': [
        [
          'ellipse',
          entity.x,
          entity.y,
          entity.width,
          entity.height,
          0,
          0,
          Math.PI * 2,
        ],
      ],
    });
}

function draw_rect(entity){
    canvas_setproperties({
      'fillStyle': entity.color,
    });
    canvas.fillRect(
      entity.x - entity.width,
      entity.y - entity.height,
      entity.width * 2,
      entity.height * 2
    );
}

function expand_drop(entity){
    entity.height += core_storage_data.height_speed;
    entity.width += core_storage_data.width_speed;

    if(entity.height > Math.max(
        canvas_properties.height,
        canvas_properties.width
      )){
        entity_remove({
          'entities': [
            entity.id,
          ],
        });
    }
}

function repo_drawlogic(){
    entity_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': core_storage_data.type === 1
        ? draw_rect
        : draw_ellipse,
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
      'info': '<button class=medium id=restart type=button>Restart</button>',
      'pointerbinds': {
        'pointerdown': {
          'todo': create_ripple,
        },
        'pointermove': {
          'todo': function(){
              if(core_pointer.down_0){
                  core_pointer.down_x = core_pointer.x;
                  core_pointer.down_y = core_pointer.y;

                  create_ripple();
              }
          },
        },
      },
      'storage': {
        'height_speed': 1,
        'ripple_timer_max': 25,
        'type': 0,
        'width_speed': 1,
      },
      'storage_menu': '<table><tr><td><input class=mini id=height_speed step=any type=number><td>Height Speed'
        + '<tr><td><input class=mini id=ripple_timer_max min=0 step=any type=number><td>Ripple Timer Max'
        + '<tr><td><select id=type><option value=0>Ellipse<option value=1>Rectangle</select><td>Type'
        + '<tr><td><input class=mini id=width_speed step=any type=number><td>Width Speed</table>',
      'title': 'ColorDrops.htm',
    });
    canvas_init({
      'cursor': 'pointer',
    });
}

function repo_load(id){
    core_pointer.down_x = canvas_properties.width_half;
    core_pointer.down_y = canvas_properties.height_half;
}

function repo_logic(){
    if(core_storage_data.ripple_timer_max > 0){
        ripple_timer += 1;
        if(ripple_timer >= core_storage_data.ripple_timer_max){
            ripple_timer = 0;

            create_ripple()
        }
    }

    entity_group_modify({
      'groups': [
        'canvas',
      ],
      'todo': expand_drop,
    });
}
