'use strict';

module.exports = mergeSort;

function mergeSort( arr ) {
	group( `mergeSort( [ ${arr} ] )` );
	if( arr.length <= 1 ) {
		// Only one element, already sorted
		console.groupEnd();
		return arr;
	}

	let divider = Math.floor( arr.length / 2 );
	let a = mergeSort( arr.slice( 0, divider ) );
	let b = mergeSort( arr.slice( divider ) );

	let merged = merge( a, b, arr );
	groupEnd();
	return merged;
}

function merge( a, b, arr ) {
	let aIndex = 0;
	let bIndex = 0;
	let index = 0;
	while( aIndex < a.length ) {
		if( bIndex >= b.length ) {
			arr[index++] = a[aIndex];
			aIndex++;
		} else if( a[aIndex] < b[bIndex] ) {
			arr[index++] = a[aIndex];
			aIndex++;
		} else {
			arr[index++] = b[bIndex];
			bIndex++;
		}
	}

	for( ; bIndex < b.length; bIndex++ ) {
		arr[index++] = b[bIndex];
	}

	log( 'Merged array: ', arr );
	return arr;
}