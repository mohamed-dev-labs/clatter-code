use std::env;
use std::path::Path;
mod lib;

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() < 2 {
        println!("Usage: clatter-engine <command> [args]");
        return;
    }

    let command = &args[1];
    match command.as_str() {
        "list" => {
            let dir = if args.len() > 2 { &args[2] } else { "." };
            match lib::list_files(Path::new(dir)) {
                Ok(files) => {
                    for file in files {
                        println!("{}", file);
                    }
                }
                Err(e) => eprintln!("Error: {}", e),
            }
        }
        "search" => {
            if args.len() < 4 {
                println!("Usage: clatter-engine search <dir> <pattern>");
                return;
            }
            let dir = &args[2];
            let pattern = &args[3];
            match lib::search_in_files(Path::new(dir), pattern) {
                Ok(matches) => {
                    for m in matches {
                        println!("{}", m);
                    }
                }
                Err(e) => eprintln!("Error: {}", e),
            }
        }
        _ => println!("Unknown command: {}", command),
    }
}
