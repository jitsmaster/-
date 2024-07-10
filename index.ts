//test number of provinces, with disjointed set
// 	}

import { combinationSum } from "./backtracking/Combination Sum"

const input = [2, 3, 6, 7]
const tgt = 7

const expected = [[2, 2, 3], [7]]

const output = combinationSum(input, tgt)

if (JSON.stringify(output) === JSON.stringify(expected)) {
	console.log("Test Passed")
} else {
	console.log(`Test Failed: ${JSON.stringify(output)} != ${JSON.stringify(expected)}`)
}

// dict.addWord("bad")
// dict.addWord("dad")
// dict.addWord("mad")
// console.log(dict.search("pad")) //false
// console.log(dict.search("bad")) //true
// console.log(dict.search(".ad")) //true
// console.log(dict.search("b..")) //true
