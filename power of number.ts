function myPow(base: number, exponent: number): number {
	//binary search
	//if exponent is even, myPow(base, exponent) = myPow(base, exponent/2) * myPow(base, exponent/2)
	//if exponent is odd, myPow(base, exponent) = myPow(base, exponent/2) * myPow(base, exponent/2) * base
	//if exponent is negative, myPow(base, exponent) = 1 / myPow(base, -exponent)
	//base case: if exponent is 0, return 1
	//time complexity is O(log n), where n is the exponent
	//space complexity is O(log n), where n is the exponent
	if (exponent === 0) {
		return 1;
	}

	if (exponent < 0) {
		return 1 / myPow(base, -exponent);
	}

	const halfPower = myPow(base, Math.floor(exponent / 2));
	return (exponent % 2 === 1) ? halfPower * halfPower * base : halfPower * halfPower;
}
