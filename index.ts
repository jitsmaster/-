//test number of provinces, with disjointed set
// 	}

import { findKthLargest } from "./heap and priority queue/kth-largest/Kth Largest Element in an Array - Quick Select"




const input = [3, 2, 1, 5, 6, 4]

const expected = 5

const output = findKthLargest(input, 2)

if (expected === output) {
	console.log("Test Passed")
} else {
	console.log(`Test Failed: ${output} != ${expected}`)
}

// dict.addWord("bad")
// dict.addWord("dad")
// dict.addWord("mad")
// console.log(dict.search("pad")) //false
// console.log(dict.search("bad")) //true
// console.log(dict.search(".ad")) //true
// console.log(dict.search("b..")) //true
