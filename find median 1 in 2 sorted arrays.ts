function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
	//2 pointer method
	const l1 = nums1.length;
	const l2 = nums2.length;

	let p1 = 0, p2 = 0, s1 = 0, s2 = 0;

	//slides the pointers to find median
	for (let i = 0; i <= (l1 + l2) / 2; i++) {
		s2 = s1;
		if (p1 != l1 && p2 != l2) {
			if (nums1[p1] > nums2[p2])
				s1 = nums2[p2++];
			else
				s1 = nums1[p1++];

		}
		else if (p1 < l1)
			s1 = nums1[p1++]
		else
			s1 = nums2[p2++]
	}

	//odd numbers, return median directly
	if ((l1 + l2) % 2 === 1)
		return s1;
	else
		return (s1 + s2) / 2
};