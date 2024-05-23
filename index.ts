//test number of provinces, with disjointed set
// 	}

import { findTargetSumWays } from "./Dynamic Programming/knapsack/target sum";

const list = [0, 0, 0, 0, 0, 0, 0, 0, 1];
const tgt = 1;

const num = findTargetSumWays(list, 3);

console.log(num); 