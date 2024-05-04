//test number of provinces, with disjointed set
// 	}

import { componentsInGraph } from "./union/components in graph";

const input = `1 17
5 13
7 12
5 17
5 12
2 17
1 18
8 13
2 15
5 20`;

const ar = input.split('\n').map(c => c.split(' ').map(c => parseInt(c)));

const result = componentsInGraph(ar);

console.log(result);