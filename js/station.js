// Contains the Station component.

Crafty.c('Station', {
    init: function() {
        this.requires('2D, DOM, Color, Collision')
        .attr({w: gs.unit_size*0.95,
               h: gs.unit_size*0.95,
               z: 4})
        .color('grey')
    },
    // let us initialize station location on instance call
    at: function(x, y, i) {
		this.attr({ x: (x + 5.11) * gs.unit_size, 
                    y: gs.unit_size * ( gv.player.y + 0.45 + 1.03 * (y - gv.player.y) ), // (y + 0.45)*gs.unit_size*1.03 
                    ind : i })
		return this;
	},
})

Crafty.c('StationText', {
    init: function() {
        this.requires('2D, DOM, Text')
        .attr({z: 5})
        .textFont({size: '20px'}).textAlign('center')
        .css({'padding-top': '1.5vh', 'color':'#f7f7f7'})
        // add font styling here!
    },
    // let us initialize station location on instance call
    at: function(x, y) {
		this.attr({ x: (x + 5.11) * gs.unit_size, 
                    y: gs.unit_size * (gv.player.y + 0.45 + 1.03 * (y - gv.player.y) ), 
                    w: gs.unit_size*0.95,
                    h: gs.unit_size*0.95,})
		return this;
	},

})

// e.g., station.attach( station_text.text(i) )