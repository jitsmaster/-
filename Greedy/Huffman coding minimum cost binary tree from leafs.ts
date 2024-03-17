/**
 * This function calculates the minimum cost of a binary tree constructed from an array of leaf values.
 * @param arr An array of leaf values.
 * @returns The minimum cost of the binary tree.
 */
function mctFromLeafValues(arr: number[]): number {
    //Huffman coding is a greedy algorithm that constructs an optimal binary tree from a set of leaf values.
    //The cost of merging two leaf values is the product of the two values.
    //The cost of merging the leaf values is minimized by merging the smallest values first.
    //To implement the algorithm, we use a stack to store the leaf values.
    //We iterate through the array of leaf values and merge the top element of the stack with the current leaf value.
    //We continue merging until the top element of the stack is greater than the current leaf value.
    //After processing all the leaf values, we merge the remaining elements in the stack.
    //The minimum cost of the binary tree is the sum of the merged values.

    //Example: [6,2,4]
    //First leaf is 6, it's less than the base value of Infinity, so we push it to the stack
    //Stack: [Infinity, 6]
    //Second leaf is 2, it's less than the top element of the stack 6, so we push it to the stack
    //Stack: [Infinity, 6, 2]
    //Third leaf is 4, it's greater than the top element of the stack 2, so pop 2 out of stack
    //We merge 2 with min of current leaf 4 and previous top element 6, 2 * 6 = 12, that is the current result
    //which is also the root value of the binary tree between 6 and 2, and we push 4 to the stack
    //Stack: [Infinity, 6, 4]

    //at the very end, there are 3 elements left in the stack
    //we merge 4 with 6, 4 * 6 = 24, that is the current result

    //and at the result to 12, we get 36, which is the minimum cost of the binary tree


    
    //Complexity Analysis:
    //Time complexity: O(n + h) - We iterate through the array of leaf values once, and then iterate through the stack to merge the remaining elements.
    //Space complexity: O(n) - We use a stack to store the leaf values.

    // Initialize a stack with Infinity as the base value.
    const stack: number[] = [Infinity];
    // Initialize the result variable to store the minimum cost.
    let result = 0;

    // Iterate through each leaf value in the array.
    for (const leaf of arr) {
        // While the top of the stack is less than or equal to the current leaf value,
        // calculate the cost of merging the top element with the minimum of the current leaf value and the previous top element.
        while (stack[stack.length - 1] <= leaf) {
            const mid = stack.pop()!;
            //the cost is the top element times the minimum of 
            //the current leaf value and the previous top element.
            
            //this differ from Huffman coding slightly.
            //Huffman coding uses the sum of the two leaf values
            //Here we use the product of top element, 
            //and the minimum of the current leaf value 
            //and the element before the top element
            //reason: we are building a binary tree,
            //the product of the two leaf values will be the cost of the node
            //the node will have the top element as the left child
            //and the minimum of the current leaf value and the element before the top element as the right child
            result += mid * Math.min(stack[stack.length - 1], leaf);
        }
        // Push the current leaf value to the stack.
        stack.push(leaf);
    }

    // After processing all the leaf values, merge the remaining elements in the stack.
    while (stack.length > 2) {
        result += stack.pop()! * stack[stack.length - 1];
    }

    // Return the minimum cost of the binary tree.
    return result;
}