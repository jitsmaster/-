/**
 * There are  points on a plane. Each point  is described by , where . There are three types of queries needed: 

X i j Reflect all points in the inclusive range between points  and  along the -axis.
Y i j Reflect all points in the inclusive range between points  and  along the -axis.
C i j Count the number of points in the inclusive range between points  and  in each of the  quadrants. Then print a single line of four space-separated integers describing the respective numbers of points in the first, second, third, and fourth quadrants in that order.
As a reminder, the four quadrants of a graph are labeled as follows:


Given a set of  points and  queries, perform each query in order. For example, given points  and . Initially the points are in quadrants  and . The first query says to reflect points with indices from  to  along the -axis. After the query,  and quadrants are  and . The next query prints the number of points in each quadrant: 0 1 0 1. The third query says to reflect the point with index  to  along the -axis, so now . The points now lie in quadrants  and , so the fourth query output is 0 1 1 0.

Note: Points may sometimes share the same coordinates.
 */

function quadrants(p: number[][], queries: string[]): void {
}