import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
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
    role
} ) =>
{
    if ( typeof isCurrentPage !== 'undefined' )
    {
        console.warn( 'NavItem: isCurrentPage is deprecated and will be \
removed in the next major release. Please use isCurrent instead.' );
    }

    return (
        <Css
            cssMap   = { cssMap }
            cssProps = { {
                role,
                disabled    : isDisabled,
                current     : isCurrent || isCurrentPage,
                dropdownAlign,
                open        : isOpen,
                fakeHovered : forceHover,
                hasIcon     : iconType !== 'none'
            } }>
            <li
                className   = { className }
                onMouseOver = { onMouseOver }
                onMouseOut  = { onMouseOut }>
                <a
                    className = { cssMap.link }
                    href      = { href }
                    onClick   = { onClick }>
                    { ( iconType && iconType !== 'none' ) &&
                        <Icon
                            className = { cssMap.icon }
                            type = { iconType }
                            size = "M" />
                    }
                    <span>{ label }</span>
                </a>
                { children &&
                    <NavDropdown className = { cssMap.dropdown }>
                        { children }
                    </NavDropdown>
                }
            </li>
        </Css>
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
        'none',
        'account',
        'add',
        'calendar',
        'close',
        'delete',
        'down',
        'download',
        'duplicate',
        'edit',
        'info',
        'inspect',
        'left',
        'link',
        'preview',
        'reset',
        'right',
        'search',
        'up',
        'upload',
        'validation',
        'alert',
        'approved',
        'declined',
        'ended',
        'error',
        'pending',
        'show',
        'hide'
    ] ),
    /*
    *  Item represents the current page and/or section
     */
    isCurrentPage : PropTypes.bool,
    /*
    *  Display as disabled/read-only
     */
    isDisabled    : PropTypes.bool,
    /*
     * Display as current page/section
     */
    isCurrent     : PropTypes.bool,
    /*
    * Dropdown menu is open
     */
    isOpen        : PropTypes.bool,
    /**
     *  onClick callback function
     */
    onClick       : PropTypes.func,
    /**
     *  onMouseOut callback function
     */
    onMouseOut    : PropTypes.func,
    /**
     *  onMouseOver callback function
     */
    onMouseOver   : PropTypes.func,
    /**
     *  Navigation role
     */
    role          : PropTypes.oneOf( [ 'default', 'primary', 'sub' ] ),
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
