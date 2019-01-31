const advancedVariables = require( 'postcss-advanced-variables' );
const attributeCaseInsensitive =
    require( 'postcss-attribute-case-insensitive' );
const autoprefixer = require( 'autoprefixer' );
const calc = require( 'postcss-calc' );
const colorFunction = require( 'postcss-color-function' );
const customMedia = require( 'postcss-custom-media' );
const customProperties = require( 'postcss-custom-properties' );
const customSelectors = require( 'postcss-custom-selectors' );
const extend = require( 'postcss-extend' );
const fontVariant = require( 'postcss-font-variant' );
const initial = require( 'postcss-initial' );
const mediaMinMax = require( 'postcss-media-minmax' );
const nested = require( 'postcss-nested' );
const partialImport = require( 'postcss-partial-import' );
const pseudoClassAnyLink = require( 'postcss-pseudo-class-any-link' );
const replaceOverflowWrap = require( 'postcss-replace-overflow-wrap' );
const selectorMatches = require( 'postcss-selector-matches' );
const selectorNot = require( 'postcss-selector-not' );
const cssNano = require( 'cssnano' );


module.exports = {
    plugins :
    [
        partialImport,
        advancedVariables,
        customSelectors,
        customMedia,
        customProperties( { preserve: false } ),
        mediaMinMax,
        nested,
        extend,
        selectorMatches,
        selectorNot,
        pseudoClassAnyLink,
        fontVariant,
        replaceOverflowWrap,
        initial,
        attributeCaseInsensitive,
        calc,
        colorFunction,
        autoprefixer( {
            browsers : [ 'last 2 versions', 'ie 10', 'ie 11', 'safari 8' ],
        } ),
        process.env.REACT_WEBPACK_ENV !== 'dev' ? cssNano : undefined,
    ],
};
