/* fn main() {
    let mut s = String::from("hello");

    s.push_str(", world!");

    println!("{}", s)
}
 */

/* fn main() {
    // 规则 1：Rust中每个值都有一个所有者
    let s1 = String::from("hello"); // s1 是值 "hello" 的所有者

    {
        // 规则 2：一个值同时只能有一个所有者
        let s2 = s1; // 所有权从 s1 转移到 s2（s1 不再有效）
                     // println!("{}", s1); // 这会导致编译时错误，因为 s1 不再有效
        println!("{}", s2); // 这是允许的，因为 s2 现在拥有该值
    } // s2在此处超出范围

    // 规则 3：当所有者离开作用域范围，这个值将被丢弃
    // 由于 s2 超出范围，因此为值 "hello" 分配的内存在此处自动释放。
}
 */

/* fn main() {
    let x = String::from("hello");
    let y = x.clone();

    println!("x: {}, y: {}", x, y);
} */

/* fn takes_ownership(s: String) {
    println!("Received string: {}", s);
} // s 离开作用域，被丢弃

fn gives_ownership() -> String {
    String::from("hello")
} // 返回了String的所有权

fn main() {
    let s = String::from("hello");
    takes_ownership(s); // s转移到了函数内，不再可用

    // s 不再可用

    let s = gives_ownership(); // s 获得了返回值的所有权
}
 */

/* fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
 */

/* fn main() {
    let mut s = String::from("hello");
    change(&mut s);
    println!("Then updated string is : {}", s);
}

fn change(s: &mut String) {
    s.push_str(", world!");
}
 */

/* fn main() {
    let mut s = String::from("hello");

    // 多个不可变引用是允许的
    let r1 = &s;
    let r2 = &s;
    println!("r1: {}, r2: {}", r1, r2);
    // 在这里，多个不可变引用是允许的，因此打印不会引发错误。

    // 一个可变引用
    let r3 = &mut s;
    println!("r3: {}", r3);
    // 在这里，只有一个可变引用，因此打印不会引发错误。

    // 不允许同时存在可变引用和不可变引用
    // let r4 = &s; // 这会导致编译时错误
    // println!("r3: {}, r4: {}", r3, r4);
    // 如果取消注释上面两行，同时存在可变引用和不可变引用将导致编译时错误。
}
 */

/* fn main() {
    let reference_to_nothing = dangle();
}

fn dangle() -> &String {
    let s = String::from("hello");

    &s
}
 */

fn main() {
    let s = String::from("hello world");
    let hello = &s[0..5];
    let world = &s[6..11];

    println!("hello: {}, world: {}", hello, world);

    let a = [1, 2, 3, 4, 5];
    let slice = &a[1..3];
    assert_eq!(slice, &[2, 3], "两值相等");
}
