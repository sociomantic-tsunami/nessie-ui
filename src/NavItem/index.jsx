/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';
import Icon                 from '../Icon';
import NavDropdown          from '../NavDropdown';
import styles               from './navItem.css';


const NavItem = ( {
    children,
    label,
    className,
    cssMap,
    dropdownAlign,
    forceHover,
    href,
    iconType,
    isCurrentPage,
    isCurrent,
    isOpen,
    isDisabled,
    onClick,
    onMouseOut,
    onMouseOver,
    role,
} ) =>
{
    if ( typeof isCurrentPage !== 'undefined' )
    {
        console.warn( 'NavItem: isCurrentPage is deprecated and will be \
removed in the next major release. Please use isCurrent instead.' );
    }

    return (

        <li
            className     = { buildClassName( className, cssMap, {
                role,
                disabled    : isDisabled,
                current     : isCurrent || isCurrentPage,
                dropdownAlign,
                open        : isOpen,
                fakeHovered : forceHover,
                hasIcon     : iconType !== 'none',
            } ) }
            onMouseEnter  = { onMouseOver }
            onMouseLeave  = { onMouseOut }>
            <a
                className = { cssMap.link }
                href      = { href }
                onClick   = { onClick }>
                { ( iconType && iconType !== 'none' ) &&
                <Icon
                    className = { cssMap.icon }
                    type = { iconType }
                    size = "S" />
                }
                <span>{ label }</span>
            </a>
            { children &&
            <NavDropdown className = { cssMap.dropdown }>
                { children }
            </NavDropdown>
            }
        </li>

    );
};

NavItem.propTypes =
{
    /**
     *  Dropdown menu items
     */
    children      : PropTypes.node,
    /*
    * Dropdown menu alignment
     */
    dropdownAlign : PropTypes.oneOf( [ 'left', 'right' ] ),
    /**
     * Display as hover when required from another component
     */
    forceHover    : PropTypes.bool,
    /**
     *  navItem text
     */
    label         : PropTypes.node,
    /**
     *  HTML href attribute
     */
    href          : PropTypes.string,
    /**
     *  Icon to show
     */
    iconType      : PropTypes.oneOf( [
        'account',
        'add-circle',
        'add',
        'alert',
        'approved',
        'arrow',
        'arrow-up',
        'arrow-down',
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
        'loader',
        'megaphone',
        'options',
        'paused',
        'pending',
        'preview',
        'puzzle-piece',
        'reset',
        'right',
        'search',
        'show',
        'star-stroke',
        'star',
        'sociomantic',
        'swap',
        'table',
        'up',
        'upload',
        'validation',
        'none',
    ] ),
    /*
    *  Display as disabled/read-only
     */
    isDisabled  : PropTypes.bool,
    /*
     * Display as current page/section
     */
    isCurrent   : PropTypes.bool,
    /*
    * Dropdown menu is open
     */
    isOpen      : PropTypes.bool,
    /**
     *  onClick callback function
     */
    onClick     : PropTypes.func,
    /**
     *  onMouseOut callback function
     */
    onMouseOut  : PropTypes.func,
    /**
     *  onMouseOver callback function
     */
    onMouseOver : PropTypes.func,
    /**
     *  Navigation role
     */
    role        : PropTypes.oneOf( [ 'default', 'primary', 'sub' ] ),
};

NavItem.defaultProps =
{
    cssMap        : styles,
    dropdownAlign : 'left',
    href          : '#',
    iconType      : 'none',
    isCurrent     : false,
    isDisabled    : false,
    isOpen        : false,
    role          : 'default',
};

export default NavItem;
