function convert(s: string, numRows: number): string {
	if (numRows === 1 || s.length <= numRows) {
		return s;
	}

	const result: string[] = [];
	const cycleLen = 2 * numRows - 2;

	for (let i = 0; i < numRows; i++) {
		for (let j = i; j < s.length; j += cycleLen) {
			result.push(s[j]);

			if (i !== 0 && i !== numRows - 1) {
				const zigzagIndex = j + cycleLen - 2 * i;
				if (zigzagIndex < s.length) {
					result.push(s[zigzagIndex]);
				}
			}
		}
	}

	return result.join('');
}
