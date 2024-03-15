function rotationalCipher(input: string, rotationFactor: number) {
	let result = ""; // Initialize an empty string to store the encrypted result

	for (let i = 0; i < input.length; i++) {
		let char = input[i]; // Get the current character from the input string

		if (char.match(/[a-z]/i)) { // Check if the character is a letter (case-insensitive)
			let code = input.charCodeAt(i); // Get the ASCII code of the character
			let shift = 0; // Initialize the shift variable

			if (char.match(/[a-z]/)) { // Check if the character is a lowercase letter
				shift = rotate(code, 97, 26, rotationFactor); // Apply rotation to lowercase letters, 26 of them
			} else if (char.match(/[A-Z]/)) { // Check if the character is an uppercase letter
				shift = rotate(code, 65, 26, rotationFactor); // Apply rotation to uppercase letters, 26 of them
			}

			result += String.fromCharCode(shift); // Convert the shifted ASCII code back to a character and add it to the result
		} else if (char.match(/[0-9]/)) { // Check if the character is a digit
			const shift = rotate(parseInt(char), 0, 10, rotationFactor); // Apply rotation to digits, only 10 of them
			result += shift.toString(); // Add the shifted digit to the result
		} else {
			result += char; // Add non-alphanumeric characters as they are to the result
		}
	}

	return result; // Return the encrypted result
}

function rotate(code: number, baseCharCode: number, poolSize: number, rotationFactor: number): number {
	return (code - baseCharCode + rotationFactor) % poolSize // Apply the rotation and wrap around the pool, that is what the % operator is for
		+ baseCharCode;
}
