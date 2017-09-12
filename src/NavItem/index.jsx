import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import NavDropdown          from '../NavDropdown';

const filterNavItems = node =>
{
    const _node = React.Children.toArray( node );

    // eslint-disable-next-line no-shadow
    const isNavItem = node => React.isValidElement( node ) &&
        node.type.name === 'NavItem';

    return _node.filter( isNavItem );
};

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
        isCurrentPage : PropTypes.bool,
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
            isCurrentPage,
            isOpen,
            isDisabled,
            onClick,
            onMouseOut,
            onMouseOver,
            role
        } = this.props;

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { {
                    role,
                    disabled    : isDisabled,
                    current     : isCurrentPage,
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
                        href      = { isCurrentPage ? null : href }
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
