class TrieNode {
	constructor(
		public char: string,
		public isEnd: boolean,
		public children: Map<string, TrieNode> = new Map<string, TrieNode>()
	) { }

	addAndCheckIfHasPrefix(word: string) {
		let i = 0;
		let node: TrieNode = this;
		let path = "";
		for (let char of word) {
			// path += char
			if (!node.children.has(char)) {
				const newChild = new TrieNode(char, i === word.length - 1);
				node.children.set(char, newChild);
				node = newChild;
			}
			else {
				const child = node.children.get(char);

				//2 scenarios:
				//1. This word is a prefix of an existing word
				//2. This word has a prefix of an existing word
				let hasPrefix: boolean;
				let isPrefix: boolean;
				const isLastChar = i === word.length - 1;
				[hasPrefix, isPrefix] = [!!child?.isEnd, isLastChar];

				if (hasPrefix || isPrefix) {
					console.error(`word: ${word}`)
					return true;
				}

				node = child!;
			}
			i++;
		}

		return false;
	}

}

/**
 * There is a given list of strings where each string contains only lowercase letters from , inclusive.
 * The set of strings is said to be a GOOD SET if no string is a prefix of another string.
 * In this case, print GOOD SET. Otherwise, print BAD SET on the first line followed by the string being checked.
 * 
 * Note: If two strings are identical, they are prefixes of each other.
 * 
 * @param words 
 */
export function noPrefix(words: string[]): void {
	//Complexity:
	//Time: O(n * m) where n is the number of words and m is the length of the longest word - standard trie time complexity
	//Space: O(n * m) where n is the number of words and m is the length of the longest word - standard trie space complexity
	//use trie

	//note: no need to sort, since we are checking both if the word is another word's prefix and if another word is the word's prefix
	const root = new TrieNode("", false);

	//start pushing
	let isBad = false;
	for (let i = 0; i < words.length; i++) {
		const w = words[i];
		const hasPrefix = root.addAndCheckIfHasPrefix(w);
		if (hasPrefix) {
			console.info(`BAD SET`);
			console.info(w);
			isBad = true;
			break;
		}
	}

	if (!isBad) {
		console.info("GOOD SET")
	}
}