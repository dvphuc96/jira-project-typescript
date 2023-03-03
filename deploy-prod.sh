# 1.Remove the build folder (if any)
rm -rf build

# 2.Build reactjs app with production mode
npm run build

# 3.Move to build folder
cd build

# 4.Clone file index.html into 200.html
cp index.html 200.html

# 5.Deploy
npx surge . jira-project-typescript-app.surge.sh