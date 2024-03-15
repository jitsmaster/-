function reverseInteger(x: number): number {
	let reveresed = parseInt(x.toString().split('').reverse().join(''))

	if (reveresed > Math.pow(2, 31) - 1) {
		return 0
	}

	if (x < 0) reveresed = reveresed * -1

	return reveresed
}


function reverseIntegerWithPureNumber(x: number): number {
	let reversed = 0;
	let isNegative = false;

	if (x < 0) {
		isNegative = true;
		x = Math.abs(x);
	}

	while (x > 0) {
		reversed = (reversed * 10) + (x % 10);
		x = Math.floor(x / 10);
	}

	if (reversed > Math.pow(2, 31) - 1) {
		return 0; // Return 0 if the reversed number is outside the 32-bit range
	}

	if (isNegative) {
		reversed = -reversed;
	}

	return reversed;
};