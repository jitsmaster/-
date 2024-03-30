/**
 * Turn the time into words
 * @param h : hours
 * @param m : minutes
 */
function timeInWords(h: number, m: number): string {
	//this is a stupid question
	//we will just use a simple array to store the words
	//and return the words based on the input

	const numbers = [
		"o' clock",
		"one",
		"two",
		"three",
		"four",
		"five",
		"six",
		"seven",
		"eight",
		"nine",
		"ten",
		"eleven",
		"twelve",
		"thirteen",
		"fourteen",
		"fifteen",
		"sixteen",
		"seventeen",
		"eighteen",
		"nineteen",
		"twenty",
		"twenty one",
		"twenty two",
		"twenty three",
		"twenty four",
		"twenty five",
		"twenty six",
		"twenty seven",
		"twenty eight",
		"twenty nine",
	];
	if (m === 0) {
		return `${numbers[h]} ${numbers[m]}`;
	}
	if (m === 1) {
		return `${numbers[m]} minute past ${numbers[h]}`;
	}
	if (m === 15) {
		return `quarter past ${numbers[h]}`;
	}
	if (m === 30) {
		return `half past ${numbers[h]}`;
	}
	if (m === 45) {
		return `quarter to ${numbers[(h % 12) + 1]}`;
	}
	if (m < 30) {
		return `${numbers[m]} minutes past ${numbers[h]}`;
	}
	if (m > 30) {
		return `${numbers[60 - m]} minutes to ${numbers[(h % 12) + 1]}`;
	}
	return "";


}