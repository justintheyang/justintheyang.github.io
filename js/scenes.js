/** 
 * Scenes can be thought of as different screens in the experiment. We have the following scenes:
 *  - Instructions
 *  - Game
 *  - Ending
 * 
 *  
**/

function disable_buttons(timeout) {
    // disable buttons!
    var ents = Crafty('instr_button').get()
    ents[0].attr({x: gs.unit_size * (gs.num_columns - 39) / 2})
    ents[1].attr({x: gs.unit_size * (gs.num_columns - 39) / 2})
    setTimeout(function() {
        var ents = Crafty('instr_button').get()
        ents[0].attr({x: gs.unit_size * (gs.num_columns + 7) / 2})
        ents[1].attr({x: gs.unit_size * (gs.num_columns + 11) / 2})
    }, timeout);
}

// Instructions will take form as a demo. 
Crafty.scene('Instructions', function() {
    // Background
    Crafty.background('#e6ecf2'); //#eef7e1
    Crafty.e('Menu')
    Crafty.e('MenuButton')
    gv.isInstr = true
    //#region Sidebars
    // create left and right sidebars
    this.left_sidebar = Crafty.e('2D, DOM, Color, Persist')
        .attr({x: 0,
               y: gs.crafty_height * 0.01,
               w: gs.unit_size * 4,
               h: gs.crafty_height * 0.97})
        .css({'border': '0.4945vh solid black',
              'border-radius': '1.111vh'})
        .color('#E7E0DE')
    this.left_sidebar_text0 = Crafty.e('2D, DOM, Color, Text, Persist')
        .attr({x: 0,
               y: 0,
               w: gs.unit_size * 4,
               z: 2})
        .textAlign('center').textFont({size: '2.5vh', weight: 'bold'})
        .css({'padding-top': '2.408vh', 'text-decoration': 'underline'})
        .unselectable()
        .text('Game info')


    this.left_sidebar_text1 = Crafty.e('2D, DOM, Color, Text, Persist')
        .attr({x: 0,
               y: gs.unit_size * 1.2,
               w: gs.unit_size * 4,
               z: 1})
        .dynamicTextGeneration(true)
        .textAlign('left').textFont({size: '1.984vh'})
        .css({'padding-left': '1.488vh'})
        .unselectable()
        .text(function () {
            var ingredients_on_hand_txt = ''
            var ingredients_in_base_txt = ''
            for (var i = 0; i < gs.num_stations; i++) {
                ingredients_on_hand_txt += 'Station ' + i + ': ' + gv.ingredients_on_hand['station' + i] + '<br>'
                ingredients_in_base_txt += 'Station ' + i + ': ' + gv.ingredients_in_base['station' + i] + '<br>'
            }        
            return "Items: " + gv.items_made + "<br>" +
                                  "Steps : " + gv.steps_taken + "<br>" +
                                  "Capacity: " + gv.current_capacity + "<br>" +
                                  "station_move: " + gv.move_station + "<br>" +
                                  "base_move: " + gv.move_base + "<br><br>" + 
                                  "<u>ingredients on hand</u>: <br><br style='line-height:0.4vh'/>" + ingredients_on_hand_txt +
                                  "<br><u>ingredients in base</u>: <br><br style='line-height:0.4vh'/>" + ingredients_in_base_txt} )
    this.left_sidebar.attach(this.left_sidebar_text0).attach(this.left_sidebar_text1)
    this.right_sidebar = Crafty.e('2D, DOM, Color, Persist')
        .attr({x: gs.unit_size * (gs.num_columns + 6), 
               y: gs.crafty_height * 0.01, 
               w: gs.unit_size * 4, 
               h: gs.crafty_height * 0.97})
        .css({'border': '0.4945vh solid black',
              'border-radius': '1.111vh'})
        .color('#E7E0DE')
    this.right_sidebar_text0 = Crafty.e('2D, DOM, Color, Text, Persist')
        .attr({x: gs.unit_size * (gs.num_columns + 6), 
               y: 0, 
               w: gs.unit_size * 4, 
               z: 2})
        .textAlign('center').textFont({size: '2.5vh', weight: 'bold'})
        .css({'padding-top': '2.408vh', 'text-decoration': 'underline'})
        .unselectable()
        .text('Recipes')
    for (var i = 0; i < gs.num_unique_items; i++) {
        gv.recipetxt += '<u><b>Item ' + i + '</b></u> &nbsp |&nbsp need ' + gs.items_to_win[i] + '<br><br style="line-height:0.556vh"/>'
        for (var j = 0; j < gs.num_stations; j++) {
            gv.recipetxt += 'Station ' + j + ': ' + gs.recipes['item' + i][j] + '<br>'
        }
        gv.recipetxt += '<br><br>'
    }
    this.right_sidebar_text1 = Crafty.e('2D, DOM, Color, Text, Persist')
        .attr({x: gs.unit_size * (gs.num_columns + 6), 
               y: gs.unit_size * 1.2, 
               w: gs.unit_size * 4, 
               z: 2})
        .textAlign('left').textFont({size: '1.984vh'})
        .css({'padding-left': '1.488vh'})
        .unselectable()
        .text(gv.recipetxt)
    this.right_sidebar.attach(this.right_sidebar_text0).attach(this.right_sidebar_text1)
    //#endregion

    // create instruction text area and buttons
    this.instruction_text = Crafty.e('2D, DOM, Color, Text, instruction_text')
        .attr({x: gs.unit_size * 5.5356, 
               y: gs.unit_size * (gs.num_rows - 1.75), 
               w: gs.unit_size * (gs.num_columns - 1.071), 
               z: 3})
        .dynamicTextGeneration(true)
        .unselectable()
        .css({'font-size': '2.381vh', 
              'font-family': 'Courier', 
              'color': 'black', 
              'text-align': 'center'})
        .text(gs.instr_texts[gv.instr_ind])
    this.instruction_button_left = Crafty.e('2D, DOM, Color, Mouse, Text, instr_button')
        .attr({x: (gs.unit_size * (gs.num_columns + 7.02)) / 2, 
               y: gs.unit_size * (gs.num_rows - 0.5), 
               w: gs.unit_size, 
               h: 7 * gs.unit_size / 16, 
               z: 4})
        .text('<').textFont({size: '1.984vh', weight: 'bold'})
        .setName('instr_button_left')
        .css({'cursor': 'pointer', 
              'border': '0.1984vh solid grey', 
              'border-radius': '0.794vh', 
              'text-align': 'center', 
              'padding-top': gs.unit_size * 0.006200626 + 'vh'})
        .bind('Click', function(){
            if (gv.instr_ind > 0) {
                gv.instr_ind -= 1
                Crafty('instruction_text').text(gs.instr_texts[gv.instr_ind])
            }
        })
    var disable_length = 300 
    this.instruction_button_right = Crafty.e('2D, DOM, Color, Mouse, Text, instr_button')
        .attr({x: (gs.unit_size * (gs.num_columns + 11.02)) / 2, 
               y: gs.unit_size * (gs.num_rows - 0.5), 
               w: gs.unit_size, 
               h: 7 * gs.unit_size / 16, z: 4})
        .text('>').textFont({size: '1.984vh', weight: 'bold'})
        .setName('instr_button_right')
        .css({'cursor': 'pointer', 
              'border': '0.1984vh solid grey',
              'border-radius': '0.794vh', 
              'text-align': 'center', 
              'padding-top': gs.unit_size * 0.006200626 + 'vh'})
        .bind('Click', function(){
            if (gv.instr_ind == 0) {
                gv.instr_ind += 1
                Crafty('instruction_text').text(gs.instr_texts[gv.instr_ind])
                Crafty('instruction_text').y = gs.unit_size * (gs.num_rows - 2.2)
            } else if (gv.instr_ind == 1) {
                gv.instr_ind += 1
                Crafty('instruction_text').text(gs.instr_texts[gv.instr_ind])
                Crafty('instruction_text').y = gs.unit_size * (gs.num_rows - 1.75)              
            } else if (gv.instr_ind == 2) {
                gv.instr_ind += 1
                Crafty('instruction_text').text(gs.instr_texts[gv.instr_ind])
                Crafty('instruction_text').y = gs.unit_size * (gs.num_rows - 7)
            } else if (gv.instr_ind == 3) {
                gv.instr_ind += 1
                Crafty('instruction_text').text(gs.instr_texts[gv.instr_ind])
                Crafty('instruction_text').y = gs.unit_size * (gs.num_rows - 1.5)
            } else if (gv.instr_ind == 4) {
                this.player = Crafty.e('Player')
                gv.instr_ind += 1
                Crafty('instruction_text').text(gs.instr_texts[gv.instr_ind])
                
                disable_buttons(disable_length)
            } else if (gv.instr_ind == 5) {
                gv.gen_modules(isInstr = true);
                gv.instr_ind += 1
                Crafty('instruction_text').text(gs.instr_texts[gv.instr_ind])
                Crafty('instruction_text').y = gs.unit_size * (gs.num_rows - 1.75)

                disable_buttons(disable_length)
            } else if (gv.instr_ind == 6) {
                // create base
                this.base = Crafty.e('Base').setName('base')

                gv.instr_ind += 1
                Crafty('instruction_text').text(gs.instr_texts[gv.instr_ind])
                Crafty('instruction_text').y = gs.unit_size * (gs.num_rows - 2.6)

                disable_buttons(disable_length)
            } else if (gv.instr_ind == 7) {
                gv.instr_ind += 1
                Crafty('instruction_text').text(gs.instr_texts[gv.instr_ind])
                Crafty('instruction_text').y = gs.unit_size * (gs.num_rows - 2.2)
                disable_buttons(disable_length * 2)
            } else if (gv.instr_ind == 8) {
                gv.instr_ind += 1
                Crafty('instruction_text').text(gs.instr_texts[gv.instr_ind])
                Crafty('instruction_text').y = gs.unit_size * (gs.num_rows - 1.75)
            } else if (gv.instr_ind == 9) {
                gv.instr_ind += 1
                Crafty('instruction_text').text(gs.instr_texts[gv.instr_ind])
                Crafty('instruction_text').y = gs.unit_size * (gs.num_rows - 2.2)
            } else if (gv.instr_ind == 10) {
                gv.instr_ind += 1
                Crafty('instruction_text').text(gs.instr_texts[gv.instr_ind])
                Crafty('instruction_text').y = gs.unit_size * (gs.num_rows - 2.6)
            } else if (gv.instr_ind == 11) {
                gv.instr_ind += 1
                Crafty('instruction_text').text(gs.instr_texts[gv.instr_ind])
                Crafty('instruction_text').y = gs.unit_size * (gs.num_rows - 1.75)
            } else if (gv.instr_ind == 12) {
                gv.instr_ind += 1
                Crafty('instruction_text').text(gs.instr_texts[gv.instr_ind])
                Crafty('instruction_text').y = gs.unit_size * (gs.num_rows - 1.75)
            } else if (gv.instr_ind == 13) {
                console.log('start game')
                Crafty.scene('Game')
            }
        })
    
    this.game_container = Crafty.e('2D, DOM, Color, Persist')
        .attr({x: gs.unit_size * 5, // 0.25 added for border
               y: gs.crafty_height * 0.01,
               w: gs.unit_size * gs.num_columns,
               h: gs.crafty_height * 0.97, // leave 0.01 for top padding, and 0.02 for top/bottom borders
               z: 2})
        .color('#eef7e1')
        .css({'border': '0.4945vh solid black',
              'border-radius': '0.4945vh'})
        .attach(this.instruction_text)
        .attach(this.instruction_button_left)
        .attach(this.instruction_button_right)


    // setTimeout(function() {eval("Crafty.scene('Game');");}, 20000);
});

Crafty.scene('Game', function() {
    gs = _.cloneDeep(gs_deep)
    gv = _.cloneDeep(gv_deep)
    gv.isInstr = false

    // create player
    this.player = Crafty.e('Player')
    // create base
    this.base = Crafty.e('Base').setName('base')
    // create stations
    gv.gen_modules(isInstr = false);
    // create menu
    Crafty.e('Menu')
    Crafty.e('MenuButton')
    
})

Crafty.scene('EndGame', function() {
    alert('you win! you took ' + gv.steps_taken + ' steps')
})

