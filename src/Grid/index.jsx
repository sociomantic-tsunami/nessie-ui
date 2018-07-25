import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import styles             from './grid.css';

const deprecatedSpacingOptions = [ 'default', 'h1', 'h2', 'h3', 'h4', 'label' ];

const Grid = ( {
    align,
    children,
    className,
    cssMap,
    onClick,
    onMouseOut,
    onMouseOver,
    gutters,
    hasMinHeight,
    hasWrap,
    role,
    spacing,
    verticalAlign,
} ) =>
{
    if ( deprecatedSpacingOptions.includes( spacing ) &&
        !Grid.didWarn[ spacing ] )
    {
        console.warn( `Grid spacing option '${spacing}' is depreacted. Please \
use one of 'S', 'M', 'L' or 'none' instead.` );
        Grid.didWarn[ spacing ] = true;
    }
    if ( !Grid.didWarn.hasMinHeight && hasMinHeight !== undefined )
    {
        console.warn( 'Grid: hasMinHeight prop is deprecated. Please use an \
alternative layout.' );
        Grid.didWarn.hasMinHeight = true;
    }

    return (
        <div
            className = { buildClassName( className, cssMap, {
                alignX  : align,
                alignY  : verticalAlign,
                hasMinHeight,
                gutters : gutters !== 'none' && gutters,
                wrap    : hasWrap,
                spacing : spacing !== 'none' && spacing,
            } ) }
            onClick      = { onClick }
            onMouseEnter = { onMouseOver }
            onMouseLeave = { onMouseOut }
            role         = { role && role !== 'none' ? role : null }>
            { children }
        </div>
    );
};

Grid.propTypes =
{
    /**
     * Horizontal alignment of the columns (“auto” makes all columns equal
     * width)
     */
    align         : PropTypes.oneOf( [ 'auto', 'left', 'center', 'right' ] ),
    /**
     *  Grid content (Columns)
     */
    children      : PropTypes.node,
    /**
     *  CSS class name
     */
    className     : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap        : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Gutter size
     */
    gutters       : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
    /**
     * Wrap content
     */
    hasWrap       : PropTypes.bool,
    /**
     *  onClick callback function:
     *  ( e ) => { ... }
     */
    onClick       : PropTypes.func,
    /**
     *  onMouseOut callback function:
     *  ( e ) => { ... }
     */
    onMouseOut    : PropTypes.func,
    /**
     *  onMouseOver callback function:
     *  ( e ) => { ... }
     */
    onMouseOver   : PropTypes.func,
    /**
     *  Grid role
     */
    role          : PropTypes.string,
    /**
     *  Row spacing
     */
    spacing       : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
    /**
     * Vertical alignment of the columns (“auto” makes all columns equal
     * height)
     */
    verticalAlign : PropTypes.oneOf( [ 'auto', 'top', 'middle', 'bottom' ] ),
};

Grid.defaultProps =
{
    align         : 'auto',
    children      : undefined,
    className     : undefined,
    cssMap        : styles,
    gutters       : 'M',
    hasWrap       : true,
    onClick       : undefined,
    onMouseOut    : undefined,
    onMouseOver   : undefined,
    role          : undefined,
    spacing       : 'M',
    verticalAlign : 'auto',
};

Grid.didWarn = {};

export default Grid;
