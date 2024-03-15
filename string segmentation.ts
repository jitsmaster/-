function canSegmentString(str: string, dict: string[]) : boolean {
    //first turn dict into set
    const set = new Set(dict);

    //simple steps with recursion
    //basically if find a word in the dict, then recurse on the rest of the string
    //if the rest of the string can be segmented, then return true
    //otherwise, keep looking
    function canSegmentRecurse(str: string): boolean {
        if (str === '') {
            return true;
        }

        for (let i = 0; i <= str.length; i++) {
            const word = str.substring(0, i);
            if (set.has(word) && canSegmentRecurse(str.substring(i))) {
                return true;
            }
        }

        return false;
    }

    return canSegmentRecurse(str);
}