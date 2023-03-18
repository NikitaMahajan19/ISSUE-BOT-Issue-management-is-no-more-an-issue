const axios = require('axios');
const chalk = require('chalk')


var owner = process.env.GITHUBOWNER
var repo = process.env.GITHUBREPO
var urlRoot = "https://github.ncsu.edu/api/v3";
var config = {};
config.token = process.env.GITHUBTOKEN;


function getDefaultOptions(endpoint, method)
{
	var options = {
		url: urlRoot + endpoint,
		method: method,
		headers: {
			"content-type": "application/json",
			"Authorization": `token ${config.token}`
		}
	};
	return options;
}

// async function for create issue function


async function git_create_issue(input_option)
{
    let options = getDefaultOptions('/repos/' +  owner + '/' + repo +'/issues', "POST");
    options.data = input_option;

    return new Promise(function(resolve, reject)
	{
		axios(options)
			.then(function (response) {
				var obj = response.data;
				resolve(obj);
			}).catch(function (error) {
			console.log(chalk.red(error));
			reject("error");
		});
	});
}


// async function for list issues function

async function git_list_issues()
{
	let path1 = "/repos/"+owner+"/"+repo+"/issues?state=all&per_page=100&page=1"
	let path2 = "/repos/"+owner+"/"+repo+"/issues?state=all&per_page=100&page=2"
	let path3 = "/repos/"+owner+"/"+repo+"/issues?state=all&per_page=100&page=3"
	let options1 = getDefaultOptions(path1, "GET");
	let options2 = getDefaultOptions(path2, "GET");
	let options3 = getDefaultOptions(path3, "GET");

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		const requestOne = axios.request(options1);
		const requestTwo = axios.request(options2);
		const requestThree = axios.request(options3);
		axios.all([requestOne, requestTwo, requestThree])
			.then(axios.spread((...responses) => {
				var obj1 = responses[0].data;
				var obj2 = responses[1].data;
				var obj3 = responses[2].data;
				var obj = obj1.concat(obj2,obj3);
				//console.log(obj.length);
				resolve(obj);
			})).catch(function (error) {
			console.log(chalk.red(error));
			reject("error");
		});
	});
}



async function git_list_open_issues()
{
	let path1 = "/repos/"+owner+"/"+repo+"/issues?state=all&per_page=100&page=1&state=open"
	let path2 = "/repos/"+owner+"/"+repo+"/issues?state=all&per_page=100&page=2&state=open"
	let path3 = "/repos/"+owner+"/"+repo+"/issues?state=all&per_page=100&page=3&state=open"
	let options1 = getDefaultOptions(path1, "GET");
	let options2 = getDefaultOptions(path2, "GET");
	let options3 = getDefaultOptions(path3, "GET");

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		const requestOne = axios.request(options1);
		const requestTwo = axios.request(options2);
		const requestThree = axios.request(options3);
		axios.all([requestOne, requestTwo, requestThree])
			.then(axios.spread((...responses) => {
				var obj1 = responses[0].data;
				var obj2 = responses[1].data;
				var obj3 = responses[2].data;
				var obj = obj1.concat(obj2,obj3);
				//console.log(obj.length);
				resolve(obj);
			})).catch(function (error) {
			console.log(chalk.red(error));
			reject("error");
		});
	});
}

// async function for assign issue function


async function git_assign_issue(input_option,issue_num)
{
    let options = getDefaultOptions('/repos/' +  owner + '/' + repo +"/issues/" + issue_num +'/assignees', "POST");
    options.data = {};
	options.data.assignees = input_option;
	options.data.owner = owner;
	options.data.repo = repo;
	options.data.issue_number = issue_num;

    return new Promise(function(resolve, reject)
	{
		axios(options)
			.then(function (response) {
				var obj = response.data;
				resolve(obj);
			}).catch(function (error) {
			console.log(chalk.red(error));
			reject("error");
		});
	});
}



async function git_create_issue_comment(issue_number, input_option)
{
    let options = getDefaultOptions('/repos/' +  owner + '/' + repo +'/issues/' + issue_number + '/comments', "POST");
    options.data = input_option;

    return new Promise(function(resolve, reject)
	{
		axios(options)
			.then(function (response) {
				var obj = response.data;
				resolve(obj);
			}).catch(function (error) {
			console.log(chalk.red(error));
			reject("error");
		});
	});
}



async function git_get_issue_detail(issue_number)
{
	if(isNaN(parseInt(issue_number)))
	{
		return 'Issue number should be a numeric'
	}

	let options = getDefaultOptions('/repos/' + owner + '/' + repo + '/issues/' + issue_number, "GET")
	return new Promise(function(resolve, reject)
	{
		axios(options)
			.then(function(response){
				var obj = response.data;
				resolve(obj);
			}).catch(function (error) {
			console.log(chalk.red(error));
			reject("Invalid issue number, please check the input");
		});
	});
}



async function git_close_issue(issue_number)
{
	let options = getDefaultOptions('/repos/' + owner + '/' + repo + '/issues/' + issue_number, "PATCH");
	options.data = {state:'closed'};
	return new Promise(function(resolve, reject)
	{
		axios(options)
			.then(function(response){
				var obj = response.data;
				resolve(obj);
			}).catch(function (error) {
			console.log(chalk.red(error));
			reject("Invalid issue number, please check the input")
		});
	});
}



exports.git_create_issue = git_create_issue; //to expose the function to other programs
exports.git_list_issues = git_list_issues;
exports.git_assign_issue = git_assign_issue;
exports.git_create_issue_comment = git_create_issue_comment;
exports.git_get_issue_detail = git_get_issue_detail;
exports.git_close_issue = git_close_issue;
exports.git_list_open_issues = git_list_open_issues;



/*
(async () => {
	//msg = 'assign issue #3 to @iszare';
	try{
		let w = await git_list_open_issues();
		console.log(w);
	}
    catch(e){
		console.log(e)
	}
	console.log("main output")
})();
*/

