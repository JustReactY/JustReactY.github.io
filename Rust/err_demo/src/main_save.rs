#[derive(Debug)]
enum Version {
    Version1,
    Version2,
}

fn parse_version(header: &[u8]) -> Result<Version, &'static str> {
    match header.get(0) {
        None => Err("invalid header length"),
        Some(&1) => Ok(Version::Version1),
        Some(&2) => Ok(Version::Version2),
        Some(_) => Err("invalid version"),
    }
}

fn divide(numerator: f64, denominator: f64) -> Option<f64> {
    if denominator == 0.0 {
        None
    } else {
        Some(numerator / denominator)
    }
}

fn main() {
    assert_eq!(divide(6.0, 3.0), Some(2.0));
    assert_eq!(divide(6.0, 0.0), None);

    let version = parse_version(&[1, 2, 3, 4]);

    match version {
        Ok(v) => println!("working with version: {v:?}"),
        Err(e) => println!("error parsing header: {e:?}"),
    }
}
