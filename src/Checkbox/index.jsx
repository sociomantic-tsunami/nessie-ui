/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                        from 'react';
import PropTypes                    from 'prop-types';

import { Text }                     from '..';

import { attachEvents, generateId } from '../utils';
import ThemeContext                 from '../Theming/ThemeContext';
import { createCssMap }             from '../Theming';


export default class Checkbox extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Label content (React node; overrides label prop)
         */
        children   : PropTypes.node,
        /**
         *  Extra CSS class name
         */
        className  : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap     : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Display as error/invalid
         */
        hasError   : PropTypes.bool,
        /**
         *  Component id
         */
        id         : PropTypes.string,
        /**
         *  Display as checked (controlled input)
         */
        isChecked  : PropTypes.bool,
        /**
         *  Display as disabled
         */
        isDisabled : PropTypes.bool,
        /**
         *  Label content (string)
         */
        label      : PropTypes.string,
        /**
         *  change callback prop
         */
        onChange   : PropTypes.func,
        /**
         *  click callback prop
         */
        onClick    : PropTypes.func,

    };

    static defaultProps =
    {
        children   : undefined,
        className  : undefined,
        cssMap     : undefined,
        hasError   : false,
        id         : undefined,
        isChecked  : undefined,
        isDisabled : false,
        label      : undefined,
        onChange   : undefined,
        onClick    : undefined,
    };

    static displayName = 'Checkbox';

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.Checkbox, this.props ),
            id = generateId( 'Checkbox' ),
            isChecked,
            isDisabled,
            label,
        } = this.props;

        let labelContent = children || label;

        if ( typeof labelContent === 'string' )
        {
            labelContent =
                <Text className = { cssMap.labelText }>{ labelContent }</Text>;
        }

        return (
            <div
                { ...attachEvents( this.props ) }
                className = { cssMap.main }>
                <input
                    checked   = { isChecked }
                    className = { cssMap.input }
                    disabled  = { isDisabled }
                    id        = { id }
                    type      =  "checkbox" />
                <label className = { cssMap.label } htmlFor = { id }>
                    { labelContent &&
                        <span className = { cssMap.labelContent }>
                            { labelContent }
                        </span>
                    }
                </label>
            </div>
        );
    }
}
