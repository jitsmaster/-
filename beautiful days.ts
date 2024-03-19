//Find the days in the range that are beautiful, which is the diff between this number and its reverse 
//is divisible by the divisor
function beautifulDays(start: number, end: number, divisor: number): number {
	let count = 0;

	for (let day = start; day <= end; day++) {
		//this is a cheat for reverse. For pure number reversal, we can use "reverseIntegerWithPureNumber" function
		const reverse = parseInt(day.toString().split('').reverse().join(''));
		const diff = Math.abs(day - reverse);

		if (diff % divisor === 0) {
			count++;
		}
	}

	return count;
}
