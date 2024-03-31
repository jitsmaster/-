/**
 * Chief's bot is playing an old DOS based game. There is a row of buildings of different heights arranged at each index 
 * along a number line. The bot starts at building  and at a height of . You must determine the minimum energy his bot needs 
 * at the start so that he can jump to the top of each building without his energy going below zero.
 * @param arr 
 */
function chiefHopper(arr: number[]): number {
	//Complexity:
	//The time complexity is O(n) since the algorithm iterates through the buildings
	//from right to left
	//The space complexity is O(1) since the algorithm uses a constant amount of space

	//Analysis:
	//The algorithm is to determine the minimum energy the bot needs to jump to the top of each building
	//The energy is determined by the formula: energy = (energy + building height) / 2
	//The algorithm is to iterate through the buildings from right to left
	//and calculate the energy required to jump to the top of the building
	//The energy is calculated by adding the building height to the current energy
	//and dividing the sum by 2
	//The energy is rounded up to the nearest integer

	//it's sort of dp. But simpler with constant space
	let botEnergy = 0;
	for (let i = arr.length - 1; i >= 0; i--) {
		//the formula from the beginning is newEnergy = botEnergy + botEnergy - buildingHeight
		//so backwards it botEnergy = (newEnergy + buildingHeight) / 2		
		botEnergy = Math.ceil((botEnergy + arr[i]) / 2);
	}
	return botEnergy;
}