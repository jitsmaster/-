class Solution {
    public int[][] kClosest(int[][] points, int k) {
		Comparator<int[]> compareDyDistance = new Comparator<>() { 
            @Override
            public int compare(int[] coord1, int[] coord2) { 
				//we want a max heap, or the sort have to be reverse
				//this way we keep all the smallest numbers
                return getDistance(coord2) - getDistance(coord1);
            } 

			private int getDistance(int[] coord) {
				return coord[0] * coord[0] + (coord[1] * coord[1]);
			}
        }; 		

		//need to use maxHeap, since we want to keep the smaller values, and poll will remove the largest
        PriorityQueue<int[]> maxHeap = new PriorityQueue<int[]>(compareDyDistance);
		for (int[] p: points) {
			maxHeap.add(p);
			if (maxHeap.size() > k) {
				maxHeap.poll();
			}
		}

		//turn pq into an array
		return maxHeap.toArray(new int[][] {});
    }
}