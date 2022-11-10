const express = require("express")
const upload = require("express-fileupload")
const fs = require("fs")

const app = express()

app.use(upload())

fs.readFile("./upload/sample.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(data);
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req,res) => {
    if(req.files) {
        console.log(req.files)
        var file = req.files.file
        var filename = file.name
        console.log(filename);

        file.mv("./upload/" + filename, function(err) {
            if (err) {
                res.send(err)
            } else {
                res.send("File uploaded")
            }
        })
    }
})

app.listen(5000)