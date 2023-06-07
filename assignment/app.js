const http = require('http')
const https = require('https')

const server = http.createServer((req,res) => {

    const url = req.url
    const method = req.method
    
    if (url === "/" && method === "GET"){
        res.setHeader("Content-Type" , "text/html")
        res.write("<html>")
        res.write("<head>Hello FORM</head>")
        res.write('<body><form method="POST" action="/create-user"><input type="text" name="msg"><button type="submit">Submit</button></form></body>')
        return res.end()
    }

    if (url === "/users" && method === "GET"){
        res.setHeader("Content-Type" , "text/html")
        res.write("<html>")
        res.write("<head>LIST users</head>")
        res.write("<ul><li>User 1</li><li>User 2</li></ul>")
        return res.end()
    }

    if (url === "/create-user" && method === "POST"){

        const formData = []
        req.on("data" , (chunk) =>{
            // console.log(chunk)
            formData.push(chunk)
        })

        // console.log(formData)
         req.on("end" , () => {
            const body = Buffer.concat(formData).toString();

            console.log(body.split("=")[1])

            res.statusCode = 302
            res.setHeader('Location', '/')
            res.end()
        })




    }

    // res.setHeader("Content-Type" , "text/html")
    // res.write("<html>")
    // res.write("<head>Hello</head>")
    // res.write("<h1>Hello World</h1>")
    // res.end()

})

server.listen(3000);

