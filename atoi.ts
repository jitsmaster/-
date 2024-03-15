const MAX_INT = Math.pow(2, 31) - 1;
const MIN_INT = -Math.pow(2, 31);

function atoi(str: string): number {

	let result = 0;
	let isNegative = false;
	let i = 0;

	// Skip leading whitespace
	while (str[i] === ' ') {
		i++;
	}

	// Check for sign
	if (str[i] === '-' || str[i] === '+') {
		isNegative = str[i] === '-';
		i++;
	}

	// Convert digits to number
	while (i < str.length && str[i] >= '0' && str[i] <= '9') {
		const digit = parseInt(str[i]);

		// Check for overflow
		if (result > Math.floor(MAX_INT / 10) || (result === Math.floor(MAX_INT / 10) && digit > MAX_INT % 10)) {
			return !isNegative ? MAX_INT : MIN_INT;
		}

		result = result * 10 + digit;
		i++;
	}

	return result * (isNegative ? -1 : 1);
}

function atoiCheat(str: string) {
	let res = parseInt(str) || 0

	if (res < MIN_INT || res > MAX_INT) {
		return res < 0 ? MIN_INT : MAX_INT
	}

	return res
}
