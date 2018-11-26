/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Children }            from 'react';
import PropTypes                      from 'prop-types';

import { Fieldset }                   from '../index';
import { buildClassName, generateId } from '../utils';
import ThemeContext                   from '../Theming/ThemeContext';
import { evalTheme }                  from '../Theming/withTheme';

export default class CheckableGroup extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Checkboxes, Radios, etc. in the group
         */
        children              : PropTypes.node,
        /**
         *  Extra CSS class name
         */
        className             : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap                : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Tooltip message text (string or JSX)
         */
        errorMessage          : PropTypes.node,
        /**
         *  Tooltip is displayed
         */
        errorMessageIsVisible : PropTypes.bool,
        /**
         * Force display as hover
         */
        forceHover            : PropTypes.bool,
        /**
         *  Display as error/invalid
         */
        hasError              : PropTypes.bool,
        /**
         *  Component id
         */
        id                    : PropTypes.string,
        /**
         *  Display as disabled
         */
        isDisabled            : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly            : PropTypes.bool,
        /**
         *  Group label text string or JSX node
         */
        label                 : PropTypes.node,
        /**
         *  How to lay out the Checkboxes, Radios, etc.
         */
        layout                : PropTypes.oneOf( [ 'horizontal', 'vertical' ] ),
        /**
         *  HTML name attribute of Checkables in group
         */
        name                  : PropTypes.string,
        /**
         *  onChange callback function : ( e ) => { ... }
         */
        onChange              : PropTypes.func,
        /**
         *  onMouseOut callback function : ( e ) => { ... }
         */
        onMouseOut            : PropTypes.func,
        /**
         *  onMouseOver callback function : ( e ) => { ... }
         */
        onMouseOver           : PropTypes.func,
    };

    static defaultProps =
    {
        children              : undefined,
        className             : undefined,
        errorMessage          : undefined,
        errorMessageIsVisible : false,
        forceHover            : false,
        hasError              : false,
        id                    : undefined,
        isDisabled            : false,
        isReadOnly            : false,
        layout                : 'horizontal',
        name                  : undefined,
        onChange              : undefined,
        onMouseOut            : undefined,
        onMouseOver           : undefined,
    };

    static displayName = 'CheckableGroup';

    render()
    {
        const {
            children,
            className,
            errorMessage,
            errorMessageIsVisible,
            forceHover,
            hasError,
            id = generateId( 'CheckableGroup' ),
            isDisabled,
            isReadOnly,
            label,
            layout,
            name,
            onChange,
            onMouseOut,
            onMouseOver,
        } = this.props;

        const cssMap = evalTheme( this.context.CheckableGroup, this.props );

        const items = Children.toArray( children ).map( child =>
        {
            let handleChange;

            if ( !onChange )
            {
                handleChange = child.props.onChange;
            }
            else if ( !child.props.onChange )
            {
                handleChange = onChange;
            }
            else
            {
                handleChange = ( ...args ) =>
                {
                    onChange( args );
                    child.props.onChange( args );
                };
            }

            return React.cloneElement( child, {
                ...child.props,
                forceHover : forceHover || child.props.forceHover,
                hasError   : hasError || child.props.hasError,
                isDisabled : isDisabled || child.props.isDisabled,
                isReadOnly : isReadOnly || child.props.isReadOnly,
                name       : name || id,
                onChange   : handleChange,
            } );
        } );

        return (
            <Fieldset
                className = { buildClassName( className, cssMap, {
                    layout,
                } ) }
                errorMessage          = { errorMessage }
                errorMessageIsVisible = { errorMessageIsVisible }
                hasError              = { hasError }
                isDisabled            = { isDisabled }
                label                 = { label }
                onMouseOut            = { onMouseOut }
                onMouseOver           = { onMouseOver }>
                { items &&
                <ul className = { cssMap.list }>
                    { items.map( ( item, i ) => (
                        <li
                            className = { cssMap.listItem }
                            key       = { item.props.id || i }>
                            { item }
                        </li>
                    ) ) }
                </ul>
                }
            </Fieldset>
        );
    }
}
