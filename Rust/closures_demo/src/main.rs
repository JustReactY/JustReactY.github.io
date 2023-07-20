use std::thread;
use std::time::Duration;

fn simulated_expensive_calculation(intensity: u32) -> u32 {
    println!("calculating slowly ...");
    thread::sleep(Duration::from_secs(2));
    intensity
}

struct Cacher<T>
where
    T: Fn(u32) -> u32,
{
    calculation: T,
    value: Option<u32>,
}

fn generate_workout(intensity: u32, random_number: u32) {
    // let expensive_result =
    //     simulated_expensive_calculation(intensity);

    // 这里定义一个闭包，闭包的定义以一对 | 开始，中间是闭包的参数，使用 逗号分隔 闭包最后一行没有分号 最后一行的返回值作为闭包调用的返回值
    let expensive_closure = |num| {
        println!("calculating slowly...");
        thread::sleep(Duration::from_secs(2));
        num
    };
    if intensity < 25 {
        // println!("Today, do {} pushups!", expensive_result);
        // println!("Next, do {} situps!", expensive_result);
        println!("Today, do {} pushups!", expensive_closure(intensity));
        println!("Next, do {} situps!", expensive_closure(intensity));
    } else {
        if random_number == 3 {
            println!("Take a break today! Remember to stay hydrated!");
        } else {
            println!("Today, run for {} minutes!", expensive_closure(intensity))
        }
    }
}

fn main() {
    let simulated_use_specified_value = 10;
    let simulated_random_number = 7;

    generate_workout(simulated_use_specified_value, simulated_random_number)
}
