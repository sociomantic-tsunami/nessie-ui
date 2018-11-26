/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Children }              from 'react';
import PropTypes                        from 'prop-types';

import { CheckableGroup }               from '../index';
import { generateId }                   from '../utils';
import { buildCheckboxesFromValues }    from './utils';
import ThemeContext                     from '../Theming/ThemeContext';
import { evalTheme }                    from '../Theming/withTheme';

export default class CheckboxGroup extends React.PureComponent
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Checkboxes in the group (overrides values prop)
         */
        children              : PropTypes.node,
        /**
         *  Extra CSS class name
         */
        className             : PropTypes.string,
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
         *  How to lay out the Checkboxes
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
        /**
        *  Array of selected values
        */
        selectedValues        : PropTypes.arrayOf( PropTypes.string ),
        /**
        *  Array of values to build the Checkboxes
        */
        values                : PropTypes.oneOfType( [
            PropTypes.arrayOf( PropTypes.string ),
            PropTypes.arrayOf( PropTypes.object ),
        ] ),
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
        selectedValues        : undefined,
        values                : undefined,
    };

    static displayName = 'CheckboxGroup';

    render()
    {
        const {
            children,
            id = generateId( 'CheckboxGroup' ),
            selectedValues = [],
            values,
            ...props
        } = this.props;

        let items = children ?
            Children.toArray( children ) : buildCheckboxesFromValues( values );

        if ( selectedValues.length )
        {
            items = items.map( item => React.cloneElement( item, {
                isChecked : selectedValues.includes( item.props.value ),
            } ) );
        }

        const cssMap = evalTheme( this.context.Card, this.props );

        return (
            <CheckableGroup { ...props } cssMap = { cssMap } id = { id }>
                { items }
            </CheckableGroup>
        );
    }
}
