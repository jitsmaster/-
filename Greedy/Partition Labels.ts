/**
 * You are given a string s. We want to partition the string into as many parts as possible so that each letter
 * appears in at most one part.
 * 
 * Note that the partition is done so that after concatenating all the parts in order, the resultant string should
 * be s.
 * 
 * Return a list of integers representing the size of these parts.
 * 
 * Example 1:
 * 
 * Input: s = "ababcbacadefegdehijhklij"
 * Output: [9,7,8]
 * Explanation:
 * The partition is "ababcbaca", "defegde", "hijhklij".
 * This is a partition so that each letter appears in at most one part.
 * A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.
 * 
 * Example 2:
 * 
 * Input: s = "eccbbbbdec"
 * Output: [10]
 * 
 * Constraints:
 * 
 * 1 <= s.length <= 500
 * s consists of lowercase English letters.
 */
function partitionLabels(s: string): number[] {
	//Analysis:
	//This is a problem that can be solved by greedy algorithm.
	//Since each letter only appears in one partition, the only thing matters is the last index of each letter.
	//We can create a hash map to store the last index of each letter.
	//Then we go through the string from beginning, and keep track of the last index of each letter, max value of it.
	//If we reach the last index of a letter, we know that we can partition the string here.

	//first, create a hash map to store the last index of each character
	const lastIndexes = new Map<string, number>();
	for (let i = 0; i < s.length; i++) {
		lastIndexes.set(s[i], i);
	}

	//now we just go through the string from beginning
	const sizes = [];
	let curSize = 0;
	let end = -1;
	for (let i = 0; i < s.length; i++) {
		const letter = s[i];
		curSize++;
		end = Math.max(lastIndexes.get(letter)!, end);

		if (end === i) { //no need to check if it reached the end (i === s.length - 1), sicne we know if the last letter is part of alphabet, it will be there.
			//reach the end, push into collection and start over
			sizes.push(curSize);
			curSize = 0;
			end = -1;
		}
	}

	return sizes;
};
