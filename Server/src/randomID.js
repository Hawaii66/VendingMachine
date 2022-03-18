const GetRandomOrderID = async(str) => {
    var randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + `:${str}`;
    /*while (await OrderExits(randomID)) {
        randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + `:${str}`;
    }*/

    return randomID
}

console.log(GetRandomOrderID("machine"));