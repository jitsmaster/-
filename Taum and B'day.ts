/**
 * Taum is planning to celebrate the birthday of his friend, Diksha. There are two types of gifts that Diksha wants from Taum: one is black and the other is white. To make her happy, Taum has to buy  black gifts and  white gifts.

The cost of each black gift is  units.
The cost of every white gift is  units.
The cost to convert a black gift into white gift or vice versa is  units.
Determine the minimum cost of Diksha's gifts.
 * @param b 
 * @param w 
 * @param bc 
 * @param wc 
 * @param z 
 * @returns 
 */
function taumBday(b: number, w: number, bc: number, wc: number, z: number): number {
    //Complexity: 
    //Time: O(1)
    //Space: O(1)
    //explanation:
    //if the cost of black gifts is greater than the cost of white gifts 
    //plus the cost of converting white gifts to black gifts, 
    //then the cost of black gifts is the cost of white gifts plus the cost 
    //of converting white gifts to black gifts
    //and vice versa
    // return Math.min(bc, wc + z) * b + Math.min(wc, bc + z) * w;

    //handle big numbers
    return Number(BigInt(Math.min(bc, wc + z)) * BigInt(b) + BigInt(Math.min(wc, bc + z)) * BigInt(w))
}

