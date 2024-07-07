
/**
 * This solution uses array of sets to store trie as adjacency list
 * Much faster than actual trie traversal
 */
class WordDictionary {
	//Instead of using trie, we can use array of sets to store the words
	//the index of the array is the length of the word - 1
	//this will make finding the word much faster
	wordsByLength!: Array<Set<string>>;

	constructor() {
		let length = 25

		while (length > 0) {
			this.wordsByLength.push(new Set<string>());
			length--
		}
	}

	addWord(word: string): void {
		this.wordsByLength[word.length - 1].add(word)
	}

	search(word: string): boolean {
		//Complexity:
		//Time: O(1) for exact match, O(n * m) for '.' match, where n is the number of words, and m is the length of word
		//Space: O(n) where n is the number of words, for storing the array of sets
		const words = this.wordsByLength[word.length - 1]

		//exact match is O(1), making it a much faster solution
		if (!word.includes('.'))
			return words.has(word)

		//if there is a '.' in the word, we need to check each word in the set
		for (const storedWord of words.values()) {
			let wordMatch = true

			//start from the end of the word
			for (let i = 0; i < word.length; i++) {
				const c = word[i];
				if (c !== '.' && c !== storedWord[i]) {
					wordMatch = false
					break;
				}
			}
			if (wordMatch)
				return true
		}
		return false
	}
}

/**
* Your WordDictionary object will be instantiated and called as such:
* var obj = new WordDictionary()
* obj.addWord(word)
* var param_2 = obj.search(word)
*/

class WordDictionarySlow {
	root: Node = new Node('', false)
	constructor() {
	}
	addWord(word: string): void {
		let node = this.root
		for (const char of word) {
			if (node.children.has(char)) {
				node = node.children.get(char)!
			} else {
				const newNode = new Node(char, false)
				node.children.set(char, newNode);
				node = newNode
			}
		}
		node.isEnd = true
	}

	search(word: string): boolean {
		//Complexity:
		//Time: O(n * m) where m is the length of the word, n is the number of words
		//Space: O(n) where n is the length of the word

		let node = this.root
		return dfs(word, node)


		function dfs(word: string, node: Node): boolean {
			if (word == '') return node.isEnd
			if (word[0] == '.') {
				let result = false;
				for (const key of node.children.keys()) {
					result ||= dfs(word.substring(1), node.children.get(key)!)
					if (result) {
						return result
					}
				}
				return result
			} else {
				if (node.children.get(word[0])) {
					return dfs(word.substring(1), node.children.get(word[0])!)
				} else {
					return false
				}
			}
		}
	}
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */

class Node {

	constructor(
		public char: string,
		public isEnd: boolean) { }

	/**
	 * Use map for children for O(1) lookup */

	children: Map<string, Node> = new Map()

	setChild(node: Node) {
		this.children.set(node.char, node);
	}
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */