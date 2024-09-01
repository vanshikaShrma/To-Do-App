let http = require('http');
let fs = require('fs')
let email;
let arr = [];
const server = http.createServer((req,res)=>{
    console.log(req.url)
    if(req.url=="/")
    {
     fs.readFile("home.html","utf-8",(err,data)=>{
        if(err) console.log(err)
            res.setHeader("Content-type","text/html")
        res.write(data)
        res.end()
     })
    }
    else if(req.url=="/script1.js"){
        fs.readFile("script1.js","utf-8",(err,data)=>{
            if(err) console.log(err)
            res.setHeader("Content-type","text/js")
            res.write(data);
            res.end();

    })
    
}
else if(req.url=="/login"){
    res.end("sdfsdfs")
}
else if(req.url=="/signup"){
    let temp = ""
    req.on("data", (chunk) =>{
        temp += chunk.toString()
    })
    req.on("end", () => {
        
    })
    fs.readFile("signup.html","utf-8",(err,data)=>{
        if(err) console.log(err)
        res.setHeader("Content-type","text/html")
        res.write(data);
        res.end();
})
}
else if(req.url=="/signUp.css")
{
    fs.readFile("signUp.css","utf-8",(err,data)=>{
        if(err) console.log(err)
        res.setHeader("Content-type","text/css")
        res.write(data);
        res.end();})
}
else if(req.url=="/signin")
{
    fs.readFile("signin.html","utf-8",(err,data)=>{
        if(err) console.log(err)
        res.setHeader("Content-type","text/html")
        res.write(data);
        res.end();
})

}
else if(req.url=="/todo"  && req.method=="GET")
{
    fs.readFile("todo.html" , "utf-8" , (err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.writeHead(200 , {"Content-Type":"text/html"});
            res.write(data);
            res.end();
        } 
    })

}
else if(req.url=="/signIn.css")
    {
        fs.readFile("signIn.css","utf-8",(err,data)=>{
            if(err) console.log(err)
            res.setHeader("Content-type","text/css")
            res.write(data);
            res.end();})
    }
    else if(req.url=="/abc")
    { console.log("sdf")
        let body = "";
        req.on("data" , (chunk)=>{
            body+=chunk.toString();
        })
        req.on("end" , ()=>{
            
            body = JSON.parse(body);
             fs.readFile("./file.txt" , "utf-8" , (err,data)=>{
               
                if(data.toString()=="")
                {
                    console.log("jiighkg");
                    arr= [];
                    arr.push(body);
                }
                else{
                    arr = JSON.parse(data);
                    arr.push(body);
                }
                fs.writeFile("./file.txt" , JSON.stringify(arr) , ()=>{
                    console.log("jj");
                });
            })
           

           
            
        }) 
        res.end("done");
    }
    else if(req.url == "/datain")
    {
        let dd = "";
        req.on("data" , (chunk)=>{
            dd+=chunk.toString();
        })
        req.on("end" , ()=>{
            let userData = JSON.parse(dd);
            console.log(userData);
            fs.readFile("./file.txt","utf-8",(err,data) =>{
                
                let users = JSON.parse(data)||[];
                let user = users.findIndex(e => e.mail == userData.email && e.pass == userData.password);
                console.log(email);
                
                if(user!= -1)
                {
                    email = users[user].mail;
                    res.writeHead(200,{"Content-Type":"application/json"});
                    res.write(JSON.stringify({success:true , message: "Login Successful" , index:user}));
                    res.end();
                }
                else{
                    res.writeHead(401 , {"Content-Type":"application/json"});
                    res.write(JSON.stringify({success:false , message:"Invalid credentials" , index:user }));
                    res.end();
                }

            })
        })
    }
    else if(req.url=="/task")
    {
        let Data = "";
        req.on("data" , (chunk)=>{
        Data+=chunk.toString();
        })

        req.on("end" , ()=>{
        Data = JSON.parse(Data);
        fs.readFile("./file.txt","utf-8",(err,data)=>{
            if(err){
                console.log(err);
            }

            else{
                let parsedData = JSON.parse(data);
                let index = parsedData.findIndex(u => u.mail == email)
                parsedData[index].todos.push(Data);
                console.log(parsedData);

                fs.writeFile("./file.txt" , JSON.stringify(parsedData) , (err)=>{
                    if(err)
                    {
                        res.writeHead(500,{"Content-Type":"text/plain"});
                        res.write("Failed to save data");
                        res.end();
                    }
                    else{
                        res.writeHead(200 , {"Content-Type":"text/plain "});
                        res.write(JSON.stringify(index));
                        res.end();
                    }
                })
            }
        })

        })
    }
    else if(req.url=="/data")
    {
        fs.readFile("./file.txt" , "utf-8" , (err,data)=>{
            if(err)
            {
                console.log(err); 
            }
            else{
                let users = JSON.parse(data);
                let index = users.findIndex(u=>u.mail==email);
                res.writeHead(200,{"Content-Type":"application/json"})
                res.write(JSON.stringify({data:users , indx : index}));
                res.end();
            }
            
        })
    }
    else if (req.url == "/del") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const { todo } = JSON.parse(body);

            fs.readFile("./file.txt", "utf-8", (err, data) => {
                if (err) {
                    console.log(err);
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Error reading file");
                } else {
                    let users = JSON.parse(data);
                    let index = users.findIndex(u => u.mail == email);

                    if (index !== -1) {
                        users[index].todos = users[index].todos.filter(item => item.todo !== todo);

                        fs.writeFile("./file.txt", JSON.stringify(users), (err) => {
                            if (err) {
                                res.writeHead(500, { "Content-Type": "text/plain" });
                                res.end("Error writing file");
                            } else {
                                console.log("done");
                                res.writeHead(200, { "Content-Type": "application/json" });
                                res.end(JSON.stringify({ success: true }));
                            }
                        });
                    } else {
                        res.writeHead(404, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ success: false, message: "User not found" }));
                    }
                }
            });
        });
    }
})




server.listen(4000,()=>
{
    console.log("running");
})