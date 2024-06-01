/**Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas.
The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of
bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all
of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards
return.

Return the minimum integer k such that she can eat all the bananas within h hours.
*/
function minEatingSpeed(piles: number[], h: number): number {
	//Analysis:
	//This is a binary search problem. The search space is the range of possible speeds
	//from 1 to the maximum pile size. We can use binary search to find the minimum speed
	//that allows Koko to eat all the bananas within h hours.

	//Complexity:
	//Time: O(n * log(max(piles))) - binary search on the range of possible speeds
	//Space: O(1) - constant space with a few variables

	//this is the base case, if there is only 1 pile, we can just return the time needed to eat it
	//Important: for binary search, you do need a base case,
	//if the left and right needs to be calculated
	const timePerPile = h / piles.length;

	let l = Math.ceil(Math.min(...piles) / timePerPile);
	let r = Math.max(...piles);

	let minRate = r;

	while (l <= r) {
		const mid = Math.floor((r - l) / 2) + l; //don't use the  >> 1 trick here, since number could be quite big

		//calculate the time needed to eat all the piles, with this speed
		//which is the sum of all piles divided by the speed, ceil to round up
		let time = piles.reduce((acc, pile) => acc + Math.ceil(pile / mid), 0);

		if (time <= h) {
			//unlike classic binary search, we want to find the minimum speed
			//also, target is not a fixed value we have to match, we just need to be smaller or equal
			//so keep on moving to left side
			minRate = mid;
			r = mid - 1;
		} else {
			l = mid + 1;
		}
	}

	return minRate;
}