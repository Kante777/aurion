#!/bin/bash

mkdir -p reports

REPORT="reports/guardian-report.txt"

{
echo "==================================="
echo "AETERNUM VERIFICATION REPORT"
echo "Generated: $(date)"
echo "==================================="

echo
echo "Git Commit:"
git rev-parse --short HEAD 2>/dev/null || echo "Unavailable"

echo
echo "Node:"
node -v

echo
echo "NPM:"
npm -v

echo
echo "TypeScript:"
npx tsc -v

echo
echo "Compiler Diagnostics:"
npx tsc --noEmit

} > "$REPORT" 2>&1

echo "✔ Report written to $REPORT"
