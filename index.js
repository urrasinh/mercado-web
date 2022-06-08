const express = require("express")
const app = express()
const exphbs = require('express-handlebars')
const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '1313',
    database: 'mercadoweb',
    port: 5432

})



app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000")
})


app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs.engine({ layoutsDir: __dirname + '/views' })
)


app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/js'))
app.use('/bootstrap', express.static(__dirname + '/node_modules/jquery/dist'))

app.use(express.static('assets/imgs'))

// ruta de la página inicial
app.get("/", async (req, res) => {
    const resultados = await pool.query('SELECT * FROM frutas')
    const resultadosRows = resultados.rows
    const mapeoFrutas = resultadosRows.map((e) => {
        let ruta
        const nombre = e.nombre
        switch (e.id) {
            case 1:
                ruta = '/Banana'
                break;
            case 2:
                ruta = '/Cebolla'
                break;
            case 3:
                ruta = '/Lechuga'
                break;
            case 4:
                ruta = '/Papa'
                break;
            case 5:
                ruta = '/Pimenton'
                break;
            case 6:
                ruta = '/Tomate'
                break;
            default:
                console.log('no encontrado')

        }
        return { nombre, ruta, id }
    })

    res.render('dashboard', {
        layout: 'dashboard',
        frutas: mapeoFrutas
    })
})


