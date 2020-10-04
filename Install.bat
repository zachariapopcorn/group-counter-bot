echo off
cls
mkdir "Group Counter Bot"
cd "Group Counter Bot"
mkdir .data
cd .data
echo. > db.sqlite
cd ..
mkdir commands
curl https://raw.githubusercontent.com/zachariapopcorn/group-counter-bot/main/index.js -O index.js
curl https://raw.githubusercontent.com/zachariapopcorn/group-counter-bot/main/db.js -O db.js
curl https://raw.githubusercontent.com/zachariapopcorn/group-counter-bot/main/package.json -O package.json
curl https://raw.githubusercontent.com/zachariapopcorn/group-counter-bot/main/package-lock.json -O package-lock.json
curl https://raw.githubusercontent.com/zachariapopcorn/group-counter-bot/main/run.bat -O run.bat
cd commands
curl https://raw.githubusercontent.com/zachariapopcorn/group-counter-bot/main/getinfo.js -O getinfo.js
curl https://raw.githubusercontent.com/zachariapopcorn/group-counter-bot/main/help.js -O help.js
curl https://raw.githubusercontent.com/zachariapopcorn/group-counter-bot/main/setchannel.js -O setchannel.js
curl https://raw.githubusercontent.com/zachariapopcorn/group-counter-bot/main/setgoal.js -O setgoal.js
curl https://raw.githubusercontent.com/zachariapopcorn/group-counter-bot/main/setgroup.js -O setgroup.js
cls
echo Installing required packages! After this operation is completed, the file will close and you can delete it if you would want to
timeout 3
npm install @keyv/sqlite axios discord.js fs keyv noblox.js