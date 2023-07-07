fn main() {
    let s1 = String::from("hello");

    {
        let s2 = s1;
        println!("s2 is {}", s2);
    }

    // println!("s1 is {}", s1);
    let a = 5;
    let b = a;

    println!("a is {}; b is {}", a, b);
}
