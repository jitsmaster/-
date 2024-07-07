//test number of provinces, with disjointed set
// 	}

import { WordDictionary } from "./Graph/Tree/Trie/Word Dictionary";

const actions = ["addWord", "addWord", "addWord", "search", "search", "addWord", "search", "addWord", "search", "addWord", "addWord", "search", "addWord", "addWord", "search", "search", "addWord", "addWord", "search", "search", "search", "addWord", "search", "addWord", "addWord", "search", "addWord", "search", "addWord", "search", "search", "search", "addWord", "search", "addWord", "search", "search", "addWord", "search", "search", "search", "search", "addWord", "addWord", "search", "search", "search", "addWord", "addWord", "search", "addWord", "search", "addWord", "search", "search", "search", "addWord", "addWord", "addWord", "addWord", "search", "search"]
const values = [["xgvk"], ["wykzbvwdsoyfowqicymzd"], ["xajbtjyjuwgoynjgu"], ["wykzbvwdso..owqicymzd"], ["..ha"], ["qsibzxaorktypkfg"], ["xgvk"], ["vbycuvrkbcq"], ["qsibz.aorkty.kfg"], ["sm"], ["fkqclfmvzpzpnbvz"], ["vb..uvrkbcq"], ["jpnneostllnnma"], ["zvmtfg"], ["g.."], [".kqclfmvzpzpnbvz"], ["lboe"], ["jypzkxnzc"], ["ii..mhdgrif"], ["ln."], ["zv..fg"], ["qes"], ["ittuggead.lxjey.i"], ["jioqlytzqx"], ["fojsjyiz"], ["a"], ["qkprluekewtsftvbrjndpt"], ["fkqlfmvzp.p.bvz"], ["mwsgyywmmkzmy"], ["g"], [".pnneostllnnma"], ["bxwqn.nva.shpbb"], ["tcjmitm"], ["xajb.jyjuwgoynjg."], ["pybk"], ["qolrv"], ["qsibxa.rkty.kfg"], ["poljqcitty"], ["nmp"], ["lboe"], ["vm.f."], ["kurootufigiiy.v."], ["qfdabgsvkboyaq"], ["pvreuprpvoycadnsxaajrkh"], ["le.c.de"], ["jsxmeg.cnpigklxtyfcjset"], ["pybk"], ["sv"], ["knmxzabetvqehv"], ["ozh.zke.xy"], ["ziazu"], ["cfzvjmpidlvypukuvxf"], ["ghhelrzgbsmxkrnezif"], ["vqxn..aab"], ["xhyvayva."], ["xi"], ["fn"], ["tnjcttrsozynjpqhox"], ["qhxcfujxmayzlsrctmsa"], ["fyaaivfrupktdgw"], ["jpnne.stllnnma"], [".."], ["zv..fg"], ["polq.it.y"]]



const expected = [null, null, null, true, false, null, true, null, true, null, null, true, null, null, false, true, null, null, false, false, true, null, false, null, null, false, null, false, null, false, true, false, null, true, null, false, false, null, false, true, false, false, null, null, false, false, true, null, null, false, null, false, null, false, false, false, null, null, null, null, true, true];

[null, null, null, true, false, null, true, null, true, null, null, true, null, null, false, true]
let dict = new WordDictionary()
const output = actions.map((action, i) => {
	if (action === "addWord") {
		return dict.addWord(values[i][0])
	} else {
		return dict.search(values[i][0])
	}
})
	.forEach((val, i) => {
		if (expected[i] != null && val !== expected[i]) {
			console.log("Failed")
		}
		else {
			console.log("Passed")
		}
	})


// dict.addWord("bad")
// dict.addWord("dad")
// dict.addWord("mad")
// console.log(dict.search("pad")) //false
// console.log(dict.search("bad")) //true
// console.log(dict.search(".ad")) //true
// console.log(dict.search("b..")) //true
