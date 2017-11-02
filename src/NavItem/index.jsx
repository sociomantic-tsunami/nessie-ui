import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import NavDropdown          from '../NavDropdown';


export default class NavItem extends Component
{
    static propTypes =
    {
        /**
         *  Navigation role
         */
        role          : PropTypes.oneOf( [ 'default', 'primary', 'sub' ] ),
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
        iconType      : PropTypes.oneOf( [ 'account', 'none' ] ),
        /**
        *  Display as current page
        */
        isCurrent     : PropTypes.bool,
        /*
        *  Display as disabled/read-only
         */
        isDisabled    : PropTypes.bool,
        /*
        * Dropdown menu alignment
         */
        dropdownAlign : PropTypes.oneOf( [ 'left', 'right' ] ),
        /*
        * Dropdown menu is open
         */
        isOpen        : PropTypes.bool,
        /**
         *  Dropdown menu items
         */
        children      : PropTypes.node,
        /**
         *  onMouseOver callback function
         */
        onMouseOver   : PropTypes.func,
        /**
         *  onMouseOut callback function
         */
        onMouseOut    : PropTypes.func,
        /**
         *  onClick callback function
         */
        onClick       : PropTypes.func,
        /**
         * Display as hover when required from another component
         */
        forceHover    : PropTypes.bool
    };

    static defaultProps =
    {
        role          : 'default',
        href          : '#',
        dropdownAlign : 'left',
        iconType      : 'none',
        cssMap        : require( './navItem.css' )
    };

    render()
    {
        const {
            children,
            label,
            className,
            cssMap,
            dropdownAlign,
            forceHover,
            href,
            iconType,
            isCurrent,
            isCurrentPage,
            isOpen,
            isDisabled,
            onClick,
            onMouseOut,
            onMouseOver,
            role
        } = this.props;

        if ( isCurrentPage === true )
        {
            console.warn( `${this.constructor.name}: isCurrentPage is \
deprecated and will be removed in the next major release. Please use \
isCurrent instead.` );
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
                    icon        : iconType
                } }>
                <li
                    className   = { className }
                    onMouseOver = { onMouseOver }
                    onMouseOut  = { onMouseOut }>
                    <a
                        className = { cssMap.link }
                        href      = { href }
                        onClick   = { onClick }>
                        <span>{ label }</span>
                        { ( iconType && iconType !== 'none' ) &&
                            <div className  = { cssMap.icon } />
                        }
                    </a>
                    { children &&
                        <NavDropdown className = { cssMap.dropdown }>
                            { filterNavItems( children ) }
                        </NavDropdown>
                    }
                </li>
            </Css>
        );
    }
}
