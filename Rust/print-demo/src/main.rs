use std::io;

fn main() {
    println!("print PI!");

    println!("Please input your count.");

    let mut count = String::new();

    io::stdin()
        .read_line(&mut count)
        .expect("Failed to read line");

    let number: usize = count.trim().parse().expect("input not number");
    println!("You count: {}", number);
    println!("the total {1} digits of math PI = {:.1$}", std::f64::consts::PI, number);
}
