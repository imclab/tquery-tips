//////////////////////////////////////////////////////////////////////////////////
//		Constructor							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('VirtualJoystick', function(opts){
	// handle arguments default value
	opts	= tQuery.extend(opts, {
		world	: tQuery.world
	});

	// your code goes here
	this._world	= world;
	
	this._joystick	= new VirtualJoystick({
		container	: document.body,
		mouseSupport	: true
	});
	
	this._state	= {
		right	: this._joystick.right(),
		up	: this._joystick.up(),
		left	: this._joystick.left(),
		down	: this._joystick.down(),
	};
	
	this._callback	= this._world.loop().hook(function(delta, now){
		if( this._joystick.right() !== this._state.right ){
			this._state.right	= this._joystick.right();
			this.dispatchEvent('change', 'right', this._state.right)
		}
		if( this._joystick.up() !== this._state.up ){
			this._state.up	= this._joystick.up();
			this.dispatchEvent('change', 'up', this._state.up)
		}
		if( this._joystick.left() !== this._state.left ){
			this._state.left	= this._joystick.left();
			this.dispatchEvent('change', 'left', this._state.left)
		}
		if( this._joystick.down() !== this._state.down ){
			this._state.down	= this._joystick.down();
			this.dispatchEvent('change', 'down', this._state.down)
		}
	}.bind(this));
});

/**
 * explicit destructor
 */
tQuery.VirtualJoystick.prototype.destroy	= function(){
	this._world.loop().unhook(this._callback)
	
	this._joystick.destroy()
};

tQuery.registerStatic('createVirtualJoystick', function(opts){
	return new tQuery.VirtualJoystick(opts)
});

// make it eventable
tQuery.MicroeventMixin(tQuery.VirtualJoystick.prototype)

//////////////////////////////////////////////////////////////////////////////////
//		getter								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.VirtualJoystick.prototype.joystick	= function(){
	return this._joystick;
};

tQuery.VirtualJoystick.prototype.right	= function(){
	return this._joystick.right();
};
tQuery.VirtualJoystick.prototype.up	= function(){
	return this._joystick.up();
};
tQuery.VirtualJoystick.prototype.left	= function(){
	return this._joystick.left();
};
tQuery.VirtualJoystick.prototype.down	= function(){
	return this._joystick.down();
};
