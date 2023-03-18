
# Milestone: DEPLOYMENT

## Deployment 

The following Ansible playbook deploy_ansible.yml is responsible for the deployment of the IssueBot. The bot is deployed using  Virtual Machine with Ubuntu 20 OS VM on either a local machine or cloud. It consists of different tasks and usecases for IssueBot. It clones the GitHub repository we are working on and installs all required modules that run the bot. It also consists of a shell script env_var.sh that helps in setting the environment components for deployment. These env_var.sh contains the secrets or tokens used for executing the script.

IP address of the VM : 152.7.176.80

The following is the screencast video :
https://drive.google.com/drive/folders/1KOVoGYz0XjjfnJLSDe--lm4gQRvo0Nd-?usp=sharing


For testing, a sample repository is created. Professors and TA are already added as collabortors, which can be used for testing.
https://github.ncsu.edu/rmanedi/Team22issuebottest/issues

Before running the playbook, SSH key pair must be created and public key needs to be added to the Instance.
Play book :
https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/Deploy/deploy_ansible.yml

Shell script: env_var.sh for setting environmental variables for tokens and secrets
https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/Deploy/env_var.sh

fields with <>  in the file should be added with passwords and keys should be added from the google forms provided.


#### These are the steps to set up the deployment machine before running the ansible script
```
sudo apt-add-repository ppa:ansible/ansible
	sudo apt update
	sudo apt install ansible
```
```
[root@localhost ~]# vim /etc/ansible/ansible.cfg
[defaults]
host_key_checking = False

```
```
in the file /etc/ansible/hosts
[node]
node1 ansible_host=<remote_ip_address>
```
```
ansible-galaxy collection install community.general
```


 `After that in /home/<username>/ place the deploy_ansible.yml and env_var.sh.  `
 ```
 Then run the deploy_ansible.yml using `
	
 ansible-playbook deploy_ansible.yml
 ```
### Acceptance Testing
To initiate conversation with issuebot

Log-in to Mattermost (https://chat.robotcodelab.com/csc510-s22/channels/team-22)

After sucessfully logging-in navigate to issue__bot channel and execute the test cases given in the acceptance test plan below.
We have added the instructor and TAs as collaborators. 
For testing, a sample repository is created.
https://github.ncsu.edu/rmanedi/Team22issuebottest/issues

#### Usecase1:

##### Commands and Screenshots

creating issue with different types

> create issue title: new updated issue body: testing 123 type: t-1

![image](https://media.github.ncsu.edu/user/23503/files/fec939e4-bcd4-4911-a14f-1fcf33e80dd6)

> create issue title: new updated issue body: testing 123 type: t-2

![image](https://media.github.ncsu.edu/user/23503/files/70a9613b-19a2-4698-a0e1-37fe57596f9c)

check the available bandwidth resources:
> list available users

![image](https://media.github.ncsu.edu/user/23503/files/ecc58232-5555-4bf4-95f1-ab9bca607c49)

Assign the issue to a user
assign issue #<issue_number> @<valid user(iszare/nmanima/rmanedi/nmahaja)
> assign issue #27 @iszare 

![image](https://media.github.ncsu.edu/user/23503/files/6bada50b-8a13-41bb-8f5d-34c718aeb6e2)

-> after assignment execute "list avaiable users" to see the change in bandwidth availability

![image](https://media.github.ncsu.edu/user/23503/files/404fc708-0bf9-4c57-a09a-cb0a5a16f686)

close the issue 
close issue #<issue_number>
> close issue #27

![image](https://media.github.ncsu.edu/user/23503/files/db84a010-2ff0-4349-a6a1-f7f0f0d14b13)

-> After closing execute "list available users" to see the change in bandwidth availability

![image](https://media.github.ncsu.edu/user/23503/files/b9509deb-5f64-4ab9-bd84-6ad50a538318)


For rigourous testing use the following file section:
https://docs.google.com/document/d/1-6JdNQFhspmvbeVmqvEK2TYmoadjBl4Ifk0sg6F4rZM/edit#heading=h.dd4el2l177ag

#### Usecase2:
Commands and screenshots



List all issues
> list issues

![image](https://media.github.ncsu.edu/user/23503/files/1714acd1-b73b-4706-be0d-d8f6e364da21)

show stale issue → Lists all the stale issues which are open for last 10 hours
> show stale issues

![image](https://media.github.ncsu.edu/user/23503/files/465950a2-aa2a-4c63-b0a7-b5d2f79c3cf3)

notify stale issue -> email will be sent for all the stale issue assignees
> notify stale issues

![image](https://media.github.ncsu.edu/user/23503/files/82fc6bd5-ff3f-4a9a-adf2-dae1e9238d33)

![image](https://media.github.ncsu.edu/user/23503/files/cb39a144-d8f9-40ce-a51a-8b6c6433b30a)

#### Usecase3:
Commands and screenshots

generate report from <from_date> to <to_date> 

generate report from 03/10/2022 to 04/16/2022

![image](https://media.github.ncsu.edu/user/23503/files/dc4d7fbe-801a-471f-ab39-c39dfeb567c9)

For more rigorous testing of usecase3.
https://docs.google.com/document/d/1LV7mtOVTOiidXcM_RtlG-YDIxJn8VfrwmAswfX7nikY/edit?usp=sharing

## For more detailed list of commands and references, please use this file
https://docs.google.com/document/d/1qg0R0OmZn7Ui9IQqFZ7fVKFw_HnwPU03KpcqXoyhwj0/edit?usp=sharing

### Exploratory Testing and Code Inspection

1. [index.js](https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/index.js)<br />
index.js is the main file of the IssueBot. It helps in communicating with different modules among the bot.It imports different modules.
2. [git_handler.js](https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/logic_module/git_handler.js)<br />
git_handler.js has all the functions used for making git API calls.
3. [issue_handler.js](https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/logic_module/issue_handler.js)<br />
It contains the logic of creating and closing issues.
4. [user_handler.js](https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/logic_module/user_handler.js)<br />
It contains the logic of assigning issues, updating the user database, checking user names and listing available users.
5. [data_handler.js](https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/logic_module/data_handler.js)<br />
It contains the logic for listing open issues, getting, showing and notifying stale issues.
6. [generate_report_handler.js](https://github.ncsu.edu/csc510-s2022/CSC510-22/blob/main/logic_module/generate_report_handler.js)<br />
It contains the logic for generating report.
	This module in previous milestone was mocking list issues data, which now fetches real time data. mocking is commented.

Final code present at : https://github.ncsu.edu/csc510-s2022/CSC510-22

#### Worsheet and scrum notes:
Scrum notes
https://docs.google.com/document/d/1eqTq0RpQs8fWMfYeP3tXdsYsjqX_NEs_-StsR3xYhv0/edit

| Deliverable      | Item/Status | Issues/Tasks |
| ----------- | ----------- | ----------- |
| VCL setup      |  Created and running     |   [#94](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/84), [#85](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/85) |
| Deployment script      |  Created and deployed     |    |
| Use case   | 1        | [#90](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/90), [#91](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/91), [#92](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/92))        |
| Use case   | 2        | [#94](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/94)       |
| Use case   | 3        |[#93](https://github.ncsu.edu/csc510-s2022/CSC510-22/issues/34)     |

### Limitations and considerations:
Limitations and considerations:

1. Multiple tasks couldn't be performed at the same time i.e creation and assignment which are separate tasks that cannot be done with a single command from the mattermost. The process would be the creation of an issue, checking for availability and then assigning the issue.
2. Granularity – No. of days (rounded off)
3. GMT hours, input and GitHub API
4. One label per issue or no label
5. Assuming an issue would only be assigned to only one primary assignee.
6. Input with format month/day/year with generate keyword
7. Generate notification of stale issues through email with a single command to all the assignees.

