function formatInput(input: string):string {
    return input.slice(0, 10);
}
function getUserInput(): string | number {
    // return 'test';
    return 44;
}

// 1.
let input = getUserInput();
formatInput(input as string);
// formatInput(<string>input);


// type Options = {
//     baseUrl: string
//     cache
// }