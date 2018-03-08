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
            aria-label  = { children || label }
            onMouseOut  = { onMouseOut }
            onMouseOver = { onMouseOver }>
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
        'accounts',
        'active',
        'add',
        'bell',
        'calendar',
        'campaigns',
        'close',
        'creatives',
        'dashboard',
        'deactivated',
        'declined',
        'delete',
        'down',
        'download',
        'duplicate',
        'edit',
        'error',
        'graph',
        'hide',
        'info',
        'inspect',
        'integrations',
        'left',
        'link',
        'options',
        'preview',
        'reports',
        'reset',
        'right',
        'scheduled',
        'search',
        'show',
        'sociomantic',
        'star-stroke',
        'star',
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
