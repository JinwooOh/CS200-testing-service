# Usage - Get Website Up and Running
First install node packages by running
` npm install ` in both root and /client directory

Then to start the node server on http://localhost:5000/, and the react server on http://localhost:3000/,
in root directory type ` npm run dev ` 

# Trello <https://trello.com/b/pjeqZils/iteration-1>
Assign yourself to cards you plan to work on. There are Due Date options, Checklist, Descriptions, etc. that you can add to communicate with your team members. 
Once you feel you've completed a feature, find it in Trello and add the related card to the *Code Review* list. 

# Branch Naming
When creating a new feature branch, reference the problem number being addressed in Trello. 
Follow this naming convention feature/<feature> Ex: ` feature/3.3.CalendarModal `
When creating a branch to fix a bug, following this naming convention bug/<feature> Ex: ` bug/3.3.CalendarModal `

# Finishing a Feature
Once you feel you've completed a feature, find it in Trello and add the related card to the *Code Review* list. 

Then go to GitHub and submit a pull request (PR) for the branch. Add comments of the changes you made, and things that you your reviewer should focus on testing while looking through your feature. Assign members (the whole team) to review the code, then submit your PR.
If there are merge requests, you will need to resolve those before merging into the desired branch (usually ` develop ` or, if a bug fix, your feature branch).

Merges into master should be RARE to maintain a stable version of the app. 

# Testing
