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

import { Text }             from '../index';
import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming';


export default class DatePickerItem extends React.Component
{
    static contextType = ThemeContext;

    static propTypes = {
        children   : PropTypes.node,
        className  : PropTypes.string,
        cssMap     : PropTypes.objectOf( PropTypes.string ),
        forceHover : PropTypes.bool,
        isDisabled : PropTypes.bool,
        isSelected : PropTypes.bool,
        isReadOnly : PropTypes.bool,
        label      : PropTypes.string,
        onClick    : PropTypes.func,
        value      : PropTypes.string,
        type       : PropTypes.oneOf( [ 'day', 'month' ] ),
    };

    static defaultProps = {
        children   : undefined,
        className  : undefined,
        cssMap     : undefined,
        forceHover : false,
        isDisabled : false,
        isSelected : false,
        isReadOnly : false,
        label      : undefined,
        onClick    : undefined,
        value      : undefined,
        type       : 'day',
    };

    constructor()
    {
        super();
        this.handleClick = this.handleClick.bind( this );
    }

    handleClick( e )
    {
        e.preventDefault();
        
        const { isReadOnly, onClick } = this.props;
        if ( !isReadOnly && onClick )
        {
            onClick( { value: parseInt( e.currentTarget.value ) }, e );
        }
    }

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.DatePickerItem, this.props ),
            isDisabled,
            isSelected,
            label,
            value,
        } = this.props;

        return (
            <button
                aria-pressed = { isSelected }
                className    = { cssMap.main }
                disabled     = { isDisabled }
                onClick      = { this.handleClick }
                type         = "button"
                value        = { value }>
                <Text className = { cssMap.text }>{ children || label }</Text>
            </button>
        );
    }
}
