// fix_references.js
import fs from "fs";
import path from "path";

const LOG_FILE = "renamed_files.txt";
const VALID_EXTENSIONS = [
  ".astro",
  ".js",
  ".ts",
  ".css",
  ".md",
  ".json",
  ".html",
];
const SEARCH_DIRECTORIES = ["src", "components", "layouts"];

function loadRenameMap() {
  if (!fs.existsSync(LOG_FILE)) {
    console.error(`❌ Log file "${LOG_FILE}" not found`);
    return [];
  }

  const content = fs.readFileSync(LOG_FILE, "utf8").trim();
  const lines = content.split("\n").filter((line) => line.trim() !== "");

  const map = [];
  for (let i = 0; i < lines.length; i += 2) {
    const oldName = lines[i]?.trim();
    const newName = lines[i + 1]?.trim();

    if (oldName && newName) {
      map.push({
        oldName,
        newName,
        // Also create patterns for different quote styles and paths
        patterns: [
          oldName,
          `"${oldName}"`,
          `'${oldName}'`,
          `\`${oldName}\``,
          `/${oldName}`,
        ],
      });
    }
  }

  console.log(`📁 Loaded ${map.length} rename entries from log`);
  return map;
}

function getAllFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  Directory not found: ${dir}`);
    return [];
  }

  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath));
    } else {
      if (VALID_EXTENSIONS.includes(path.extname(filePath).toLowerCase())) {
        results.push(filePath);
      }
    }
  });

  return results;
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function fixReferences() {
  const renameMap = loadRenameMap();

  if (renameMap.length === 0) {
    console.log(
      "❌ No rename entries found. Please run rename_images.sh first.",
    );
    return;
  }

  const allFiles = SEARCH_DIRECTORIES.flatMap((dir) => getAllFiles(dir));
  console.log(
    `🔍 Scanning ${allFiles.length} files in: ${SEARCH_DIRECTORIES.join(", ")}`,
  );

  let totalReplacements = 0;
  let filesChanged = 0;

  allFiles.forEach((filePath) => {
    let text = fs.readFileSync(filePath, "utf8");
    let originalText = text;
    let changed = false;

    renameMap.forEach(({ oldName, newName, patterns }) => {
      patterns.forEach((pattern) => {
        const escapedPattern = escapeRegex(pattern);
        const regex = new RegExp(escapedPattern, "g");

        if (regex.test(text)) {
          let replacement;
          if (pattern.startsWith('"') && pattern.endsWith('"')) {
            replacement = `"${newName}"`;
          } else if (pattern.startsWith("'") && pattern.endsWith("'")) {
            replacement = `'${newName}'`;
          } else if (pattern.startsWith("`") && pattern.endsWith("`")) {
            replacement = `\`${newName}\``;
          } else if (pattern.startsWith("/")) {
            replacement = `/${newName}`;
          } else {
            replacement = newName;
          }

          console.log(
            `✅ Replaced ${pattern} → ${replacement} in ${path.relative(process.cwd(), filePath)}`,
          );
          text = text.replace(regex, replacement);
          changed = true;
          totalReplacements++;
        }
      });
    });

    if (changed) {
      fs.writeFileSync(filePath, text, "utf8");
      filesChanged++;
    }
  });

  console.log(
    `\n✨ Done! Made ${totalReplacements} replacements in ${filesChanged} files`,
  );

  if (totalReplacements === 0) {
    console.log("\n💡 If no replacements were made, check:");
    console.log("   - Are your image files in src/assets?");
    console.log("   - Does renamed_files.txt contain the correct mappings?");
    console.log(
      "   - Are the file references in your code using the exact names from the log?",
    );
  }
}

// Run the script
fixReferences();
