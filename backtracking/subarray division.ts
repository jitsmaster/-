//alternative puzzle for subarray division birthday problem
//this case the sub arrays are not contiguous
//so we backtrack
function birthdayNonContigous(s: number[], d: number, m: number): number {
	//Complexity Analysis:
	//Time: O(n!) - factorial of n, since we are generating all possible subarrays
	//Space: O(n) - the recursion stack will have at most n elements
	let count = 0;

	function recurse(remains: number[], sum: number, subArr: number[]): void {
		if (sum > d) {
			return;
		}

		if (subArr.length === m && sum === d) {
			const key = parseInt(subArr.join(''), 10);
			count++;

			return;
		}

		for (let i = 0; i < remains.length; i++) {
			//step 1: add the current number to the sub array
			//and add it to sum
			subArr.push(remains[i]);
			sum += remains[i];
			//step2: recurse to the remainings without current number
			recurse([...remains.slice(0, i), ...remains.slice(i + 1)], sum, subArr);
			//step3: failed, so backtrack
			subArr.pop();
			sum -= remains[i];
		}
	}

	recurse(s, 0, []);

	return count;

}