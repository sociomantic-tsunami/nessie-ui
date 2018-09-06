/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React     from 'react';
import PropTypes from 'prop-types';

import {
    buildClassName,
    createEventHandler,
    generateId,
} from '../utils';
import Icon        from '../Icon';
import NavDropdown from '../NavDropdown';
import styles      from './navItem.css';


const NavItem = ( {
    children,
    className,
    cssMap,
    dropdownAlign,
    forceHover,
    href,
    iconType,
    id = generateId( 'NavItem' ),
    isCurrent,
    isDisabled,
    isOpen,
    label,
    onClick,
    onMouseOut,
    onMouseOver,
    role,
} ) => (
    <li
        className = { buildClassName( className, cssMap, {
            current     : isCurrent,
            disabled    : isDisabled,
            dropdownAlign,
            fakeHovered : forceHover,
            hasIcon     : iconType !== 'none',
            open        : isOpen,
            role,
        } ) }
        onClick     = { createEventHandler( onClick, { id } ) }
        onMouseOut  = { createEventHandler( onMouseOut, { id } ) }
        onMouseOver = { createEventHandler( onMouseOver, { id } ) }>
        <a
            className = { cssMap.link }
            href      = { href }>
            { ( iconType && iconType !== 'none' ) &&
                <Icon
                    className = { cssMap.icon }
                    size      = "S"
                    type      = { iconType } />
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
        'add',
        'add-circle',
        'alert',
        'approved',
        'arrow',
        'bell',
        'board',
        'calendar',
        'close',
        'close-circle',
        'close-thick',
        'dash',
        'dashboard',
        'declined',
        'delete',
        'down',
        'download',
        'duplicate',
        'edit',
        'edit-circle',
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
        'star',
        'star-stroke',
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
