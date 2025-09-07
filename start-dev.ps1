# Start Music-Library first (port 5174)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'Music-Library'; npm run dev"

# Wait a moment for Music-Library to start
Start-Sleep -Seconds 3

# Start main-app (port 5175)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'main-app'; npm run dev"