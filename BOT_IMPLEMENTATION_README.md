
Instructions to execute the isseubot chatbot
Important Note: Please Use personalized tokens to communicate with mattermost. The token would then be tested in next phase with issue bot token.

1. npm install

2. set the mattermost token. Please use your personal token for execution. Please use the token to execute for testing aswell.
set BOTTOKEN = "<TOKEN>"

3. set Github token. Please use the github token to execute for npm test aswell.
set GITHUBTOKEN = "<TOKEN>"

4. change the repository name in the corresponding repository to test 
change "repo" varaible in logic_module/git_handler.js to corresponding repo name

5. set the owner id for the github in the "owner" variable in logic_module/git_handler.js.

