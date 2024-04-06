import { deepStrictEqual } from "assert";
import { runningMedian } from "./2 heaps running median";

const a = [12, 4, 5, 3, 8, 7];

const b = runningMedian(a);

console.info(b);

deepStrictEqual([12.0,
	8.0,
	5.0,
	4.5,
	5.0,
	6.0], b);
console.info('runningMedian passed tests!')