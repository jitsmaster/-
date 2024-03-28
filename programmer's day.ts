function dayOfProgrammer(year: number): string {
	//analysis:
	//if year < 1918, then it is julian calendar\
	//leap year is divisible by 4
	//if year > 1918, then it is gregorian calendar
	//leap year is divisible by 400 or divisible by 4 but not divisible by 100
	//if year = 1918, then it is a transition year
	//the 256th day is 26.09.1918
	//if leap year, the day need to minus one, since feb only has 28 days
	//if not leap year, then the day is 13
	//normal greogorian and julian calendar,the programmer day is 256th day,
	//January has 31 days, February has 28 days, March has 31 days, April has 30 days, May has 31 days, June has 30 days, July has 31 days, 
	//and August has 31 days. When we sum the total number of days in the first eight months, we get 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 = 243. 
	//Day of the Programmer is the 256th day, so then calculate 256 - 243 = 13 to determine that it falls on day 13 of the 9th month (September).
	//for leap years, since feb has 29 days, we need to minus one from the day, because the months before September is plus one day.

	//Complexity Analysis:
	//time complexity is O(1)
	//space complexity is O(1)

	//note, we prepare the data upfront, to achieve O(1) complexities

	let day = 13;
	if (year < 1918) {
		if (year % 4 === 0) {
			day--;
		}
	} else if (year > 1918) {
		if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
			day--;
		}
	} else {
		day = 26;
	}
	return `${day}.09.${year}`;
}
