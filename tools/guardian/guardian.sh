#!/bin/bash

set -e

echo ""
echo "=========================================="
echo "      AETERNUM CONFIG GUARDIAN"
echo "=========================================="
echo ""

ERRORS=0

####################################
# Verify tsconfig exists
####################################

if [ ! -f tsconfig.json ]; then
    echo "❌ tsconfig.json missing."
    exit 1
fi

####################################
# Verify moduleResolution
####################################

MODULE=$(grep '"moduleResolution"' tsconfig.json | head -1)

if echo "$MODULE" | grep -q '"Node"'; then
    echo "❌ Deprecated moduleResolution: Node"
    ERRORS=$((ERRORS+1))
fi

if ! echo "$MODULE" | grep -Eq '"NodeNext"|"Bundler"'; then
    echo "⚠ Modern moduleResolution not detected."
fi

####################################
# Verify ignoreDeprecations
####################################

if ! grep -q '"ignoreDeprecations"' tsconfig.json; then
    echo "❌ ignoreDeprecations missing."
    ERRORS=$((ERRORS+1))
fi

####################################
# Verify casing
####################################

LOWER=$(find src -name systemClock.ts 2>/dev/null || true)

if [ ! -z "$LOWER" ]; then
    echo "❌ systemClock.ts should be SystemClock.ts"
    ERRORS=$((ERRORS+1))
fi

####################################
# Run TypeScript compile
####################################

echo ""
echo "Running compiler..."

if ! npx tsc --noEmit; then
    echo ""
    echo "❌ TypeScript compilation failed."
    ERRORS=$((ERRORS+1))
fi

####################################
# Summary
####################################

echo ""
echo "=========================================="

if [ "$ERRORS" -eq 0 ]; then
    echo "✅ Guardian PASSED"
else
    echo "❌ Guardian FAILED"
    echo "$ERRORS issue(s) detected."
    exit 1
fi

echo "=========================================="
