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

/* fn eat_or_sell(fruit_box: FruitBox) {
    match fruit_box {
        FruitBox::Apple(_) => eat_apple(),
        FruitBox::Pear(_, price) => sell_pear(price),
    }
}
 */

/* fn eat_or_sell(fruit_box: FruitBox) {
    match fruit_box {
        FruitBox::Apple(-) => eat_apple(),
        _ +> do_nothing();
    }
} */

fn eat_if_is_apple(fruit_box: FruitBox) {
    if let FruitBox::Apple(_) = fruit_box {
        eat_apple();
    }
}

fn do_a_lot_thing_if_is_apple(fruit_box: FruitBox) {
    let FruitBox::Apple(Color::Red) = fruit_box else {
        return;
    };
    do_things_1();
    do_things_2();
    do_things_3();
}
