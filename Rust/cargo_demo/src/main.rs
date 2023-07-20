use rand::Rng;
mod apple;
mod pear;
mod orange;

fn main() {
    let gen = rand::thread_rng().gen::<i64>() % 2;
    if gen == 0 {
        apple::eat_apple();
    } else {
        pear::eat_pear();
    }

    orange::eat::eat_orange();
}