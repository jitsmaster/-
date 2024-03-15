function areTheyEqual(array_a, array_b) {
    if (array_a.length !== array_b.length) {
        return false;
    }
    let notEqual = false;
    for (let a of array_a) {
        const indexInB = array_b.indexOf(a);
        if (indexInB < 0) {
            notEqual = true;
            break;
        }
        array_b.splice(indexInB, 1);
    }
    return !notEqual;
}