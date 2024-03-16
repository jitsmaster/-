function countDistinctTriangles(arr: string[][]) {
    //we will use a map approach
    //key of the set item is a-b-c, sorted value, so if a-b-c is same as b-a-c, it will be the same key
    //value of the map item is the count of the triangle
    let set = new Set();
    arr.forEach((t) => {
        // const key = t.sort((a, b) => a - b).join('-'); //sort number       
        const key = t.sort().join('-'); //sort string
        if (!set.has(key))
            set.add(key);
    });

    return set.size;
}
