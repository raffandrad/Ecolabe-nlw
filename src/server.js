const express = require("express")
const server = express()

//receber o baco de dados
const db = require("./database/db")

//configurar pasta public
server.use(express.static("public"))

//habilitar o uso do reqbody na aplicação
server.use(express.urlencoded({extended: true})) 

//utilizando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar rotas do servidor
//pagina inicial
//req: requisição, res: resposta
server.get("/", (req, res) => {
    return res.render("index.html", {})
} )

server.get("/create-point", (req, res) => {
    //req.query: recebe as query strings do meu url
   // req.query

    return res.render("create-point.html",)
})

server.post("/savepoint", (req, res) => {
    //req.body: o corpo do formulario
    //inserir dados no banco de dados 

    const query = `
           INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    function afterInsertData(err) {
        if(err) {
            return console.log(err)
            res.send("Erro no cadastro")
        }
        console.log("cadastrado com sucesso")
        console.log(this)
    }

    db.run(query, values, afterInsertData)

    return res.render("create-point.html", { saved: true })
})


server.get("/search-results", (req, res) => {
    const search = req.query.search

    if(search === "") {
        return res.render("search-results.html", {places: rows, total})
    } 

    //pegar dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        const total = rows.length
        //importar os dados para a agina html de search
        return res.render("search-results.html", {places: rows, total})
    })
})

// ligar o servidor
server.listen(3000) 