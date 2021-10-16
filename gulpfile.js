const {src, dest, watch, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));//en la versión 5 de sass es necesario indicar dentro de gulp-sass el compilador que se utilizará
const autoprefixer = require ('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
/* const concat = require('gulp-concat');
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');
//const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const cache = require('gulp-cache');
const webp = require('gulp-webp'); */

//constante con atributos para llamar a los paths, para configurar los watchs y para compilar y minificar los archivos
const path = {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    imagenes: 'src/img/**/*'
}

//CREACIÓN DE LAS FUNCIONES PARA AUTOMATIZAR LA PRODUCCIÓN DEL CÓDIGO

//función para compilar sass con gulp 
function css(){
   /*  src('src/sass/app.scss')//indicamos el archivo a compilar
        .pipe(sass())//indicamos el compilador
        .pipe(dest('bild/css'))//indicamos el archivo de destino, si no existe lo crea
    done(); */
    return src(path.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))// al indicar al sourcemaps.write el argumento '.' se crea un archivo aparte donde con el source map con un link en el archivo css de destino.
        .pipe(dest('bild/css'));
}
    




//EXPORTS PARA LLAMAR A LAS TAREAS DE GULP

exports.css = css;// el alias con el cual se exporta la tarea de gulp para poder llamarla