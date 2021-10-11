const {src, dest, watch, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
//en la versión 5 de sass es necesario indicar dentro de gulp-sass el compilador que se utilizará, en este caso sass


//función para compilar sass con gulp 
function css(done){
    src('src/sass/app.scss')//indicamos el archivo a compilar
        .pipe(sass())//indicamos el compilador
        .pipe(dest('bild/css'))//indicamos el archivo de destino, si no existe lo crea
    done();
}

exports.css = css;// el alias con el cual se exporta la tarea de gulp para poder llamarla