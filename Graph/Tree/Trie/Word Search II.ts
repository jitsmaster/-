/**
 * Given an m x n board of characters and a list of strings words, return all words on the board.
 * 
 * Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or
 * vertically neighboring. The same letter cell may not be used more than once in a word.
 * 
 * Example 1:
 * 
 * Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]],
 *        words = ["oath","pea","eat","rain"]
 * Output: ["eat","oath"]
 * 
 * Example 2:
 * 
 * Input: board = [["a","b"],["c","d"]], words = ["abcb"]
 * Output: []
 * 
 * Constraints:
 * 
 * m == board.length
 * n == board[i].length
 * 1 <= m, n <= 12
 * board[i][j] is a lowercase English letter.
 * 1 <= words.length <= 3 * 104
 * 1 <= words[i].length <= 10
 * words[i] consists of lowercase English letters.
 * All the strings of words are unique.
 */



/**
 * Represents a node in a Trie data structure.
 */
class TrieNode {
	children: Map<string, TrieNode>;
	isWord: boolean;
	usageCount: number = 0;

	/**
	 * Initializes a new instance of the TrieNode class.
	 */
	constructor() {
		this.children = new Map();
		this.isWord = false;
	}

	/**
	 * Adds a word to the Trie.
	 * @param word - The word to be added.
	 */
	addWord(word: string): void {
		let node = this as TrieNode;
		node.usageCount++;

		for (let char of word) {
			if (!node.children.has(char)) {
				node.children.set(char, new TrieNode());
			}

			node = node.children.get(char)!;
			node.usageCount++;
		}

		node.isWord = true;
	}

	/**
	 * Removes a word from the Trie.
	 * Removing the nodes is quite expensive, instead, we decrease the character usage count
	 * So when usage count reaches 0, it will prevent further search in that direction.
	 * @param word - The word to be removed.
	 */
	removeWord(word: string): void {
		let node = this as TrieNode;
		node.usageCount--;

		for (let char of word) {
			if (!node.children.has(char)) {
				return;
			}

			node = node.children.get(char)!;
			node.usageCount--;
		}

		node.isWord = false;
	}
}

/**
 * Finds words in a given board using a Trie data structure.
 * 
 * @param board - The 2D array representing the board of characters.
 * @param words - An array of words to search for in the board.
 * @returns An array of words found in the board.
 */
function findWords(board: string[][], words: string[]): string[] {
	const trie = new TrieNode();

	//add the words to the trie first to search later
	for (const word of words) {
		trie.addWord(word);
	}

	const result: Set<string> = new Set();
	const visited: boolean[][] = Array.from({ length: board.length }, () => Array(board[0].length).fill(false));

	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {
			//start searching from each cell, with empty word to build upon
			dfs(i, j, trie, '');
		}
	}

	/**
	 * Performs a depth-first search to find words in the given board using the Trie data structure.
	 * 
	 * @param row - The current row index.
	 * @param col - The current column index.
	 * @param node - The current TrieNode.
	 * @param word - The current word formed by traversing the board.
	 */
	function dfs(row: number, col: number, node: TrieNode, word: string): void {
		//this is dfs with backtracking
		//step 1: break out of the recursion check 1: check if the row or col is out of bounds, or if the cell is already visited, or if the node in trie is no longer used in words
		if (row < 0 || row >= board.length || col < 0 || col >= board[0].length || visited[row][col] || node.usageCount < 0) {
			return;
		}

		const char = board[row][col];
		//step 1: break out of the recursion check 2: check if the current character is not in the trie
		if (!node.children.has(char)) {
			return;
		}

		node = node.children.get(char)!;
		word += char;

		//check if the current word is a valid word already
		if (node.isWord) {
			result.add(word);
			//note: not breaking out, since one word searching could contain another word
			// return;
		}

		//mark the cell as visited
		visited[row][col] = true;

		//step 2: search in all 4 directions, dfs
		const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
		for (const [r, c] of dirs) {
			dfs(row + r, col + c, node, word);
		}

		//step 3: backtrack, if this direction didn't work out
		visited[row][col] = false;
	}

	return [...result]
}