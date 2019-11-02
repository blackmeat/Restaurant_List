const express = require("express")
const exphbs = require("express-handlebars")
const app = express()
const port = 3000
const restaurant = require("./restaurant.json")

// 將佈局（main)設成預設模式
app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")


app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurant.results })
})

app.get(`/restaurants/:restaurant_id`, (req, res) => {
  const restaurantinf = restaurant.results.filter(item => {
    return item.id == req.params.restaurant_id
  })
  res.render("show", { restaurant: restaurantinf[0] })
})

app.get("/search", (req, res) => {
  const restaurantsearch = restaurant.results.filter(item => {
    return item.name.includes(req.query.keyword)
  })
  res.render("index", { restaurants: restaurantsearch, keyword: req.query.keyword })
})
// 套入靜態檔案publics資料夾裡
app.use(express.static("publics"))

// 設置監聽 啟動伺服器
app.listen(port, () => {
  console.log(`This express created on http://localhost:${port}`)
})