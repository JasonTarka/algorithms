'use strict';

Array.prototype.swap = function swap( indexA, indexB ) {
	let temp = this[indexA];
	this[indexA] = this[indexB];
	this[indexB] = temp;
};

Array.prototype.sorted = function sorted() {
	return this.slice( 0 ).sort( ( a, b ) => a - b );
};

function getArgs( args ) {
	Array.from( args )
		.map(
			x => typeof x === 'function'
				? x()
				: x
		);
}

global.log = function log() {
	if( global.DEBUG ) {
		console.log.apply( console, getArgs( arguments ) );
	}
};

global.group = function group() {
	if( global.DEBUG ) {
		console.log.group( console, getArgs( arguments ) );
	}
};

global.groupEnd = function group() {
	if( global.DEBUG ) {
		console.log.groupEnd( console, getArgs( arguments ) );
	}
};


