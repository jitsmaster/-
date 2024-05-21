/**
 * Given an integer array nums, return the length of the longest strictly increasing subsequence.
 */
function lengthOfLIS(nums: number[]): number {
	//we will use the patient sort algorithm to solve this problem
	//which is O(n log n) time complexity, instead of the O(n^2) time complexity for using DP
	//patient sort is a card game where we have to sort the cards in increasing order
	//the rules are:
	//1. We can only see the top card of each pile
	//2. We can only move the card to a pile where the card is smaller than the top card
	//3. If there is no such pile, we start a new pile
	//4. The goal is to minimize the number of piles
	//5. The number of piles is the length of the longest increasing subsequence
	//6. The smallest number in each pile is the member of the pile
	//7. The piles are sorted in increasing order
	//8. Last rule, priority is given to the leftmost pile

	//a great video on it: https://youtu.be/22s1xxRvy28

	//create an array to store the piles, the member of each pile is the smallest number in the pile
	const piles: number[] = [];
	//iterate through the numbers
	for (const num of nums) {
		//find the index of the number in the piles array
		//using binary search, this is (log n) part of the algorithm
		let left = 0, right = piles.length;
		while (left < right) {
			const mid = Math.floor((right + left) / 2);
			//if the number is less than the number at the index, then update the right pointer
			if (piles[mid] < num) {
				left = mid + 1;
			} else {
				right = mid;
			}
		}
		//if the index is equal to the length of the piles array, then push the number to the piles array
		//this means that the number is greater than all the numbers in the piles array
		//based on patient sort algorithm, we can start a new pile
		if (left === piles.length) {
			piles.push(num);
		} else {
			//otherwise, update the number at the index to the current number
			//this is equals to adding a card at the end of pile, in the patient card game.
			piles[left] = num;
		}
	}

	//return the length of the piles array
	return piles.length;
}