$baseDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$nssmExe = Join-Path -Path $baseDir -ChildPath nssm/nssm.exe

& $nssmExe install DoriCamera "C:\Program Files\nodejs\node.exe"
& $nssmExe set DoriCamera AppDirectory $baseDir
& $nssmExe set DoriCamera AppParameters server.js
& $nssmExe start DoriCamera