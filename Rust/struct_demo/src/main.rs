/* struct Point {
    x: f64,
    y: f64,
}

fn main() {
    let point = Point {
        x: 3.0,
        y: 4.0
    };
    println!("point: {}", point.x);
}
 */

/* struct User {
    username: String,
    email: String,
    age: u8,
}

fn main() {
    let user1 = User {
        username: String::from("Alice"),
        email: String::from("alice@example.com"),
        age: 18,
    };

    let user2 = User {
        email: String::from("alice2@example.com"),
        ..user1
    };

    println!("user2 email: {}", user2.email);
}
 */

/* struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect = Rectangle { width: 19, height: 20 };
    let area = rect.area();
    println!("The area of the rectangle is {}", area);
} */

struct Person {
    name: String,
}

impl Person {
    fn greet(&self, num : i32) {
        println!("Hello, my name is {}, num is {}", self.name, num);
    }

    fn change_name(&mut self, new_name: String) {
        self.name = new_name;
    }

    fn get_name_and_consume(self) -> String {
        self.name
    }
}

fn main() {
    let mut person = Person {
        name: String::from("Alice"),
    };

    person.greet(1);

    person.change_name(String::from("Bob"));
    person.greet(2);

    let name = person.get_name_and_consume();
    println!("The person name was: {}", name);

    // person.greet();
}

/* struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn new(w: u32, h: u32) -> Rectangle {
        Rectangle {
            width: w,
            height: h,
        }
    }
}

fn main() {
    let sq = Rectangle::new(3, 3);
    // println!("{}", sq.width);
}
 */
