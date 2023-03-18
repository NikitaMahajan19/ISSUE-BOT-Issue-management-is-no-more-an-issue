## Bot

### Bot Implementation

In implementing your bot, we have two primary tasks:

* **Bot Platform**: 
The Bot is implemented on local system, that would hook with mattermost, github and mongo database. The interaction with these hooks is achieved through APIs and handlers in the bot.


Current implementation:

--> Mongo Database is mocked with "mongo-mock" library for implementing usecase1.
  
--> API call for listing issues in usecase3 library is mocked with "nock" library.

These mock features would then be replaced with right API calls in the further project submissions.

For implementation instrustions, please refer to [implementation readme ](https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/BOT_IMPLEMENTATION_README.md)

* **Bot Integration**: 
Basic commands had been implemented in the platform that would interact to meet thee requirements of three primary usecases. All the inputs are executed through chatbot using mattermost platform. Below would be series of basic commands and the outputs that would be expected from the usecases.

Important Note: Providing all the inputs from chatbot mattermost platform.

--> Usecase 1. To create an issue, know the bandwidth availability of resources, and assign an issue to a resource.

Input1 : "please create an issue with type:t-1 and title:Learning SE is awesome"

Expected result : return of issueid from github

Input2: "Who are all avaiable users"

Expected result : list of all users based on the avaialabilty.

Input3: "please assign issue #id to @se"

Expected result : success message

--> Usecase 2. Stale issues

Input : "Please provide all the stale issues"

Expected result : List of Issue Id - Title

--> Usecase 3. Report generation based on the time frame and also check if the provided input timeframe is valid.

Input: " Generate report from 10/10/2021 to 12/10/2021"

Expected result : Number of open,closed issues. Average time taken to complete the closed issues based on their priority.

Above are the series of inputs and outputs that would be expected after the integration.
Basic commands implementation for the use cases are perfomed and [screencast](https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/BOT.md#screencast) gives you much more visibility of the communication exchange with the bot.

### Use Case Refinement


Changes requested from the feedback

--> change the names to include verbs. 


--> UC3 EC should include invalid (or future) dates. Otherwise No concerns about your use cases. Well done. Please proceed with Bot.md.

Changes done:
- All these usecases are appeneded with words like create, assign, allocate, generate that signifies the task being perfomed in main and subflow tasks
- Checks for valid date in usecase3 and categorize under alternate flow of E2.
- phrase: "The problem is...", added according to provided feedback
- Emphasizing that the bot is developed for mattermost platform and ease Git Hub issue management tasks.
- Describe the need of the database and operations with database with the bot.

Updated use cases


```
Use Case: Available Bandwidth and Assignment.
1 Precondition: 
   Using API tokens the bot must be connected to the proper Github repository. 
2 Main flow: 
   Request for available resources is provided as input to the bot[S1]. After the collection of issues and determining the available resources [S2]. 
   
   The output provided by the bot would be the available resources for assignment[S3]. Assignment could then performed based on the provided list[S4]
3 Subflow: 
   [S1] The user inputs with keywords as "allocate", "assign" and the issue id. For example “who could i allocate", "assign the issue #10 to @bob?”
   [S2] The bot gets the list of the issues computes the bandwidth of the resource based on the open issues that they are working.
   [S3] Available options of resources are then provided to the User after connecting it to the database.
   [S4] Assignment for corresponding issues is then performed.
   
4 Alternative flow:
   [E1] The issues are not assigned any labels and cannot be used to calculate priority.
   [E2] None of the resources are available to assign an issue based on the priority provided.
```
```
Use Case: stale Issues
1 Precondition:
   Users must have API tokens in the system and be connected to the correct repository.
2 Main Flow:
   The user will request the list of the stale issue [S1]. The bot will provide a list of those issues  [S2]. Bot notifies the user to who the issue is assigned [S3].
3 Sub flows:
   [S1] User provides input with keyword “stale”. For example " Provide all the stale issues" 
   [S2] Bot will return a list of stale issues for all the issues which have passed their deadline. 
   [S3] Bot will notify the user of these issues and also the issues which were assigned long back and not yet completed.
4 Alternative Flows:
   [E1] No stale issues are available.
```
```
Use Case: Report generation
1 Preconditions
   Users must have git hub API tokens in the system.
2 Main Flow
   User requests for metrics within a stipulated time frame[S1]. The bot collects the information of all the issues. Process the data and compute according to the user input. After computation, it provides a report to the requested user[S2].
3 Sub flows
  [S1] User provides /report command with keyword “report”, "generate" and timeframe(UTC timezone). For example "Generate report from 1/1/2021 to 2/1/2021"
  [S2] Bot will return a report containing a number of issues that are still open, closed during the time frame, and the average time taken to close the issues in order of priority. 
4 Alternative Flow:
  [E1] User will only be able to generate a report if there are any open issues created within the mentioned timeframe.
  [E1] User would be notified in the chat to provide the right range of date and any invalid dates.
```
Updated [design.md](https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/DESIGN.md)

### Test Coverage

Code coverage, as measured by `c8`
![image](https://media.github.ncsu.edu/user/21789/files/0547efb3-7bdf-42f5-9a9f-56bc7090cb6b)

### Mocking Service Component

Two instances we were needing to mock the services while implementing

--> 1. One of the developer was working on use case 1 and another was working on use case 3. Developer working on use case 3 needs data of list of all issues but the data is not availabe to work on as the use case 1 will generate issue, assign issues. To continue working on developing the use case 3 program, github api to provide list of all issues is mocked and the current implementation also perform the mock for use case3. nock library is used to mock the response of list of all issues. 

Entire Use Case 3 is implemented with mock information, implemented with nock library.

More details and implemenation:
[link1](https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/mockdata/mock_issue_list.json)
[link2](https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/logic_module/generate_report_handler.js)


--> 2. Database to parse the information of number of open issues each resource is working on couldn't be completed before the submission. mongo-mock library is used to mock the data that could contain in the database.

Database to obtain information of the users and the current open issues is mocked with mongo-mock library.

More details and implemenation:
[link1](https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/logic_module/user_handler.js)

The above situations of mock are also tested with the requested from the chatbot. 

### Screencast

[USECASE 1](https://drive.google.com/file/d/13VWKkc9EVIw8fHCQIY9oI24KnowUfDeA/view?usp=sharing) <br />
[USECASE 2](https://drive.google.com/file/d/1qHYgVVg4k-hawqZvjrXgm-JTetZGmxk9/view?usp=sharing) <br />
[USECASE 3](https://drive.google.com/file/d/1hXrQZHVxbDh220r_Qjh5-Ezv1om3eW4J/view?usp=sharing)


