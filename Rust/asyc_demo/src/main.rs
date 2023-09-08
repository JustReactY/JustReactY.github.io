use std::thread;

fn main() {
    let counter = 0;
    let immutable_counter = &mut counter;

    let thread_join_handle = thread::spawn(|| {
        *immutable_counter += 1;
    });

    thread_join_handle.join().unwrap();
    println!("{}", immutable_counter);
}
