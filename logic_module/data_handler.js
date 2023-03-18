const Git_handler = require('./git_handler.js');



async function list_issues()
{
    let out_list = [];
    let obj = await Git_handler.git_list_issues();

    for (var i = 0; i < obj.length; i++){
        var issue_num = obj[i].number;
        var issue_name = obj[i].title;
        out_list.push(issue_num+"-"+issue_name);
    }   
    if(out_list.length == 0)
    {
        return ("No issues!");
    }
    return(out_list.join('\n'));
}



async function list_open_issues()
{
    let out_list = [];
    let obj = await Git_handler.git_list_open_issues();

    for (var i = 0; i < obj.length; i++){
        var issue_num = obj[i].number;
        var issue_name = obj[i].title;
        out_list.push(issue_num+"-"+issue_name);
    }   
    if(out_list.length == 0)
    {
        return ("No open issues!");
    }
    return(out_list.join('\n'));
}


async function get_stale_issues()
{
    let issues = await Git_handler.git_list_issues();
    var issueId = [];
    let currTime = new Date().getTime();
    for(var i=0;i< issues.length;i++) {
    if(currTime-new Date(issues[i].updated_at).getTime()> 10*60*1000 && issues[i].state == 'open'){
        if (issues[i].hasOwnProperty('pull_request')==false ){
                issueId.push(issues[i]);
            }
        }
    }
    return Promise.resolve(issueId);
}


async function show_stale_issues()
{
    let issue_list = await get_stale_issues();
    //console.log("Here is the issue list:", issue_list)
    let issue_lst = [];
    for(var i=0;i< issue_list.length;i++) {
        issue_lst.push(issue_list[i].number+"-"+issue_list[i].title);
    }
    console.log(issue_lst)
    return (issue_lst.join('\n'));
}


async function notify_stale_issues()
{
    let issue_list = await get_stale_issues();
    let issue_lst = []
    for(var i=0;i< issue_list.length;i++){
        issue_lst.push(issue_list[i].number);
    }

    console.log("Data_handler: The following issues were notified:")
    console.log(issue_lst)
    options = {"body": "Stale issue reminder. Begin work OR Reassign issue OR Close if invalid"};
    if(issue_lst.length == 0)
    {
        return ("All issues are taken care of!");
    }
    for(var i=0;i< issue_lst.length;i++){
        await Git_handler.git_create_issue_comment(issue_lst[i], options);
    }
    return("Stale Issues have been notified to the corresponding users")
}

exports.show_stale_issues = show_stale_issues;
exports.get_stale_issues = get_stale_issues;
exports.list_issues = list_issues; //to expose the function to other programs
exports.notify_stale_issues = notify_stale_issues;
exports.list_open_issues = list_open_issues;






(async () => {
    //let w = await list_open_issues();
    //console.log(w);
})();