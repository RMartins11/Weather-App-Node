const path = require("path")
const express = require("express")
const hbs = require("hbs")
const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
  res.render("index", {
    title:"Weather App",
    name: "Ricardo Martins"
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title:"About me",
    name: "Ricardo Martins"
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    title:"Help",
    message:"How can we help you?",
    name: "Ricardo Martins"
  })
})


app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You most provide an address"
    }) 
  } else {
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error })
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        })
      })
    })
  }
})

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term"
    })
  } else {
  res.send({
    products: []
  })
  }
})

app.get("/help/*", (req, res) => {
  res.render("404",{
    title:"404 Page not Found",
    message:"Article not found",
    name:"Ricardo Martins"
  })
})

app.get("*", (req, res) => { //Este tem sempre de vir em ultimo, para garantir que passa por todos os possiveis matches, antes de chegar a este. O * indica que são todos os possiveis resultados, exceto os que estão previamente listados
  res.render("404",{
    title:"404 Page not Found",
    message:"Page not found",
    name:"Ricardo Martins"
  })
})

app.listen(5000, () => {
  console.log("Server is up on port 5000")
})