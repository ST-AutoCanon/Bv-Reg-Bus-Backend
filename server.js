require('dotenv').config()
const express = require("express")
const bodyParser = require('body-parser');
const path = require('path'); 
const cors = require("cors")
const port = 3009;
const { getMongoConnection } = require("./controllers/mongoService")
const { registerRoutes } = require("./routes/routesRegistry")

const app = express()
app.enable("trust proxy") 
app.use(cors({}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(bodyParser.json({ limit: '20mb' }));
// app.use(bodyParser());


// Serves static files from the '/home/auto-canon-be/uploads' directory
// when accessed via the '/uploads' route in the URL.
app.use('/uploads', express.static('/home/auto-canon-be/uploads'));
app.use('/footerUploads', express.static(path.join(__dirname, 'footerUploads')));

//
app.get("/api", async (req, res) => {
  res.status(200).json({'message': `node-app running on port ${port}`})
});

getMongoConnection()
registerRoutes(app)
app.listen(port, () => console.log(`server started on port ${port}`))