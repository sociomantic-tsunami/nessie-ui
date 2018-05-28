const calc = require( 'postcss-calc' );
const autoprefixer = require( 'autoprefixer' );
const partialImport = require( 'postcss-partial-import' );
const advancedVariables = require( 'postcss-advanced-variables' );
const customSelectors = require( 'postcss-custom-selectors' );
const customMedia = require( 'postcss-custom-media' );
const customProperties = require( 'postcss-custom-properties' );
const mediaMinMax = require( 'postcss-media-minmax' );
const extend = require( 'postcss-extend' );
const selectorMatches = require( 'postcss-selector-matches' );
const selectorNot = require( 'postcss-selector-not' );
const nested = require( 'postcss-nested' );
const colorFunction = require( 'postcss-color-function' );
const pseudoClassAnyLink = require( 'postcss-pseudo-class-any-link' );
const fontVariant = require( 'postcss-font-variant' );
const replaceOverflowWrap = require( 'postcss-replace-overflow-wrap' );
const initial = require( 'postcss-initial' );
const attributeCaseInsensitive =
    require( 'postcss-attribute-case-insensitive' );


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
            browsers : [ 'last 2 versions', 'ie 10', 'ie 11', 'safari 8' ]
        } ),
    ]
};
