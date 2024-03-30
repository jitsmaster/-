function isMatch(s: string, p: string): boolean {
	let cache: Map<string, boolean> = new Map();

	//top down with memoization

	function dfs(ps, pp): boolean {
		const key: string = ps + '-' + pp;
		if (cache.has(key))
			return !!cache.get(key);

		if (pp >= p.length) {
			if (ps >= s.length) return true;
			return false;
		}

		const match: boolean = ps < s.length && (s[ps] === p[pp] || p[pp] === '.');

		if (pp + 1 < p.length && p[pp + 1] === '*') {
			//most important part of figuring out the wildcard match
			//since it covers multiple items, we have to keep on search until the pattern is done
			cache.set(key, dfs(ps, pp + 2) || (match && dfs(ps + 1, pp)));
			return !!cache.get(key);
		}
		if (match) {
			cache.set(key, dfs(ps + 1, pp + 1));
			return !!cache.get(key);
		}
		cache.set(key, false);
		return false;
	}
	return dfs(0, 0);
};

