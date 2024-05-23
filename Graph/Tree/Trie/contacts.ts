
class Trie {
	//the descedants count, stors up front to save time
	count: number = 0;
	constructor(public char: string,
		public isWordEnd: boolean,
		public children: Map<string, Trie> = new Map<string, Trie>()) {
	}

	add(name: string) {
		let node: Trie = this;

		for (let i = 0; i < name.length; i++) {
			const isEnd = (i === name.length - 1);
			let newChild: Trie;
			if (!node.children.has(name[i])) {
				newChild = new Trie(name[i], isEnd)
				node.children.set(name[i], newChild)
			}
			else {
				newChild = node.children.get(name[i])!;
			}

			node = newChild;

			//for every char in the name, increase the count of descendant of the node pass through
			//this way we don't have to do any dfs to find the count of the whole words
			node.count++;
		}
	}

	/**
	 * This function can be used when count is not stored in the node
	 * It's dfs based, so much slower
	 * @returns 
	 */
	getWholeWords() {
		return this._dfsGetWordsCount(this);
	}

	private _dfsGetWordsCount(node: Trie) {
		let wholeWordsCount = 0;
		if (node.isWordEnd) {
			wholeWordsCount++;
		}

		const children = node.children;
		for (let c of children.values()) {
			wholeWordsCount += node._dfsGetWordsCount(c);
		}

		return wholeWordsCount;
	}

	getWordsCount() {
		return this._dfsGetWordsCount(this);
	}

	private _dfsGetAllWords(node: Trie, path: string, words: string[]) {
		if (node.isWordEnd) {
			words.push(path);
		}

		for (let c of node.children.values()) {
			node._dfsGetAllWords(c, path + c.char, words);
		}
	}

	getAllWords() {
		let words = [] as string[];
		this._dfsGetAllWords(this, "", words);
		return words;
	}

	printTree(path: string) {
		const list = [] as string[]
		this.dfs(this, path, list);
		return list;
	}

	private dfs(node: Trie, nodePath: string, list: string[]) {
		if (node.isWordEnd) {
			list.push(nodePath)
		}

		for (let c of node.children.values()) {
			this.dfs(c, nodePath + c.char, list);
		}
	}
}

/**
 * Start with search with Trie tree.
 * @param queries 
 * @returns 
 */
function findCountOfContactsStartsWith(queries: string[][]): number[] {

	const namesTree: Trie = new Trie("", false);
	const roots = namesTree.children;
	const output: number[] = [];

	for (let [instruction, name] of queries) {
		if (instruction === "add") {
			namesTree.add(name)
		}
		else if (instruction === "find") {
			let count = 0;
			// console.info(`root: ${namesTree.printTree("").join("\r\n")}`)
			output.push(getWordsCount(namesTree, name))
		}
	}

	function getWordsCount(node: Trie, str: string) {
		//locate the node chain that matches the search string
		//last node in the chain will have the count of the whole words
		while (!!str) {
			if (!node.children.has(str[0]))
				return 0; //whole string not finding the node, then cannot be found

			node = node.children.get(str[0])!
			str = str.slice(1)
		}

		// console.info(`start root found: ${path.join("")}`)

		//we have the code, get get all descendant has word end marked
		return node?.count || 0;

	}

	return output;
}

function findContactsStartsWith(queries: string[][]): string[] {

	const namesTree: Trie = new Trie("", false);
	const roots = namesTree.children;
	const output: string[] = [];

	for (let [instruction, name] of queries) {
		if (instruction === "add") {
			namesTree.add(name)
		}
		else if (instruction === "find") {
			let count = 0;
			// console.info(`root: ${namesTree.printTree("").join("\r\n")}`)
			output.push(...getWords(namesTree, name))
		}
	}

	function getWords(node: Trie, str: string): string[] {
		//locate the node chain that matches the search string
		//last node in the chain will have the count of the whole words
		while (!!str) {
			if (!node.children.has(str[0]))
				return []; //whole string not finding the node, then cannot be found

			node = node.children.get(str[0])!
			str = str.slice(1)
		}

		// console.info(`start root found: ${path.join("")}`)

		//we have the code, get get all descendant has word end marked
		return node?.getAllWords() || [];
	}

	return output;
}