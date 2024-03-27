function breakingRecords(scores: number[]): number[] {
	//the goal is to find out how many times the highest and lowest scores are broken
	//we can keep track of the highest and lowest scores
	//and update the count whenever a new score breaks the record

	let highestScore = scores[0];
	let lowestScore = scores[0];

	let highestScoreCount = 0;
	let lowestScoreCount = 0;

	for (let score of scores) {
		if (score > highestScore) {
			highestScore = score;
			highestScoreCount++;
		}
		else if (score < lowestScore) {
			lowestScore = score;
			lowestScoreCount++;
		}
	}

	return [highestScoreCount, lowestScoreCount]

}