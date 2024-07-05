/**
 * A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys
 * in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.
 *
 * Implement the Trie class:
 *
 * Trie() Initializes the trie object.
 * void insert(String word) Inserts the string word into the trie.
 * boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
 * boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.
 *
 * Example 1:
 *
 * Input
 * ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
 * [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
 * Output
 * [null, null, true, false, true, null, true]
 *
 * Explanation
 * Trie trie = new Trie();
 * trie.insert("apple");
 * trie.search("apple");   // return True
 * trie.search("app");     // return False
 * trie.startsWith("app"); // return True
 * trie.insert("app");
 * trie.search("app");     // return True
 *
 * Constraints:
 * 1 <= word.length, prefix.length <= 2000
 * word and prefix consist only of lowercase English letters.
 * At most 3 * 104 calls in total will be made to insert, search, and startsWith.
 */
/**
 * Represents a Trie data structure.
 */

class Trie {
	rootNodes = new Map<string, Node>()
	constructor() {

	}

	insert(word: string): void {
		const chrs = word.split("")
		let parentNode: Node | undefined
		for (let i = 0; i < chrs.length; i++) {
			const chr = chrs[i]
			let node = i === 0 ?
				this.rootNodes.get(chr) : parentNode?.getChild(chr)
			if (!node) {
				node = new Node(chr, i === chrs.length - 1)

				if (i === 0)
					this.rootNodes.set(chr, node)
				else
					parentNode?.setChild(node)
			}

			parentNode = node;
		}
		parentNode!.isEnd = true;
	}

	search(word: string): boolean {
		const chrs = word.split("")
		let parentNode: Node | undefined
		while (chrs.length) {
			const chr = chrs.shift()!
			let node = !parentNode ? this.rootNodes.get(chr) : parentNode.getChild(chr)
			if (!node)
				return false;
			parentNode = node
		}

		return parentNode?.isEnd || false;
	}

	startsWith(prefix: string): boolean {
		const chrs = prefix.split("")
		let parentNode: Node | undefined
		while (chrs.length) {
			const chr = chrs.shift()!
			let node = !parentNode ? this.rootNodes.get(chr) : parentNode.getChild(chr)
			if (!node)
				return false;
			parentNode = node
		}

		return true;
	}
}

class Node {
	constructor(
		public char: string,
		public isEnd: boolean) { }

	/**
	 * Use map for children for O(1) lookup
	 */
	private children: Map<string, Node> = new Map()

	getChildren() {
		return this.children;
	}

	getChild(chr: string) {
		return this.children.get(chr);
	}

	setChild(node: Node) {
		this.children.set(node.char, node);
	}
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */