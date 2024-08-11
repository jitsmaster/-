import { MaxPriorityQueue } from "@datastructures-js/priority-queue";

/**
 * Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see
 * the 10 most recent tweets in the user's news feed.
 *
 * Implement the Twitter class:
 *
 * Twitter() Initializes your twitter object.
 * void postTweet(int userId, int tweetId) Composes a new tweet with ID tweetId by the user userId. Each call to this
 * function will be made with a unique tweetId.
 * List<Integer> getNewsFeed(int userId) Retrieves the 10 most recent tweet IDs in the user's news feed. Each item in
 * the news feed must be posted by users who the user followed or by the user themself. Tweets must be ordered from most
 * recent to least recent.
 * void follow(int followerId, int followeeId) The user with ID followerId started following the user with ID followeeId.
 * void unfollow(int followerId, int followeeId) The user with ID followerId started unfollowing the user with ID followeeId.
 *
 * Example 1:
 *
 * Input
 * ["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
 * [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
 * Output
 * [null, null, [5], null, null, [6, 5], null, [5]]
 *
 * Explanation
 * Twitter twitter = new Twitter();
 * twitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).
 * twitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5]. return [5]
 * twitter.follow(1, 2);    // User 1 follows user 2.
 * twitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6).
 * twitter.getNewsFeed(1);  // User 1's news feed should return a list with 2 tweet ids -> [6, 5]. Tweet id 6 should
 * precede tweet id 5 because it is posted after tweet id 5.
 * twitter.unfollow(1, 2);  // User 1 unfollows user 2.
 * twitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5], since user 1 is no longer
 * following user 2.
 *
 * Constraints:
 * 1 <= userId, followerId, followeeId <= 500
 * 0 <= tweetId <= 104
 * All the tweets have unique IDs.
 * At most 3 * 104 calls will be made to postTweet, getNewsFeed, follow, and unfollow.
 */
class Twitter {
	tweets: Map<number, { time: number, id: number }[]>;
	followsByFollower: Map<number, Set<number>>;

	timestamp = 0;

	constructor() {
		this.tweets = new Map<number, { time: number, id: number }[]>();
		this.followsByFollower = new Map<number, Set<number>>();
	}

	postTweet(userId: number, tweetId: number): void {
		//add the tweet to the user's map
		if (!this.tweets.has(userId))
			this.tweets.set(userId, []);

		//put the tweet in front, since we are getting the most recent ones
		this.tweets.get(userId)?.unshift({
			time: this.timestamp++,
			id: tweetId
		});
	}

	getNewsFeed(userId: number): number[] {
		//Complexity: 
		//Time: O(n * log(10)) - iterate through all user's and followees' tweets and heapify
		//Space: O(n) - the size of the heap, and O(1) for the constant 10 items output

		//this is the same problem as merge k sorted list
		//we can just use a maxheap to push everything in and grab the most recent 10 items
		//unlike the linkedlist merge k sorted problem

		const maxHeap = new MaxPriorityQueue<{ time: number, id: number }>(item => item.time.valueOf());

		//push in user's tweets
		const userTweets = this.tweets.get(userId) ?? [];

		for (let t of userTweets) {
			maxHeap.enqueue(t);
		}

		//push in user's followee's tweets
		for (let user of (this.followsByFollower.get(userId) ?? new Set<number>())) {
			//get followee's tweet
			const followeeTweets = this.tweets.get(user) ?? [];
			for (let t of followeeTweets) {
				maxHeap.enqueue(t);
			}
		}

		//now just take top 10
		const top10Tweets = [] as number[];
		let i = 10;
		while (i > 0 && maxHeap.size() > 0) {
			top10Tweets.push(maxHeap.dequeue()!.id);
			i--;
		}

		return top10Tweets;
	}

	follow(followerId: number, followeeId: number): void {
		//add the followeeId to its own set
		if (!this.followsByFollower.has(followerId)) {
			this.followsByFollower.set(followerId, new Set());
		}

		//now add to the set
		this.followsByFollower.get(followerId)?.add(followeeId);
	}

	unfollow(followerId: number, followeeId: number): void {
		//unfollow just remove it
		if (this.followsByFollower.has(followerId)) {
			this.followsByFollower.get(followerId)?.delete(followeeId);
		}
	}
}

/**
 * This class is actually faster in most case, since we don't have to push all user and followee's tweets into the heap.
 * It can also be much slower in some cases, if the users' or follower's tweets are much earlier then others.
 */
class TwitterFast {

	private following: Map<number, Set<number>>;
	private tweets: { authorId: number, id: number }[];

	constructor() {
		this.following = new Map<number, Set<number>>();
		this.tweets = [];
	}

	postTweet(userId: number, tweetId: number): void {
		this.tweets.push({ authorId: userId, id: tweetId });
	}

	getNewsFeed(userId: number): number[] {
		//Complexity: O(n) - n is the number of tweets
		//Time: O(n) - iterate through all tweets
		//Space: O(1) - the size of the heap, and O(1) for the constant 10 items output
		const FEED_LIMIT = 10;
		const [feed, followers] = [[] as number[], this.following?.get(userId)];

		for (let i = this.tweets.length - 1; i >= 0 && feed.length < FEED_LIMIT; i--) {
			const tweet = this.tweets[i];

			const owner = tweet.authorId;

			if (owner === userId || followers?.has(owner)) {
				feed.push(tweet.id);
			}
		}

		return feed;
	}

	follow(followerId: number, followeeId: number): void {
		if (!this.following.has(followerId))
			this.following.set(followerId, new Set());

		this.following.get(followerId)!.add(followeeId);
	}

	unfollow(followerId: number, followeeId: number): void {
		if (this.following.has(followerId))
			this.following.get(followerId)!.delete(followeeId);
	}
}

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */