// Given two strings s and goal, return true if and only if s can become goal
// after some number of shifts on s.
// A shift on s consists of moving the leftmost character of s to the rightmost
// position.
function rotateString(s: string, goal: string): boolean {
    //forget dynamic programming,
    //just dupe the string once and combine them
    //the combined string will contain all possible rotations
    //if the goal is in the combined string, return true

    //Complexity: 
    //Time: O(n^2) - includes is O(n) and we do it n times
    //Space: O(n) - we dupe the string

    return (s.length === goal.length)
        && (s + s).includes(goal);
}