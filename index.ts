//test number of provinces, with disjointed set
// 	}

import { minCostConnectPoints } from "./Graph/Minimum Spanning Tree/Min Cost to Connect All Points - Prim's Algo";

const input = [[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]];


const res = minCostConnectPoints(input);

console.log(res);