function areTheyEqual(array_a: number[], array_b: number[]) {
	//if the length is different, they are not equal
	if (array_a.length !== array_b.length) {
		return false;
	}

	//They are not necessary unique arrays, so we need to compare each element
	//if they are, just need to use a set
	let notEqual = false;
	for (let a of array_a) {
		const indexInB = array_b.indexOf(a);
		if (indexInB < 0) {
			notEqual = true;
			break;
		}

		//remove the element from array_b, so it's not counted again
		array_b.splice(indexInB, 1);
	}
	return !notEqual;
}