'use strict';

require( 'should' );
const { trees } = require( '../src' );
const testUtils = require( './testUtils' );

describe( 'Trees', () => {
	const list = testUtils.getRandomArray( 20 );
	const sorted = list.sorted();

	/** {BaseNode} */
	let base;

	describe( 'Binary tree', () => {
		beforeEach( () => {
			base = null;
			list.forEach(
				x => base
					? base.add( x )
					: base = new trees.binary.Node( x )
			);
		} );

		it( 'sorts', () => {
			base.values.should.deepEqual( sorted );
		} );

		it( 'prints', () => {
			let str = base.print();
			console.log(str);
			str.should.not.be.empty();
		} );

		it('is balanced', () => {
			console.log(base.print());
			base.isBalanced.should.be.true();
		});
	} );
} );
