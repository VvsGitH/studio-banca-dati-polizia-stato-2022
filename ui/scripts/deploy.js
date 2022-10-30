import shell  from "shelljs";

// abort on errors
shell.set("-e");

// build
shell.exec("npm run build");

// navigate into the build output directory
shell.cd("dist");

// creating a repo in the dist folder and commintg last changes
shell.exec(`git init && git add -A && git commit -m 'deploy-${new Date().toLocaleDateString()}'`);

// if you are deploying to https://<USERNAME>.github.io/<REPO>
// git push -f git@github.com:VvsGitH/SortingVisualizer.git master:gh-pages
shell.exec("git push -f https://github.com/VvsGitH/studio-banca-dati-polizia-stato-2022.git master:gh-pages");
