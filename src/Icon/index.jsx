import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import styles             from './icon.css';


const Icon = ( {
    children,
    className,
    cssMap,
    forceHover,
    isDisabled,
    label,
    onMouseOut,
    onMouseOver,
    size,
    theme,
    type
} ) =>
{
    let xLink;

    if ( type !== 'none' )
    {
        xLink = `#icon__${type}`;
    }

    return (
        <svg
            className = { buildClassName( className, cssMap, {
                fakeHovered : !isDisabled && forceHover,
                disabled    : isDisabled,
                theme,
                type,
                size,
            } ) }
            aria-label   = { children || label }
            onMouseLeave = { onMouseOut }
            onMouseEnter = { onMouseOver }>
            { xLink && <use xlinkHref = { xLink } /> }
        </svg>
    );
};

Icon.propTypes =
{
    /**
     * Icon label (overrides label prop)
     */
    children    : PropTypes.node,
    /**
     *  CSS class name
     */
    className   : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap      : PropTypes.objectOf( PropTypes.string ),
    /**
     * Display as hover when required from another component
     */
    forceHover  : PropTypes.bool,
    /**
     *  Display as disabled
     */
    isDisabled  : PropTypes.bool,
    /**
     * Icon label
     */
    label       : PropTypes.string,
    /**
     *  onMouseOut callback function: ( e ) = { ... }
     */
    onMouseOut  : PropTypes.func,
    /**
     *  onMouseOver callback function: ( e ) = { ... }
     */
    onMouseOver : PropTypes.func,
    /**
     *  Icon size
     */
    size        : PropTypes.oneOf( [ 'S', 'M', 'L', 'XL', 'XXL' ] ),
    /**
     *  Icon theme
     */
    theme       : PropTypes.oneOf( [
        'light',
        'dark',
        'control',
        'button',
        'navigation',
    ] ),
    /**
     *  Icon to show
     */
    type : PropTypes.oneOf( [
        'account',
        'add',
        'add-circle',
        'alert',
        'approved',
        'bell',
        'board',
        'calendar',
        'close-circle',
        'close-thick',
        'close',
        'dash',
        'dashboard',
        'declined',
        'delete',
        'down',
        'download',
        'duplicate',
        'edit-circle',
        'edit',
        'ended',
        'error',
        'file',
        'graph',
        'hide',
        'info',
        'inspect',
        'left',
        'lightbulb',
        'link',
        'megaphone',
        'options',
        'pending',
        'preview',
        'puzzle-piece',
        'reset',
        'right',
        'search',
        'show',
        'star-stroke',
        'star',
        'swap',
        'table',
        'up',
        'upload',
        'validation',
        'none',
    ] )
};

Icon.defaultProps =
{
    children    : undefined,
    className   : undefined,
    cssMap      : styles,
    forceHover  : false,
    isDisabled  : false,
    label       : undefined,
    onMouseOut  : undefined,
    onMouseOver : undefined,
    size        : 'S',
    theme       : 'light',
    type        : 'none'
};

export default Icon;
