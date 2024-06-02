/**
 * Design a time-based key-value data structure that can store multiple values for the same key at different time stamps
 * and retrieve the key's value at a certain timestamp.
 * 
 * Implement the TimeMap class:
 * 
 * TimeMap() Initializes the object of the data structure.
 * void set(String key, String value, int timestamp) Stores the key key with the value value at the given time timestamp.
 * String get(String key, int timestamp) Returns a value such that set was called previously, with timestamp_prev <= timestamp.
 * If there are multiple such values, it returns the value associated with the largest timestamp_prev.
 * If there are no values, it returns "".
 */

class TimeMapBinarySearch {
	map = new Map<string, { t: number, val: string }[]>();
	constructor() {
	}

	set(key: string, value: string, timestamp: number): void {
		if (!this.map.has(key)) {
			this.map.set(key, []);
		}

		this.map.get(key)!.push({ t: timestamp, val: value })
	}

	get(key: string, timestamp: number): string {
		if (!this.map.has(key))
			return "";

		const entry = this.map.get(key)!;

		let l = 0;
		let r = entry.length - 1;

		let res = "";

		while (l <= r) {
			const mid = (l + r) >> 1;
			if (timestamp < entry[mid].t) {
				//move to left half
				r = mid - 1
			}
			else {
				//move to right half
				//since we are looking for the largest timestamp
				//just need to repeating the assignment as long as we are moving to the right
				res = entry[mid].val || "";
				l = mid + 1
			}
		}

		return res;
	}
}

class TimeMapLinearSearch {
	map = new Map<string, { t: number, val: string }[]>();
	constructor() {
	}

	set(key: string, value: string, timestamp: number): void {
		if (!this.map.has(key)) {
			this.map.set(key, []);
		}

		this.map.get(key)!.push({ t: timestamp, val: value })
	}

	get(key: string, timestamp: number): string {
		if (!this.map.has(key))
			return "";

		const entry = this.map.get(key)!;

		//move it from the end to start to first the last timestamp
		//which is less than or equal to the given timestamp
		//note that this could be more efficient if we use binary search
		//especially when the entry is large and more timestamp are added

		for (let i = entry.length - 1; i >= 0; i--) {
			if (entry[i].t <= timestamp) {
				return entry[i].val;
			}
		}

		return "";
	}
}