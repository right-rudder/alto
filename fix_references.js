// fix_references.js

import fs from "fs";
import path from "path";

const LOG_FILE = "renamed_files.txt";

// Which file extensions to search inside
const VALID_EXTENSIONS = [".astro", ".js", ".ts", ".css", ".md"];

// Folders to search inside (feel free to add more)
const SEARCH_DIRECTORIES = ["src", "public", "components"];

// =====================================================
// 1. PARSE renamed_files.txt (oldName \n newName \n blankLine)
// =====================================================
function loadRenameMap() {
  const content = fs.readFileSync(LOG_FILE, "utf8").trim();

  const lines = content.split("\n");

  const map = [];

  for (let i = 0; i < lines.length; i += 3) {
    const oldName = lines[i]?.trim();
    const newName = lines[i + 1]?.trim();

    if (!oldName || !newName) continue;

    map.push({ oldName, newName });
  }

  console.log(`Loaded ${map.length} rename entries from log.`);
  return map;
}

// =====================================================
// 2. Recursively list all files under given folders
// =====================================================
function getAllFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath));
    } else {
      if (VALID_EXTENSIONS.includes(path.extname(filePath))) {
        results.push(filePath);
      }
    }
  });

  return results;
}

// =====================================================
// 3. Replace references inside files
// =====================================================
function fixReferences() {
  const renameMap = loadRenameMap();

  const allFiles = SEARCH_DIRECTORIES.filter((dir) =>
    fs.existsSync(dir),
  ).flatMap((dir) => getAllFiles(dir));

  console.log(`Scanning ${allFiles.length} files…`);

  allFiles.forEach((filePath) => {
    let text = fs.readFileSync(filePath, "utf8");
    let originalText = text;
    let changed = false;

    renameMap.forEach(({ oldName, newName }) => {
      const regex = new RegExp(oldName, "g");

      if (regex.test(text)) {
        console.log(`✔ Replaced "${oldName}" → "${newName}" in ${filePath}`);
        text = text.replace(regex, newName);
        changed = true;
      }
    });

    if (changed) {
      fs.writeFileSync(filePath, text, "utf8");
    }
  });

  console.log("✨ Done updating references!");
}

// =====================================================
// 4. Run script
// =====================================================
fixReferences();
