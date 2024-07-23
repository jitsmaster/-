//test number of provinces, with disjointed set
// 	}

import { solveNQueens } from "./backtracking/nqueens"



const input = 4

const expected = [[".Q..", "...Q", "Q...", "..Q."], ["..Q.", "Q...", "...Q", ".Q.."]]

const output = solveNQueens(input)

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
