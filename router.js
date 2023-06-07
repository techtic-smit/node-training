const fs = require('fs')

const requestHandler = (req,res) => {

    const url = req.url
    const method = req.method
    
    if (url === '/'){
    
        res.write('<html>')
        res.write('<head><title>My Form</title></head>')
        res.write('<body><form method="POST" action="/message"><input type="text" name="message"><button type="submit">Submit</button></body')
        res.write('<html>')
        return res.end()
    
    }
    
    if (url === '/message' && method === 'POST'){
    
        const body = []
        
    
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk)
        })
    
        return req.on('end' , () => {
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1]
            fs.writeFile('message.txt',message , (error) => {
    
                res.statusCode = 302
                res.setHeader('Location' , '/')
                return res.end()
            })
            // fs.writeFileSync('output.txt' , "DUMMY")
    
        })        
    }
    
    // console.log(req.url ,req.headers , req.method)
    
    res.setHeader('Content-Type' , 'text/html');
    res.write("<html>")
    res.write('<h1>hello world</h1>');
    res.write('</html>')
    res.end()
}

// module.exports.requestHandler = requestHandler
// module.exports.someText = "hard text"

module.exports = {
    requestHandler : requestHandler,
    message : "Some Text"
}

// exports.handler = requestHandler
// exports.message = "Some Text"