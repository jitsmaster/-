function isMatch(str: string, regexPattern: string): boolean {
	let memo: Map<string, boolean> = new Map();

	//top down with memoization
	function dfs(strPos: number, patternPos: number): boolean {
		const key: string = strPos + '-' + patternPos;
		if (memo.has(key))
			return !!memo.get(key);

		if (patternPos >= regexPattern.length) {
			if (strPos >= str.length) return true;
			return false;
		}

		const match: boolean = strPos < str.length && (str[strPos] === regexPattern[patternPos] || regexPattern[patternPos] === '.');

		if (patternPos + 1 < regexPattern.length && regexPattern[patternPos + 1] === '*') {
			//most important part of figuring out the wildcard match
			//since it covers multiple items, we have to keep on search until the pattern is done
			memo.set(key, dfs(strPos, patternPos + 2) || (match && dfs(strPos + 1, patternPos)));
			return !!memo.get(key);
		}
		if (match) {
			memo.set(key, dfs(strPos + 1, patternPos + 1));
			return !!memo.get(key);
		}
		memo.set(key, false);
		return false;
	}
	return dfs(0, 0);
};

