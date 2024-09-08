//test number of provinces, with disjointed set
// 	}

import { isNStraightHand } from "./Greedy/Hand of Straights"






const input = [2, 1]

const expected = true

const output = isNStraightHand(input, 2)

if (output === expected) {
	console.log("Test Passed")
} else {
	console.log(`Test Failed`)
}

// dict.addWord("bad")
// dict.addWord("dad")
// dict.addWord("mad")
// console.log(dict.search("pad")) //false
// console.log(dict.search("bad")) //true
// console.log(dict.search(".ad")) //true
// console.log(dict.search("b..")) //true
