use std::collections::HashMap;

fn add_elem() {
    let mut map = HashMap::new();
    map.insert("i eat".to_string(), "apple".to_string());
    map.insert("you eat".to_string(), "pear".to_string());

    println!("{:?}", map.get("i eat"));
}

fn modify_elem_if_is_apple() {
    let mut map = HashMap::new();
    map.insert("i eat".to_string(), "apple".to_string());
    map.insert("you eat".to_string(), "pear".to_string());

    map.entry("i eat".to_string()).and_modify(|fruit| {
        if fruit == "apple" {
            *fruit = "pear".to_string();
        }
    });
    println!("{map:?}");
}

fn remove_elem() {
    let mut map = HashMap::new();
    map.insert("I eat".to_string(), "apple".to_string());
    map.insert("You eat".to_string(), "pear".to_string());

    map.remove("You eat");
    println!("{:?}", map.get("You eat")); // 会输出 None
}

fn iter_map() {
    let mut map = HashMap::new();
    map.insert("I eat".to_string(), "apple".to_string());
    map.insert("You eat".to_string(), "pear".to_string());

    for (k, v) in map {
        println!("{k} {v}");
    }
    // 将会输出
    // You eat pear
    // I eat apple
}

fn main() {
    let _: HashMap<String, i64> = HashMap::new();
    let _: HashMap<String, i64> = HashMap::with_capacity(16);
    add_elem();
    modify_elem_if_is_apple();
    remove_elem();
    iter_map();
}
