function wordBreak(s: string, wordDict: string[]): boolean {
	//turn wordDict into a set for faster lookup
	const wordSet = new Set(wordDict);

	//dynamic programming, topdown with memoisation
	const memo: Record<string, boolean> = {};

	function canBreak(s: string): boolean {
		if (s === '') {
			return true;
		}

		if (memo[s] !== undefined) {
			return memo[s];
		}

		for (let i = 1; i <= s.length; i++) {
			const prefix = s.substring(0, i);
			if (wordSet.has(prefix) && canBreak(s.substring(i))) {
				memo[s] = true;
				return true;
			}
		}

		memo[s] = false;
		return false;
	}

	return canBreak(s);
}

function workBreakBu(s: string, wordDict: string[]): boolean {
	//turn wordDict into a set for faster lookup
	const wordSet = new Set(wordDict);

	//dynamic programming, bottom up
	const dp = new Array(s.length + 1).fill(false);
	dp[0] = true;

	for (let i = 1; i <= s.length; i++) {
		for (let j = 0; j < i; j++) {
			if (dp[j] && wordSet.has(s.substring(j, i))) {
				dp[i] = true;
				break;
			}
		}
	}

	return dp[s.length];
}
