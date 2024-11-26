"""**
 * You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival
 * airports of one flight. Reconstruct the itinerary in order and return it.
 *
 * All of the tickets belong to a man who departs from "JFK", thus, the itinerary must begin with "JFK". If there are
 * multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a
 * single string.
 *
 * For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
 * You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.
 *
 * Example 1:
 *
 * Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
 * Output: ["JFK","MUC","LHR","SFO","SJC"]
 *
 * Example 2:
 *
 * Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
 * Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
 * Explanation: Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"] but it is larger in lexical order.
 *
 * Constraints:
 *
 * 1 <= tickets.length <= 300
 * tickets[i].length == 2
 * fromi.length == 3
 * toi.length == 3
 * fromi and toi consist of uppercase English letters.
 * fromi != toi
 *
 * @param tickets
 * @returns
 */"""


class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        # first create a adjacency list (map) to store the edges in graph format
        # defaultdict will allow us to have each item by default have an empty list
        graph = defaultdict(list)

        # populate the graph
        # sort ticket descending up front, so we can use the .append on array
        for src, dest in sorted(tickets)[::-1]:
            graph[src].append(dest)

        flightPlan = []

        # perform DFS
        def dfs(src):
            # dfs first before appending, so order is reversed
            while graph[src]:
                dest = graph[src].pop()
                dfs(dest)

            #append at the end, so the largest destination (since we already sort reverse) is appended first
            #we will revert it at the end
            flightPlan.append(src)

        dfs("JFK")

        return flightPlan[::-1]
