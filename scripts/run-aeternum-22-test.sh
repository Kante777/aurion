#!/usr/bin/env bash

set -e

echo "🧠 AETERNUM FULL STACK TEST START"
echo "==================================="

npx ts-node src/core/shock/tests/evidenceLayerTest.ts

echo ""
echo "==================================="
echo "🧪 RUNNING SHOCK ENGINE TEST"
echo "==================================="

npx ts-node src/core/shock/tests/shockEngineTest.ts

echo ""
echo "==================================="
echo "🧠 RUNNING ADAPTATION TEST"
echo "==================================="

npx ts-node src/core/shock/tests/adaptationTest.ts

echo ""
echo "==================================="
echo "📊 SELF-TUNING VERIFICATION REPORT"
echo "==================================="

npx ts-node src/core/shock/tests/selfTuningReport.ts

echo ""
echo "==================================="
echo "🧪 RUN COMPLETE"
echo "==================================="
