/**
 * A jail has a number of prisoners and a number of treats to pass out to them. Their jailer decides the fairest way to 
 * divide the treats is to seat the prisoners around a circular table in sequentially numbered chairs. A chair number 
 * will be drawn from a hat. Beginning with the prisoner in that chair, one candy will be handed to each prisoner sequentially 
 * around the table until all have been distributed.
 * The jailer is playing a little joke, though. The last piece of candy looks like all the others, but it tastes awful. 
 * Determine the chair number occupied by the prisoner who will receive that candy.
 * @param n 
 * @param m 
 * @param s 
 */
function saveThePrisoner(n: number, m: number, s: number): number {
	//Analysis:
	//we can use modulo to find the remainder of the division
	//the remainder will be the chair number
	//if the remainder is 0, then the last chair will be the answer
	//if the remainder is not 0, then the remainder will be the answer

	//time complexity is O(1) - modulo operation
	//space complexity is O(1) - constant space
	const remainder = (m + s - 1) % n;
	return remainder === 0 ? n : remainder;

}