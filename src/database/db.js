//importar o sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar o objt que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

/*utilizar o obj de banco de dados para nossas operações 
//db.serialize(() => {
//    criar uma tabela com comandos sql
//    db.run(`
//        CREATE TABLE IF NOT EXISTS places (
//            id INTEGER PRIMARY KEY AUTOINCREMENT,
//            image TEXT,
//            name TEXT,
//            address TEXT,
//            address2 TEXT,
//           state TEXT,
//            city TEXT,
//           items TEXT 
//        );
//    `)
//inserir dados na tabela
//        const query = `
//        INSERT INTO places (
//            image,
//            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        "https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=861&q=80",
        "Colectoria",
        "Guilherme Gemballa, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }
        console.log("cadastrado com sucesso")
        console.log(this)
    }

   // db.run(query, values, afterInsertData)
    //consultar dados da tabela
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        console.log("aqui estão os registros")
        console.log(rows)
    })

    //deletar dados da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
    //    if(err) {
    //       return console.log(err) 
    //    }
    //    console.log("registro deletado com sucesso")
    //})
})
*/
