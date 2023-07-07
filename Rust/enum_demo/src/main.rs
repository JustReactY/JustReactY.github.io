enum Color {
    Red,
    Yellow,
    Green,
}

struct Price(u64);

enum FruitBox {
    Apple(Color),
    Pear(Color, Price),
}

/* fn main() {
    let apple = FruitBox::Apple(Color::Red);
    let pear = FruitBox::Pear(Color::Green, Price(50));
    println!("apple is {}, pear is {}", apple, pear);
}
 */


fn eat_or_sell(fruit_box: FruitBox) {
    match fruit_box {
        FruitBox::Apple(_) => eat_apple(),
        FruitBox::Pear(_, price) => sell_pear(price),
    }
}





