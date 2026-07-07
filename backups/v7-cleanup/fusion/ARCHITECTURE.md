# FusionCore Architecture Rule

- Only ONE FusionCore class is allowed:
  src/core/fusion/fusionCore.ts

- All patches MUST be functions, not class overrides.

- V7 must modify behavior via injected services, not duplicate classes.

- No .js class shadows are permitted in this directory.
