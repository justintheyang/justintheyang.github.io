// Contains the Player component. May need to change the initial position and the end position once info is added

Crafty.c('Player', {
    init: function() {
        this.requires('2D, DOM, Color, Keyboard, Collision')
            .attr({x: gs.unit_size*(gv.player.x + 5.11),
                   y: gs.unit_size*(gv.player.y + 0.45),
                   w: gs.unit_size * 0.95,
                   h: gs.unit_size * 0.95,
                   z: 15})
            .setName('player')
            .color('red') //#fa8072

            // check if we are able to move bases and stations
            .checkHits('Collision') // only player, station, and base have Collision component
            .bind('HitOn', function(hitData) {
                if (gv.current_capacity != 0) {
                    gv.player.can_move_base = false;
                    gv.player.can_move_station = false;
                    gv.player.avaliable_station_num = -1;
                } else if (hitData[0].obj.getName() == 'base') {
                    gv.player.can_move_base = true;
                    gv.player.can_move_station = false;
                    gv.player.avaliable_station_num = -1;
                } else if (hitData[0].obj.getName().slice(0,-1) == 'station') {
                    gv.player.can_move_station = true;
                    gv.player.can_move_base = false;
                    gv.player.avaliable_station_num = hitData[0].obj.getName().slice(-1);
                }
            })
            .bind('HitOff', function() {
                gv.player.can_move_base = false;
                gv.player.can_move_station = false;
                gv.player.avaliable_station_num = -1;
            })

            // define player movement
            .bind('KeyDown', function(e){
                if (e.key == Crafty.keys.LEFT_ARROW && gv.player.x > 0) {
                    this.x -= gs.unit_size;
                    gv.player.x -= 1;
                    if (gv.move_station == true) {
                        gv.stations[gv.selected_station_num].e.x -= gs.unit_size;
                        gv.stations[gv.selected_station_num].x -= 1;
                        gv.steps_taken += gs.move_station_cost;

                    } else if (gv.move_base == true) {
                        Crafty('Base').x -= gs.unit_size;
                        gv.base.x -= 1;
                        gv.steps_taken += gs.move_base_cost;
                    } else {
                        gv.steps_taken += 1
                    }
                } else if (e.key == Crafty.keys.RIGHT_ARROW && gv.player.x < gs.num_columns - 1) {
                    this.x += gs.unit_size;
                    gv.player.x += 1;
                    if (gv.move_station == true) {
                        gv.stations[gv.selected_station_num].e.x += gs.unit_size;
                        gv.stations[gv.selected_station_num].x += 1;
                        gv.steps_taken += gs.move_station_cost;

                    } else if (gv.move_base == true) {
                        Crafty('Base').x += gs.unit_size;
                        gv.base.x += 1;
                        gv.steps_taken += gs.move_base_cost;
                    } else {
                        gv.steps_taken += 1
                    }
                } else if (e.key == Crafty.keys.UP_ARROW && gv.player.y > 0) {
                    this.y -= gs.unit_size * 1.03;
                    gv.player.y -= 1;
                    if (gv.move_station == true) {
                        gv.stations[gv.selected_station_num].e.y -= gs.unit_size * 1.03;
                        gv.stations[gv.selected_station_num].x -= 1;
                        gv.steps_taken += gs.move_station_cost;

                    } else if (gv.move_base == true) {
                        Crafty('Base').y -= gs.unit_size * 1.03;
                        gv.base.x -= 1;
                        gv.steps_taken += gs.move_base_cost;
                    } else {
                        gv.steps_taken += 1
                    }
                } else if (e.key == Crafty.keys.DOWN_ARROW && gv.player.y < gs.num_rows - 1) {
                    this.y += gs.unit_size * 1.03;
                    gv.player.y += 1;
                    if (gv.move_station == true) {
                        gv.stations[gv.selected_station_num].e.y += gs.unit_size * 1.03;
                        gv.stations[gv.selected_station_num].y += 1;
                        gv.steps_taken += gs.move_station_cost;

                    } else if (gv.move_base == true) {
                        Crafty('Base').y += gs.unit_size * 1.03;
                        gv.base.y += 1;
                        gv.steps_taken += gs.move_base_cost;
                    } else {
                        gv.steps_taken += 1
                    }
                }
            })

            // define other player actions (e.g., select station, collect, deposit)
            .bind('KeyDown', function(e) {
                // collect ingredients
                if (e.key == Crafty.keys.SPACE && this.hit('Station') != null && 
                    gv.current_capacity < gs.max_capacity && gv.move_station == false && gv.move_base == false) {
                    gv.ingredients_on_hand['station' + this.hit('Station')[0].obj.ind] += 1
                    gv.current_capacity += 1
                // deposit ingredients
                } else if (e.key == Crafty.keys.SPACE && this.hit('Base') != null && 
                           gv.move_station == false && gv.move_base == false) {
                    for (var i = 0; i < gs.num_stations; i++) {
                        gv.ingredients_in_base['station' + i] += gv.ingredients_on_hand['station' + i]
                        gv.ingredients_on_hand['station' + i] = 0
                    }
                    gv.current_capacity = 0
                // select/deselect station
                } else if (e.key == Crafty.keys.X && gv.player.can_move_station == true && gv.current_capacity == 0) {
                    gv.move_station = !gv.move_station
                    gv.selected_station_num = gv.player.avaliable_station_num
                } else if (e.key == Crafty.keys.X && gv.player.can_move_base == true && gv.current_capacity == 0) {
                    gv.move_base = !gv.move_base
                }                
            })
    }
})