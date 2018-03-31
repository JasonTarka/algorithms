'use strict';

class BaseNode {

	constructor( value ) {
		this._value = value;
	}

	get value() {
		return this._value;
	}

	get values() {
		throw new Error( 'Not implemented' );
	}

	/**
	 * Print the node, given a certain indent level
	 * @param {string} indent
	 */
	print( indent = '' ) {
		throw new Error( 'Not implemented' );
	}
}

module.exports = BaseNode;