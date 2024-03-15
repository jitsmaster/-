// This function calculates the size of the largest non-divisible subset of an array of numbers.
function nonDivisibleSubset(k: number, arr: number[]): number {
    //non divisible subset algorithm
    //Complexity analytis:
    //Time complexity: O(n) - we iterate through the array once to count the remainders
    //Space complexity: O(k) - we create an array of size k to store the remainders
    //where n is the length of the array and k is the number to check divisibility against

    // Create an array to store the remainders
    //we use the remainders to figure out what numbers are missing for subset with 2 elements
    const remainders: number[] = new Array(k).fill(0);

    // Count the remainders
    for (let i = 0; i < arr.length; i++) {
        const remainder = arr[i] % k;
        remainders[remainder]++;
    }

    // Initialize the count of non-divisible subset
    let count = Math.min(remainders[0], 1);

    // Iterate through the remainders
    for (let i = 1; i <= k / 2; i++) {
        // If the remainder is equal to k - remainder, it means that the number is divisible by k/2.
        // In this case, we can only include one number from this pair in the non-divisible subset.
        if (i === k - i) {
            count++;
        } else {
            // Otherwise, we choose the maximum count between the current remainder and its complement (k - remainder).
            // This ensures that we include the maximum number of non-divisible numbers in the subset.
            count += Math.max(remainders[i], remainders[k - i]);
        }
    }

    return count;
}

//dynamic programming solution, bottom up approach
function largestDivisibleSubsetDpWithBu(nums: number[]): number[] {
    // Sort the input array in ascending order
    nums.sort((a, b) => a - b);
    
    // Create a dynamic programming array to store the length of the largest divisible 
    // subset and the index of the previous element
    const dp: [number, number][] = new Array(nums.length).fill([0, -1]);
    
    // Iterate through the input array
    for(let i = 0; i < nums.length; i++) {
        // Iterate through the elements before the current element
        for(let j = 0; j < i; j++) {        
            // If the current element is divisible by the previous element and the length of the subset ending at the previous element is greater than the current maximum length
            if(nums[i] % nums[j] === 0 && dp[j][0] > max) {
                // Update the length of the subset ending at the current element and the index of the previous element
                dp[i] = [dp[j][0] + 1, j];   
            }
        }
    }
    
    let max = 0;
    let maxIndex = 0;
    
    // Find the maximum length of the subset
    for(let i = 0; i < dp.length; i++) {
        if(dp[i][0] > max) {
            max = dp[i][0];
            maxIndex = i;
        }
    }
    
    const result: number[] = [];
    let current = maxIndex;
    
    // Reconstruct the largest divisible subset by following the index of the previous element
    while(current !== -1) {
        result.push(nums[current]);
        current = dp[current][1];
    }
    
    return result;
};