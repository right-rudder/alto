#!/bin/bash

# === CONFIGURATION ===
COMPANY_NAME="alto-flight-academy"
LOCALIZATION="oklahoma-city-oklahoma"

# Generic keywords pool
GENERIC_KEYWORDS=(
  "pilot-training"
  "pilot-academy" 
  "flight-training"
  "flight-school"
  "flying-lessons"
  "flight-academy"
  "become-a-pilot"
)

# === LOG FILE ===
LOG_FILE="renamed_files.txt"
> "$LOG_FILE"

# --- Function to append to log file ---
log_rename() {
  local original="$1"
  local new="$2"
  {
    echo "$original"
    echo "$new"
    echo
  } >> "$LOG_FILE"
}

# === MAIN SCRIPT ===
generate_generic_keyword() {
  local count=${#GENERIC_KEYWORDS[@]}
  local first="${GENERIC_KEYWORDS[$((RANDOM % count))]}"
  local second=""

  if (( RANDOM % 2 )); then
    # Ensure second keyword is different from first
    while [[ -z "$second" || "$second" == "$first" ]]; do
      second="${GENERIC_KEYWORDS[$((RANDOM % count))]}"
    done
  fi

  echo "${first}${second:+_${second}}"
}

rename_files_recursively() {
  find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) | while read -r file; do
    dir=$(dirname "$file")
    base=$(basename "$file")
    extension="${base##*.}"
    filename="${base%.*}"

    # Skip already renamed files and hidden files
    [[ "$base" == *"${COMPANY_NAME}"* ]] && continue
    [[ "$base" == .* ]] && continue

    # Generate random generic keyword
    generic_keyword=$(generate_generic_keyword)

    # Build new filename
    new_name="${filename// /-}_${COMPANY_NAME}_${LOCALIZATION}_${generic_keyword}.${extension}"

    # Limit length if needed
    max_length=180
    if (( ${#new_name} > max_length )); then
      prefix="${COMPANY_NAME}_${LOCALIZATION}_${generic_keyword}"
      base_clean="${filename// /-}_"
      truncated_base="${base_clean:0:$((max_length - ${#prefix} - ${#extension} - 1))}"
      new_name="${truncated_base}${prefix}.${extension}"
    fi

    # Skip if new name already exists
    if [[ -e "$dir/$new_name" ]]; then
      echo "⚠️  Skipping '$file' → '$new_name' (already exists)"
      continue
    fi

    # Rename file
    echo "🔄 Renaming: $base → $new_name"
    mv -- "$file" "$dir/$new_name"

    # Log the rename WITH extensions
    log_rename "$base" "$new_name"
  done
}

rename_files_recursively
