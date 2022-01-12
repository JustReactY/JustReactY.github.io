
// let bar:never = (() => {
//     throw new Error('error');
//   })();



let bar1:never = (() => {
    console.log(1);
    while(true){
        console.log(1);
    }
})()