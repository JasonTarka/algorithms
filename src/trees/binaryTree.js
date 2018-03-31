'use strict';

const BaseNode = require( './base' );

const indentation = '  ';

class Node extends BaseNode {

	constructor( value ) {
		super( value );

		/** @type {Node} */
		this.left = null;
		/** @type {Node} */
		this.right = null;
	}

	print( indent = '' ) {
		let left = this.left ? this.left.print( `${indent}|${indentation}` ) : '';
		let right = this.right ? this.right.print( `${indent} ${indentation}` ) : '';

		let str;
		if( left || right ) {
			str = `${this.value}\n`
				+ `${indent}|- ${left}\n`
				+ `${indent}\`- ${right}`;
		} else {
			str = this.value.toString();
		}
		return str;
	}

	get values() {
		return (this.left ? this.left.values : [])
			.concat(
				this.value,
				(this.right ? this.right.values : [])
			);
	}

	get height() {
		let left = this.left ? this.left.height : 0;
		let right = this.right ? this.right.height : 0;

		return Math.max( left, right ) + 1;
	}

	get heightDiff() {
		let left = getHeight( this.left );
		let right = getHeight( this.right );
		let diff = right - left;

		return diff;
	}

	get isBalanced() {
		let left = getHeight( this.left );
		let right = getHeight( this.right );

		return Math.abs( right - left ) <= 1;
	}

	/**
	 * @param {Number} value
	 */
	add( value ) {
		// Naive addition; no balancing
		if( value <= this.value ) {
			if( this.left ) {
				console.log( '----- adding to left -----' );
				this.left.add( value );
				if( !this.left.isBalanced ) {
					this.rebalance( this.left );
				}
			} else {
				this.left = new Node( value );
			}
		} else {
			if( this.right ) {
				console.log( '----- adding to right -----' );
				this.right.add( value );
				if( !this.right.isBalanced ) {
					this.rebalance( this.right );
				}
			} else {
				this.right = new Node(value);
			}
		}
	}

	// ----- Rotation -----
	rebalance( node ) {
		console.log( `rebalance( ${this.value}, ${node.value} )` );
		console.log( this.print() );
		let diff = node.heightDiff;
		let leftDiff = getHeightDiff( node.left );
		let rightDiff = getHeightDiff( node.right );
		console.log('Node diff:', diff, 'nodeLeftDiff:', leftDiff, 'nodeRightDiff:', rightDiff);

		if( diff <= -2 && leftDiff <= -1 ) {
			this.rotateRight( node );
		} else if( diff >= 2 && rightDiff >= 1 ) {
			this.rotateLeft( node );
		} else if( diff <= -2 && leftDiff >= 1 ) {
			this.rotateLeftRight( node );
		} else if( diff >= 2 && rightDiff <= -1 ) {
			this.rotateRightLeft( node );
		} else {
			console.log('No rebalance!');
		}
	}

	rotateLeft( node ) {
		console.log( `rotateLeft( ${node.value} )` );
		let right = node.right;
		node.right = right.left;
		right.left = node;

		if( node === this.left ) {
			this.left = right;
		} else {
			this.right = right;
		}
		console.log( this.print() );
	}

	rotateRight( node ) {
		console.log( `rotateRight( ${node.value} )` );
		let left = node.left;
		node.left = left.right;
		left.right = node;

		if( node === this.right ) {
			this.right = left;
		} else {
			this.left = left;
		}
		console.log( this.print() );
	}

	rotateRightLeft( node ) {
		console.log( `rotateRightLeft( ${node.value} )` );
		node.rotateRight( node.right );
		this.rotateLeft( node );
	}

	rotateLeftRight( node ) {
		console.log( `rotateLeftRight( ${node.value} )` );
		node.rotateLeft( node.left );
		this.rotateRight( node );
	}
}

/**
 * @param {Node} node
 * @returns {number}
 */
function getHeight( node ) {
	return node ? node.height : 0;
}

/**
 * @param {Node} node
 * @returns {number}
 */
function getHeightDiff( node ) {
	return node ? node.heightDiff : 0;
}

module.exports = {
	Node: Node
};
