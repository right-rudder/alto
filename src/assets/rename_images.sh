#!/bin/bash

# === CONFIGURATION ===
COMPANY_NAME="alto-flight-academy"    # change as needed
LOCALIZATION="oklahoma-city-oklahoma"     # change as needed

# Generic keywords pool — one or two will be randomly picked
GENERIC_KEYWORDS=(
  "pilot training"
  "pilot academy"
  "flight training"
  "flight school"
  "flying lessons"
  "flight academy"
  "become a pilot"
)

# === LOG FILE ===
LOG_FILE="renamed_files.txt"
> "$LOG_FILE"   # clear previous content on each run

# --- Function to append to log file ---
log_rename() {
  local original_no_ext="$1"
  local new_no_ext="$2"

  {
    echo "$original_no_ext"
    echo "$new_no_ext"
    echo
  } >> "$LOG_FILE"
}

# === MAIN SCRIPT ===

# Function to generate a random combination of 1 or 2 keywords
generate_generic_keyword() {
  local count=${#GENERIC_KEYWORDS[@]}
  local first="${GENERIC_KEYWORDS[$((RANDOM % count))]}"
  local second=""

  # 50% chance to add a second keyword
  if (( RANDOM % 2 )); then
    second="${GENERIC_KEYWORDS[$((RANDOM % count))]}"
  fi

  # Replace spaces with dashes
  echo "${first// /-}${second:+_${second// /-}}"
}

# Function to rename files recursively
rename_files_recursively() {
  find . -type f | while read -r file; do
    dir=$(dirname "$file")
    base=$(basename "$file")
    extension="${base##*.}"
    filename="${base%.*}"

    # Skip hidden files (like .DS_Store)
    [[ "$base" == .* ]] && continue

    # Generate random generic keyword
    generic_keyword=$(generate_generic_keyword)

    # Build the new filename (use '-' for words, '_' between keyword groups)
    new_name="${filename// /-}_${COMPANY_NAME}_${LOCALIZATION}_${generic_keyword}.${extension}"

    # Limit only if it's excessively long (>180 chars)
    max_length=180
    if (( ${#new_name} > max_length )); then
      prefix="${COMPANY_NAME}_${LOCALIZATION}_${generic_keyword}"
      base_clean="${filename// /-}_"
      truncated_base="${base_clean:0:$((max_length - ${#prefix} - ${#extension} - 1))}"
      new_name="${truncated_base}${prefix}.${extension}"
    fi

    # Skip if new name already exists to avoid overwriting
    if [[ -e "$dir/$new_name" ]]; then
      echo "⚠️  Skipping '$file' → '$new_name' (already exists)"
      continue
    fi

    # Rename file
    echo "🔄 Renaming: $file → $dir/$new_name"
    mv -- "$file" "$dir/$new_name"

    # Log the rename (without extensions)
    original_no_ext="$filename"
    new_no_ext="${new_name%.*}"
    log_rename "$original_no_ext" "$new_no_ext"
  done
}

# Run the function
rename_files_recursively
