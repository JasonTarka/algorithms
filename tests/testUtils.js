'use strict';

module.exports = {
	getRandomArray: getRandomArray
};

function getRandomArray( length = 10, maxValue = 1000 ) {
	const list = new Array(length);
	for( let i = 0; i < length; i++ ) {
		list[i] = Math.floor( Math.random() * maxValue );
	}
	return list;
}