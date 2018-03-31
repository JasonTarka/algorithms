'use strict';

require( 'should' );
const { sorting } = require( '../src' );
const testUtils = require( './testUtils' );

describe( 'Sorting', () => {
	const numElements = 10;

	const list = testUtils.getRandomArray( numElements );
	const expected = list.sorted();

	let arr;
	beforeEach( () => arr = list.slice( 0 ) );

	[
		{
			name: 'Quick Sort',
			test: () => sorting.quickSort( arr, 0, arr.length - 1 )
		},
		{
			name: 'Merge Sort',
			test: () => sorting.mergeSort( arr )
		}
	].forEach( data => it( data.name, () => {
		data.test();
		arr.should.deepEqual( expected );
	} ) );
} );