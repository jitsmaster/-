function countDistinctTriangles(arr) {
    //we will use a map approach
    //key of the set item is a-b-c, sorted value, so if a-b-c is same as b-a-c, it will be the same key
    //value of the map item is the count of the triangle
    let set = new Set();
    arr.forEach((a) => {
        const key = a.sort((a, b) => a - b).join('-');
        if (!set.has(key))
            set.add(key);
    });

    return set.size;
}