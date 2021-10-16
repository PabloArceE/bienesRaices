const {src, dest, watch, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));//en la versión 5 de sass es necesario indicar dentro de gulp-sass el compilador que se utilizará
const autoprefixer = require ('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser-js');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
/* //const imagemin = require('gulp-imagemin');
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

//función para compilar sass con gulp, minificar css y crear un sourcemap 
function css(){  
    return src(path.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('bild/css'));         
}
/* 
- indicamos la ruta de los archivos 
- iniciamos la captura del sourcemaps
- compilamos sass
- con postcss integramos autoprefixer(adaptador para los distintos navegadores) y cssnano (minificador de css)
- indicamos a sourcemaps crear un archivo nuevo con el mapa
- indicamos la carpeta de destino 
 */
    
//función para el archivo javascript

function javascript(){
    return src(path.js)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(rename({suffix: '-min'}))
    .pipe(dest('bild/js'));
}
/* 
- con terser comprimimos el ES6 y versiones más nuevas
- concat concatena todos los archivos js especificados en src() en un nuevo archivo con el nombre ingresado en concat('nombre')
- rename permite renombrar archivos a través de varios métodos. En este caso agregamos el sufijo min para indicar que el archivo ya fue minificado
*/



//EXPORTS PARA LLAMAR A LAS TAREAS DE GULP

exports.css = css;// export.alias = nombre de la función
exports.js = javascript;