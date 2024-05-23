import { findMedianWithHeaps } from "./2 heaps find median of sorted array";

/**
 * Median Stream or running median
 * You're given a list of n integers arr[0..(n-1)]. You must compute a list output[0..(n-1)] such that, 
 * for each index i (between 0 and n-1, inclusive), output[i] is equal to the median of the elements arr[0..i] 
 * (rounded down to the nearest integer).
 * The median of a list of integers is defined as follows. If the integers were to be sorted, then:
 * If there are an odd number of integers, then the median is equal to the middle integer in the sorted order.
 * Otherwise, if there are an even number of integers, then the median is equal to the average of the two middle-most integers in the 
 * sorted order.
 */
function findMedian(arr: number[]) {
	// Time Complexity: O(n * logn)
	// Space Complexity: O(n) - used to store the result array
	//flow: 1. iterate through the array, and for each element, get the median of the subarray from 0 to i

	//      2. store the median in the result array

	//use find median to get median of every subarray
	return arr.map((_, i) => Math.floor(findMedianWithHeaps(arr.slice(0, i + 1))));
}

