use std::fs;
use std::path::Path;
use std::io::{self, Write};

pub fn list_files(dir: &Path) -> io::Result<Vec<String>> {
    let mut files = Vec::new();
    if dir.is_dir() {
        for entry in fs::read_dir(dir)? {
            let entry = entry?;
            let path = entry.path();
            if path.is_file() {
                files.push(path.to_string_lossy().into_owned());
            } else if path.is_dir() {
                let mut sub_files = list_files(&path)?;
                files.append(&mut sub_files);
            }
        }
    }
    Ok(files)
}

pub fn search_in_files(dir: &Path, pattern: &str) -> io::Result<Vec<String>> {
    let files = list_files(dir)?;
    let mut matches = Vec::new();
    for file_path in files {
        let content = fs::read_to_string(&file_path)?;
        if content.contains(pattern) {
            matches.push(file_path);
        }
    }
    Ok(matches)
}
