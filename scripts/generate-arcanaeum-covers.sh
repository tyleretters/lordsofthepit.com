#!/usr/bin/env bash
# Generate page-1 thumbnails for each PDF referenced by src/layouts/arcanaeum.html.
# Idempotent: overwrites any existing JPGs at the same paths.
#
# Prereqs:
#   - pdftoppm (brew install poppler)
#   - curl
#
# Run from the repo root or from this script's directory; pathing is handled.

set -euo pipefail

CDN="https://assets.lordsofthepit.com"
DPI=150

TMP=$(mktemp -d)
trap "rm -rf $TMP" EXIT

# Resolve to repo root so paths in `mappings` work regardless of where the
# script is invoked from.
cd "$(dirname "$0")/.."

extract_page1() {
  local pdf_filename="$1" target="$2"
  echo "  $pdf_filename -> $target"
  mkdir -p "$(dirname "$target")"
  curl -fsSL "$CDN/$pdf_filename" -o "$TMP/source.pdf"
  pdftoppm -jpeg -f 1 -l 1 -r "$DPI" -singlefile "$TMP/source.pdf" "$TMP/page"
  mv "$TMP/page.jpg" "$target"
  rm -f "$TMP/source.pdf"
}

# Page banner — uses page 1 of Duelist #1 (swap to a different source if you
# want a different banner image; this is just the same JPG used by the
# Duelist #1 thumbnail).
echo "banner:"
extract_page1 "duelist-issue-1-remastered.pdf" "src/assets/images/site/arcanaeum.jpg"

echo
echo "covers:"

# Each entry: "<pdf-filename-on-R2>|<target-jpg-path-in-repo>"
# Target paths match the literal `<img src=...>` values in
# src/layouts/arcanaeum.html (less the leading slash). Filenames are
# legacy from the Jekyll era — preserved to keep the layout untouched.
mappings=(
  "duelist-issue-1-remastered.pdf|src/assets/images/2018/12/duelist_1_complete_image_Page_01.jpg"
  "issue-1.5-may-1994.pdf|src/assets/images/2019/05/01.jpg"
  "duelist-issue-2-remastered-complete.pdf|src/assets/images/2018/12/Binder1_Page_01-2.jpg"
  "duelist-issue-3-remastered-complete.pdf|src/assets/images/2019/02/Duelist-3-Cover.jpg"
  "duelist-issue-4-complete.pdf|src/assets/images/2019/04/01.jpg"
  "duelist-issue-5-complete.pdf|src/assets/images/2019/04/01-1.jpg"
  "duelist-issue-6-complete-v2.pdf|src/assets/images/2020/02/001.jpg"
  "duelist-issue-7-complete-v2.pdf|src/assets/images/2020/01/001.jpg"
  "duelist-issue-8-complete-v2.pdf|src/assets/images/2020/01/001-1.jpg"
  "Magic-The-Puzzling.pdf|src/assets/images/2019/10/1.jpg"
  "The-Duelist-Presents-The-Complete-MTG-Card-List.pdf|src/assets/images/2019/10/01-1.jpg"
  "Conjure-Nov-Dec-1994-Complete.pdf|src/assets/images/2019/03/01.jpg"
  "Acclaim-Comics-Ice-Age-Issue-1-July-1995.pdf|src/assets/images/2019/09/1-1.jpg"
  "Acclaim-Comics-Ice-Age-Issue-2-Aug-1995.pdf|src/assets/images/2019/09/1.jpg"
  "Acclaim-Comics-Ice-Age-Issue-3-Sep-1995.pdf|src/assets/images/2019/09/1-2.jpg"
  "Acclaim-Comics-Ice-Age-Issue-4-Oct-1995.pdf|src/assets/images/2019/09/01.jpg"
  "Jyhad-Supplement.pdf|src/assets/images/2019/10/01.jpg"
)

for entry in "${mappings[@]}"; do
  pdf="${entry%%|*}"
  target="${entry#*|}"
  extract_page1 "$pdf" "$target"
done

echo
echo "done."
