struct MyCustomSmartPointer<T> {
    data: T,
}

impl<T> MyCustomSmartPointer<T> {
    fn new(data: T) -> Self {
        MyCustomSmartPointer { data }
    }
}

fn print(s: &str) {
    println!("{}", s);
}

fn main() {
    let my_custom_smart_pointer = MyCustomSmartPointer::new(String::from("hello, world"));
    assert_eq!("Hello world!", *my_custom_smart_pointer);
    print(&my_custom_smart_pointer);
}
