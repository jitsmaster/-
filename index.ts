import assert from 'assert';
import {slidingWindowMax} from "./sliding window maximum";

const array = [1,3,-1,-3,5,3,6,7]
const k = 3;
assert.deepEqual(slidingWindowMax(array, k), [3,3,5,5,6,7]);
console.info('Test passed!');