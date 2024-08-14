//test number of provinces, with disjointed set
// 	}

import { minMeetingRooms } from "./intervals/Meeting Rooms II"





const input = [[0, 10], [10, 20], [20, 30], [30, 40], [40, 50], [50, 60], [60, 70], [70, 80], [80, 90], [90, 100], [0, 100], [10, 90], [20, 80], [30, 70], [40, 60]]

const expected = 2

const output = minMeetingRooms(input)

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
