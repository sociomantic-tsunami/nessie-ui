let path =require( 'path' );
var copyfiles = require('copyfiles');
let exec = require('child_process').exec;


/**
 * REACTDOM
 * @type {Array}
 */
let reactDOM = [
    path.resolve(__dirname, 'node_modules/react-dom/dist/react-dom.js'),

    path.resolve( __dirname, '.lochness/site/node_modules/react-dom/dist/' )
]

/**
 * REACT
 * @type {Array}
 */
copyfiles( reactDOM, true, ( err ) =>
{

    if( err )
    {
        console.log(err);
    }
});

let react = [
    path.resolve(__dirname, 'node_modules/react/dist/react.js'),

    path.resolve( __dirname, '.lochness/site/node_modules/react/dist/' )
]

/**
 * PROPTYPES
 * @type {Array}
 */
copyfiles( react, true, ( err ) =>
{
    if( err )
    {
        console.log(err);
    }
});

let propTypes = [
    path.resolve(__dirname, 'node_modules/prop-types/prop-types.js'),
    path.resolve( __dirname, '.lochness/site/node_modules/prop-types/' )
]

copyfiles( propTypes, true, ( err ) =>
{

    if( err )
    {
        console.log(err);
    }
});





/**
 * SITE FILES
 * @type {Array}
 */
let siteFiles = [
    '.lochness/dist/*',
     '.lochness/site'
]

copyfiles( siteFiles, true, ( err ) =>
{
    if( err )
    {
        console.log(err);
    }
});

/**
 * SITE ASSETS
 * @type {Array}
 */
let assetFiles = [
    '.lochness/dist/assets/*',
    // '.lochness/dist/assets',

     '.lochness/site/assets/'
]

copyfiles( assetFiles, true, ( err ) =>
{
    if( err )
    {
        console.log(err);
    }
});


/**
 * SITE ASSETS
 * @type {Array}
 */
let fonts = [
    '.lochness/dist/assets/fonts/*',
    // '.lochness/dist/assets',

     '.lochness/site/assets/fonts'
]

copyfiles( fonts, true, ( err ) =>
{
    if( err )
    {
        console.log(err);
    }
});


/**
 * PROPTYPES
 * @type {Array}
 */
let nessieFiles = [
    path.resolve(  'dist/*'),

    path.resolve( '.lochness/site/' )
]

copyfiles( nessieFiles, true, ( err ) =>
{

    if( err )
    {
        console.log( err);
    }
});

// console.log( 'LN files copied');
//    "setupLN": "node deployLN.js && sed -i '' 's/\\/assets/assets/g' .lochness/site/index.html",

///// sed -i '' 's/\"\/assets/\"assets/g' .lochness/site/index.html
// exec(`sed -i '' 's/\\"\\\/assets/assets/g' .lochness/site/index.html`, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });
