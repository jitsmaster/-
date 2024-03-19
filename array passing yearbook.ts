
/**
 * The goal is to determine the number of students who have signed each student's yearbook. 
 * The function creates a new array called result with the same length as the input array, 
 * and initializes each element to 1. This is because each student will have at least one 
 * signature, which is their own.
 * 
 * The function then iterates through the input array using a for loop. For each student, 
 * it follows the chain of signatures until it reaches the original student. It counts the 
 * number of students in the chain and updates the corresponding element in the result 
 * array with the count. * 
 * @param arr 
 * @returns 
 */
function findSignatureCounts(arr: number[]) {
	//Complexity:
	//Time: O(n^2) where n is the length of the input array - Loop through the array twice, inner and outer
	//Space: O(n) where n is the length of the input array - Create a new array with the same length

	//first we create a new array with the same length as the input array and fill it with 1
	//this is because each student will have at least one signature
	const result = new Array(arr.length).fill(1);

	//then we iterate through the input array
	//for each student, we follow the chain of signatures until we reach the original student
	//we count the number of students in the chain
	//and we update the result array with the number of students in the chain
	for (let i = 0; i < arr.length; i++) {
		let j = arr[i] - 1;
		while (j !== i) {
			result[i]++;
			j = arr[j] - 1;
		}
	}
	return result;
}
