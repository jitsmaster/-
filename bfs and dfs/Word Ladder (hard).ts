/**
 *  transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words
 *  beginWord -> s1 -> s2 -> ... -> sk such that:
 *
 *  Every adjacent pair of words differs by a single letter.
 *  Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
 *  sk == endWord
 *
 *  Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest
 *  transformation sequence from beginWord to endWord, or 0 if no such sequence exists.
 *
 *  Example 1:
 *
 *  Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
 *  Output: 5
 *  Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.
 *
 *  Example 2:
 *
 *  Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
 *  Output: 0
 *  Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
 *
 *  Constraints:
 *
 *  1 <= beginWord.length <= 10
 *  endWord.length == beginWord.length
 *  1 <= wordList.length <= 5000
 *  wordList[i].length == beginWord.length
 *  beginWord, endWord, and wordList[i] consist of lowercase English letters.
 *  beginWord != endWord
 *  All the words in wordList are unique.
 */

/**
 * Finds the length of the shortest ladder between two words in a word list.
 * Uses the Breadth-First Search (BFS) algorithm to solve the problem.
 * 
 * @param beginWord - The starting word of the ladder.
 * @param endWord - The target word of the ladder.
 * @param wordList - The list of words to consider for the ladder.
 * @returns The length of the shortest ladder between `beginWord` and `endWord`. Returns 0 if no ladder is possible.
 * 
 * @remarks
 * This function assumes that all words in the `wordList` are of the same length.
 * 
 * @complexity
 * The time complexity of this function is O(n * m), where n is the number of words, m is the length of each word,
 * and h is the number of words in the shortest ladder. This is because we need to build the mask graph, which takes O(n * m) time,
 * and then perform BFS on the graph, which takes O(h) time. The space complexity is O(n * m) for the maskGraph map.
 */
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
	//Analysis:
	//1. This is a shortest path problem, so we can use BFS to solve it
	//2. We can build a graph map, key is one mask of the word, value is a list of words that could match this mark
	//3. Then we can use BFS to find the shortest path from beginWord to endWord
	//4. We can use a set to store visited words to prevent going back to the parent word, causing stackoverflow

	//Complexity:
	//Time complexity: O(n * m) where n is the number of words and m is the length of each word, since we need to build the mask graph, and then do BFS on the graph
	//Space complexity: O(n * m) for the maskGraph map, each word will have m masks, and each mask will have a list of words, that could potentially be all words

	if (wordList.indexOf(endWord) < 0)
		return 0;

	//first we need to build a graph of word right next to previous word, with one characters diff
	const maskGraph = new Map<string, string[]>();

	buildGraph();

	/**
	 * Generate masks for the word, with each char replaced by ?, and set the entry in the maskGraph
	 * @param word 
	 */
	function masking(word: string) {
		for (let i = 0; i < word.length; i++) {
			//replace each char with ? to create a mask
			//there will be word.length masks
			const mask = word.substring(0, i) + '?' + word.substring(i + 1);
			if (!maskGraph.has(mask)) {
				maskGraph.set(mask, [])
			}
			maskGraph.get(mask)!.push(word) //key is the mark, this mark will include a list of words that could match it with 1 char away
		}
	}

	/**
	 * Generate masks for the word, with each char replaced by ?, and return the masks
	 * @param word 
	 * @returns 
	 */
	function generateMasks(word: string) {
		const masks = [];
		for (let i = 0; i < word.length; i++) {
			//replace each char with ? to create a mask
			//there will be word.length masks
			const mask = word.substring(0, i) + '?' + word.substring(i + 1);
			masks.push(mask);
		}

		return masks;
	}

	//instead of checking each word for loop through the word to check if it's 1 char away
	//we can create masks with each char in the word, and then put this word into each masks map
	//e.g. hit -> ?it, h?t, hi?, then we can check if the next word is in any of these masks
	function buildGraph() {

		for (let w of wordList) {
			masking(w)
		}
	}

	const visited = new Set([beginWord]);
	//need to use bfs instead of dfs, since we want to get the min depth
	const queue = [beginWord];
	let minSteps = 1;     //at least 1 words needed
	let path = []
	return bfs();

	/**
	 * Using BFS to find the shortest path from beginWord to endWord
	 * @returns 
	 */
	function bfs() {
		let minSteps = 1;
		while (queue.length) {
			const l = queue.length;
			minSteps++;
			for (let i = 0; i < l; i++) {
				const word = queue.shift()!
				const masks = generateMasks(word);

				for (let m of masks) {
					if (!maskGraph.has(m))
						continue;

					const oneChrAwayWords = maskGraph.get(m);

					for (let c of oneChrAwayWords || []) {
						if (visited.has(c))
							continue; //prevent going back to the parent word, causing stackoverflow

						if (c === endWord) {
							return minSteps;
						}

						visited.add(c)
						queue.push(c);
					}
				}
			}
		}

		return 0;
	}

};

//note: this one is purely 2 rounds dfs, but didn't meet the time limit for leetcode
function ladderLengthPureDfs(beginWord: string, endWord: string, wordList: string[]): number {
	if (wordList.indexOf(endWord) < 0)
		return 0;

	//first we need to build a graph of word right next to previous word, with one characters diff
	const graph = new Map<string, string[]>();

	dfsBuildGraph(beginWord, new Set<string>([beginWord]));

	/**
	 * This is the slowest part, we are repeating the same work for every word
	 * @param w1 
	 * @param w2 
	 * @returns 
	 */
	function oneCharAway(w1: string, w2: string) {
		//figure out if these 2 strings are 1 character away
		//can use one pointer to count
		let diff = 0;
		for (let i = 0; i < w1.length; i++) {
			if (w1[i] !== w2[i]) {
				diff++
			}

			if (diff > 1)
				return false;
		}

		return diff === 1;
	}

	function dfsBuildGraph(parentWord: string, parentPaths: Set<string>) {
		if (!graph.has(parentWord)) {
			graph.set(parentWord, [])
		}

		for (let w of wordList) {
			if (!parentPaths.has(w) && oneCharAway(parentWord, w)) { //prevent stackoverflow, make sure the next word is not from previous path
				graph.get(parentWord)!.push(w)
				//recurse down to get children (1 char away words) for this word
				const newPaths = new Set([...parentPaths])
				newPaths.add(w)
				dfsBuildGraph(w, newPaths)
			}
		}
	}


	//then we do dfs until reaching the end, and figure out the shortest route
	let minSteps = Infinity;

	dfsReachEnd(beginWord, 0, new Set<string>());

	function dfsReachEnd(word: string, steps: number, parents: Set<string>) {
		if (!graph.has(word))
			return;

		steps++;
		const newParents = new Set([...parents]);
		newParents.add(word);

		if (word === endWord) {
			minSteps = Math.min(minSteps, steps);
			return;
		}

		const children = graph.get(word);

		for (let c of children || []) {
			if (parents.has(c))
				continue; //prevent going back to the parent word, causing stackoverflow

			dfsReachEnd(c, steps, newParents)
		}
	}

	return minSteps === Infinity ? 0 : minSteps;
};