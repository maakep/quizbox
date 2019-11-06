@echo off
call "%~dp0buildtools\node_modules\.bin\ts-node.cmd" --transpile-only --project "%~dp0buildtools\tsconfig.json" "%~dp0buildtools\index.ts" %*