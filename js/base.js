// Contains the Base component.

Crafty.c('Base', {
    init: function() {
        this.requires('2D, DOM, Color, Collision')
            .attr({x: gs.unit_size*(gv.base.x + 5.11),
                   y: gs.unit_size*(gv.base.y + 0.45),
                   w: gs.unit_size * 0.95, 
                   h: gs.unit_size * 0.95, 
                   z: 4})
            .color('#9867C5')
            .setName('base')
            .checkHits('Player')
            .bind('HitOn', function() {
                if (gv.display_items == false) {
                    gv.display_items = true;
                    // Crafty('Menu').trigger('showMenu')
                    Crafty.e('MenuButton').trigger('showButton')
                }
            })
            .bind('HitOff', function() {
                if (gv.display_items == true) {
                    gv.display_items = false;
                    // Crafty('Menu').trigger('hideMenu')
                    Crafty('MenuButton').trigger('hideButton')
                    if (Crafty('MenuButton').clicked == true) {
                        Crafty('Menu').trigger('hideMenu')
                    }
                    setTimeout(function() {eval("Crafty('MenuButton').destroy();");}, 500);
                    // Crafty('Menu').tween({alpha: 0.0}, 500);
                    // Crafty('MenuItem').destroy();
                }
            })
    }
})