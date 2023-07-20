fn init_vec() {
    let _: Vec<i32> = Vec::new();
    let _: Vec<i32> = Vec::with_capacity(16);
    let _ = vec!["hello", "world"];
}

fn this_also_works() {
    let _ = Vec::<String>::new();
}

fn get_by_index() {
    let mut v = Vec::new();
    v.push(1);
    v.push(2);
    v[0] = 100;

    println!("{}", v[1]);
    println!("{:?}", v.get(2));
    println!("{}", v[0]);
}

fn add_elem() {
    let mut v = Vec::new();
    v.push("hello");
    v.push("world");
    println!("{:?}", v.get(1));
}

fn pop_elem() {
    let mut v = vec!["hello", "rust"];
    println!("{:?}", v.pop());
    println!("{:?}", v);
}

fn remove_elem() {
    let mut v = vec!["hello", "rust"];
    v.remove(1);
    println!("{:?}", v);
}

fn will_consume_v() {
    let mut v = vec!["hello", "world"];
    for elem in &mut v {
        println!("{elem}");
        *elem = "elem"
    }

    println!("{:?}", v);
}

fn main() {
    init_vec();
    this_also_works();
    get_by_index();
    add_elem();
    pop_elem();
    remove_elem();
    will_consume_v();
    // println!("Hello, world!");
}
