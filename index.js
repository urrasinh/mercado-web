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
        let ruta
        const nombre = elemento.nombre
        const id = elemento.id
        switch (elemento.id) {
            case 1:
                ruta = '/banana.png'
                break;
            case 2:
                ruta = '/cebollas.png'
                break;
            case 3:
                ruta = '/lechuga.png'
                break;
            case 4:
                ruta = '/papas.png'
                break;
            case 5:
                ruta = '/pimenton.png'
                break;
            case 6:
                ruta = '/tomate.png'
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


