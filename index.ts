//test number of provinces, with disjointed set
// 	}

import { minInterval } from "./intervals/Minimum Interval to Include Each Query"






const input = [[2, 3], [2, 5], [1, 8], [20, 25]]
const queries = [2, 19, 5, 22]

const expected = [2, -1, 4, 6]

const output = minInterval(input, queries)

if (expected.join(",") === output.join(",")) {
	console.log("Test Passed")
} else {
	console.log(`Test Failed: [${output.join(", ")}] != [${expected.join(", ")}]`)
}

// dict.addWord("bad")
// dict.addWord("dad")
// dict.addWord("mad")
// console.log(dict.search("pad")) //false
// console.log(dict.search("bad")) //true
// console.log(dict.search(".ad")) //true
// console.log(dict.search("b..")) //true
