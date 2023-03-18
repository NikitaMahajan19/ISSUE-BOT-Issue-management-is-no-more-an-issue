const { expect } = require('chai');
const Git_handler = require('./git_handler.js');
const User_handler = require('./user_handler.js');


// async function forcreate issue function



async function create_issue(msg)
{
    try
    {
        const keywords = new Set(["title:", "type:", "labels:", "body:", "assignee:"]);
        const priority_types = new Set(["t-1","t-2","t-3"])
        words = msg.toLowerCase().split(' ');
        
        
        options = {"labels": []};

        var prev_key = "";
        var prev_val = "";

        for(i in words)
        {
            if(keywords.has(words[i]))
            {
                if(prev_key == "")
                {
                    prev_key = words[i].slice(0,-1);
                    prev_val = ""
                }
                else
                
                {
                    if(prev_key == "type")
                    {
                        if(priority_types.has(prev_val))
                        {
                            options["labels"].push(prev_val);
                        }
                        else
                        {
                            return("Please enter a valid type parameter, accepeted options t-1,t-2,t-3")
                        }
                    }
                    else if(prev_key == "labels")
                    {
                        if(priority_types.has(prev_val))
                        {
                            return("Please enter a valid label parameter cannot be t-1,t-2,t-3")
                        }
                        else
                        {
                            options["labels"].push(prev_val);   
                        }
                    }
                    else
                    {
                        options[prev_key] = prev_val;
                    }
                    prev_val = "";
                    prev_key = words[i].slice(0,-1);
                }
            } 
            else
            {
                if(prev_key == "body" || prev_key == "title")
                {
                    prev_val = prev_val + " " + words[i];
                }
                else
                {
                    prev_val = prev_val + words[i];
                }
            }
        }

        if(prev_key == "type")
        {
            if(priority_types.has(prev_val))
            {
                options["labels"].push(prev_val);
            }
            else
            {
                return("Please enter a valid type parameter, accepeted options t-1,t-2,t-3")
            }
        }
        else if(prev_key == "labels")
        {
            if(priority_types.has(prev_val))
            {
                            return("Please enter a valid label parameter cannot be t-1,t-2,t-3")
            }
            else
            {
                            options["labels"].push(prev_val);   
            }
        }
        else
        {
            options[prev_key] = prev_val;
        }

        //Default add t-3, if the type value is not specified
        if(!msg.includes("type:"))
        {
            options["labels"].push("t-3");
        } 

        if(!("title" in options))
        {
            return("Mandatory attribute title missing");
        }
        console.log(options)
        let git_output = await Git_handler.git_create_issue(options);
        return("Created issue " +  git_output.number + " on github");
    }
    catch(e)
    {
        console.log(e)
        return("Internal error, please check input or please check the server logs")
    }
}



async function close_issue(msg)
{
    var words = msg.toLowerCase().split(' ');
    found_issue_number = false;
    for(i in words)
    {
        if(words[i].includes('#'))
        {
            var issue_number = words[i].substring(1);
            found_issue_number = true;
            break;
        }
    }
    if(found_issue_number)
    {
        return(await User_handler.reduce_score_user_db(issue_number))
    }
    else
    {
        return("Please mention the issue number as #")
    }
    
}



exports.create_issue = create_issue; //to expose the function to other programs
exports.close_issue = close_issue;





(async () => {
    //let w = await create_issue("create issue with title: abcd without type");
    //console.log(w);
})();