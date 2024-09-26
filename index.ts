//test number of provinces, with disjointed set
// 	}

import { alienDictionary } from "./bfs and dfs/topo sort/Alien Dictionary"




const input = ["abc", "bcd", "cde"]

const expected = "edabc"

const output = alienDictionary(input)

if (output === expected) {
	console.log("Test Passed")
} else {
	console.log(`Test Failed`)
} 
