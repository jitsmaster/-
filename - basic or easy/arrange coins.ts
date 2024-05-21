
/**
 * You have n coins and you want to build a staircase with these coins.
 * The staircase consists of k rows where the ith row has exactly i coins.
 * The last row of the staircase may be incomplete.
 * 
 * Given the integer n, return the number of complete rows of the staircase you will build.
 * 
 * @param n 
 * @returns 
 */
function arrangeCoins(n: number): number {
	//Complexity:
	//Time: O(sqrt(n)) - as we increase the row count, there are fewer coins to add to the next row, 
	//this makes it sqrt(n), since the natural sum formula is n*(n+1)/2, reverst it to get close to n = sqrt(2*sum)
	//Space: O(1) - constant space, we are not using any extra space
	let row = 1

	//Analysis:
	//The problem is to find the number of complete rows of the staircase
	//we can use a while loop to find the number of complete rows
	//the number of coins in each row is the row number
	//we subtract the number of coins in each row from n
	//if n is greater than or equal to the number of coins in the row, we increment the row number
	//and subtract the number of coins in the row from n
	//we continue this process until n is less than the number of coins in the row
	//then we return the row number - 1

	//This approach is much faster then the binary search approach, which is O(log n)
	while (n >= row) {
		n -= row
		row++
	}
	return row - 1
}