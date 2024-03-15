// An English text needs to be encrypted using the following encryption scheme.
// First, the spaces are removed from the text. Let  be the length of this text.
// Then, characters are written into a grid, whose rows and columns have the following constraints:

// Example


// After removing spaces, the string is  characters long.  is between  and , so it is written in the form of a grid with 7 rows and 8 columns.

// ifmanwas  
// meanttos          
// tayonthe  
// groundgo  
// dwouldha  
// vegivenu  
// sroots
// Ensure that 
// If multiple grids satisfy the above conditions, choose the one with the minimum area, i.e. .
// The encoded message is obtained by displaying the characters of each column, with a space between column texts. The encoded message for the grid above is:

// imtgdvs fearwer mayoogo anouuio ntnnlvt wttddes aohghn sseoau

// Create a function to encode a message.
function encryption(s: string): string {
	//remove space
	s = s.replace(/\s/g, '');

	//get the length of the string
	const n = s.length;

	//get the number of rows and columns
	const sqrt = Math.sqrt(n);
	let rows = Math.floor(sqrt);
	const cols = Math.ceil(sqrt);

	//ensure that rows * cols >= n
	//!Important: this is where the trick is. Otherwise this problem is trivial
	if (rows * cols < n) {
		rows++;
	}

	//now just need to tokenize the string into the grid
	//and pivot it
	let result = [] as string[][];
	for (let i = 0; i < n; i += cols) {
		result.push(s.slice(i, i + cols).split(''));
	}

	//pivot the grid
	const finalResult = Array(cols).fill('').map(() => Array(rows).fill(''));

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			finalResult[i][j] = result[j][i];
		}
	}

	return finalResult.map(row => row.join('')).join(' ');
}