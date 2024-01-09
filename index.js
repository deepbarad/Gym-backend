const connectToMongo = require("./db")
const express = require('express')
const cors = require('cors')
const path = require("path")
const bikesRouter = require("./router")

connectToMongo()
const app = express()
const port = 8000

app.use(cors(
    {
        origin: "*"
    }
))
app.use(express.json())
app.use(express.static(path.join(__dirname, "upload")));

app.use('/api/auth', require('./router/auth'))
app.use('/api/admin', require('./router/joinTable'))
app.use('/api/carousel', require("./router/carousel"))
app.use('/api/trainer', require("./router/trainer"))
app.use('/api/homeContain', require("./router/homeContain"))
app.use('/api/aboutContain', require("./router/aboutContain"))
app.use('/api/gallery', require("./router/gallery"))
app.use('/api/contactUs', require("./router/contactUs"))
app.use('/api/gymStudent', require("./router/gymStudent"))
app.use("/bikes", bikesRouter);

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})