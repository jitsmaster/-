function findEncryptedWord(s: string) {
    
    function encryptRecurse(str, start, end) {
        //if the start is greater than the end, then return an empty string
        //since we have reached the end of the string
        if (start > end) return '';

        //find the middle index
        let mid = Math.floor((start + end) / 2);

        //return the middle character + the encrypted string of the left and right halves
        return str[mid] 
            + encryptRecurse(str, start, mid - 1) 
            + encryptRecurse(str, mid + 1, end);
    }

    return encryptRecurse(s, 0, s.length - 1);
}
