/**
 * Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. 
The same letter cell may not be used more than once.
 

Example 1:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
Example 2:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
Example 3:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
 

Constraints:

m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board and word consists of only lowercase and uppercase English letters.
 

Follow up: Could you use search pruning to make your solution faster with a larger board?
 */

function exist(board: string[][], word: string): boolean {
	//dfs backtracking with visited cache

	//this is just a single word, so easy to do
	//first need to locate the cells with starting letter, we will go from there

	//we can either update pointer or reduce the word, we will reduce the word for easy reading

	//Complexity:
	//Time: O(n*m*4^l) where n is number of rows, m is number of columns, l is length of word
	//Space: O(l) for recursion stack

	const firstChr = word[0]
	let hasWord = false;
	for (let r = 0; r < board.length; r++) {
		for (let c = 0; c < board[0].length; c++) {
			if (board[r][c] === firstChr) {
				if (dfs([r, c], word))
					return true;
			}
		}
	}

	return false


	function dfs(cell: [number, number], remain: string) {
		const [r, c] = cell;
		//out of range, or chars don't match, skip
		if (r < 0 || r > board.length - 1
			|| c < 0 || c > board[0].length - 1
			|| board[r][c] !== remain[0]) {
			return false;
		}

		//on last char, and it matches, we found the word, return true
		if (remain.length === 1 && board[r][c] === remain) {
			hasWord = true;
			return true;
		}

		const curChr = board[r][c]

		//mark visited
		board[r][c] = "~"

		const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]]
		const curRemainChr = remain[0]
		for (let [rp, cp] of dirs) {
			//reduce remain
			remain = remain.slice(1)
			if (dfs([r + rp, c + cp], remain))
				return true;
			//backtrack: reset remain
			remain = curRemainChr + remain
		}

		//backtrack: reset visited
		board[r][c] = curChr
	}
};