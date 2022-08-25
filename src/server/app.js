import express from 'express';
import { engine } from 'express-handlebars';
//import { routes} from './routes';

export const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

/* app.use(express.urlencoded({extended: true}))

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})
app.use('/api/productos', routes); */
