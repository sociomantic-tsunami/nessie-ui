import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import styles             from './icon.css';


const iconsWithVariants = [
    'alert',
    'approved',
    'declined',
    'ended',
    'error',
    'pending',
];

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
    type,
    variant,
} ) =>
{
    let xLink;

    if ( type !== 'none' )
    {
        xLink = iconsWithVariants.includes( type ) ?
            `#icon__${type}-${variant}` : `#icon__${type}`;
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
        'alert',
        'approved',
        'calendar',
        'close',
        'declined',
        'delete',
        'down',
        'download',
        'duplicate',
        'edit',
        'ended',
        'error',
        'hide',
        'info',
        'inspect',
        'left',
        'link',
        'pending',
        'preview',
        'reset',
        'right',
        'search',
        'show',
        'up',
        'upload',
        'validation',
        'none',
    ] ),
    /**
    *  Icon variant to show
    */
    variant : PropTypes.oneOf( [ 'fill', 'stroke' ] ),
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
    type        : 'none',
    variant     : 'fill',

};

export default Icon;
