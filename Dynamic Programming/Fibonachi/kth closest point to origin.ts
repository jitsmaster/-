/**
 * Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k,
 * return the k closest points to the origin (0, 0).
 *
 * The distance between two points on the X-Y plane is the Euclidean distance
 * (i.e., √(x1 - x2)2 + (y1 - y2)2).
 *
 * You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).
 */

import { MaxPriorityQueue } from "@datastructures-js/priority-queue";

function kClosest(points: number[][], k: number): number[][] {
    //Complexity:
    //Time: O(n * log(k)) - we are iterating through the points and adding to the heap
    //Space: O(k) - the size of the heap, instead of n, since we only keep k closest points in the heap
    const maxHeap = new MaxPriorityQueue<number[]>(p => Math.sqrt(p[0] ** 2 + p[1] ** 2));

    for (let point of points) {
        maxHeap.enqueue(point);

        //dequeue the point if the size of the heap is greater than k
        //we only want to keep k closest points
        //this allows us to only iterate through the points once
        if (maxHeap.size() > k) {
            maxHeap.dequeue();
        }
    }
    
    //this will iterate through the heap once more time, which add both space and time complexity of k
    return maxHeap.toArray();
}