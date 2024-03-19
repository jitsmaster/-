function canGetExactChangeTD(targetMoney: number, denominations: number[]) : boolean {
    //sort of dp, using topdown with momoization
    //key is the donomination, value is the count
    let memo = new Map<number, boolean>();

    function canGetExactChangeRecurse(money: number): boolean {
        //0 can always be made
        if (money === 0) return true;
        //if money is less than 0, then it can't be made
        if (money < 0) return false;

        //if we have already calculated this money, return the result
        if (memo.has(money))
            return !!memo.get(money);

        for (let i = 0; i < denominations.length; i++) {
            if (canGetExactChangeRecurse(money - denominations[i])) {
                memo.set(money, true);
                return true;
            }
        }
        memo.set(money, false);
        return false;
    }

    return canGetExactChangeRecurse(targetMoney);
}

/**
 * Determines whether it is possible to make exact change for a target amount of money
 * using a given set of denominations, using a bottom-up approach.
 *
 * @param {number} targetMoney - The target amount of money to make exact change for.
 * @param {number[]} denominations - An array of available denominations.
 * @returns {boolean} - Returns true if it is possible to make exact change, false otherwise.
 */
function canGetExactChangeBu(targetMoney: number, denominations: number[]) : boolean {
    //fill up the dp array with false, the size is always targetMoney + 1, typical but approach
    //since the first item is always discarded.
    let dp = new Array(targetMoney + 1).fill(false)
    dp[0] = true;

    for (let i = 1; i <= targetMoney; i++) {
        //for each money amount, from 1 dollar to target, check if it can be made up using the denominations
        for (let j = 0; j < denominations.length; j++) {
            //get the remaining amount after using the current denomination
            const remains = i - denominations[j];
            //if still have some money left, then check if it can be made up using the remaining denominations
            if (remains >= 0) {
                //if the current amount is cached already, use it, otherwise, check if the remaining amount
                //is cached, if yes, use that. If none of them is cached, then it's remainged as false
                dp[i] = dp[i] || dp[remains];
            }
        }
    }

    //all we are returning is the last item in the dp array
    //that is how bottom up works
    return dp[targetMoney]
}