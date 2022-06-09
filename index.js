const { Pool } = require('pg')
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()



const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '1313',
    database: 'mercadoweb',
    port: 5432

})


// inicializando servidor 
app.listen(3000, () => {
    console.log('El servidor está inicializado en el puerto 3000')
})

// configuración handlebars
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs.engine({ layoutsDir: __dirname + '/views' }) 
)

// Accecibilizando librerias de Bootstrap y jQuery
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/js'))
app.use('/bootstrap', express.static(__dirname + '/node_modules/jquery/dist'))

//  Definir la carpeta “assets” como carpeta pública del servidor
app.use(express.static('assets/imgs'))

// ruta de la página inicial
app.get('/', async (req, res) => {
    const resultados = await pool.query('SELECT * FROM frutas')
    console.log(resultados.rows)
    const resultadosRows = resultados.rows
    const mapeoFrutas = resultadosRows.map((elemento) => {
        const id = elemento.id
        const nombre = elemento.nombre
        const ruta = elemento.img
            return { id, nombre, ruta }
    })
    res.render('dashboard', {
        layout: 'dashboard',
        frutas: mapeoFrutas
    })
})


