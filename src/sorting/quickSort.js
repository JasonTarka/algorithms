'use strict';

module.exports = function quickSort( arr, low, high ) {
	group( () => `quickSort( [${arr.slice( low, high + 1 )}] )` );
	if( low < high ) {
		let partitionIndex = quickPartition( arr, low, high );
		quickSort( arr, low, partitionIndex - 1 );
		quickSort( arr, partitionIndex + 1, high );
	}
	console.groupEnd();
};

function quickPartition( arr, low, high ) {
	group( () => `partition( [${arr.slice( low, high + 1 )}] )` );
	let pivot = arr[high];
	let smaller = low - 1;

	log( 'pivot:', pivot );

	for( let i = low; i < high; i++ ) {
		// If current is smaller than pivot
		if( arr[i] <= pivot ) {
			// Increment our search index
			smaller++;
			// Swap the elements
			log( `Swapping ${arr[smaller]} and ${arr[i]}` );
			arr.swap( smaller, i );
		}
	}
	arr.swap( smaller + 1, high );
	log( 'Ended with:', () => arr.slice( low, high + 1 ) );
	groupEnd();
	return smaller + 1;
}