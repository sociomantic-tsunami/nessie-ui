/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React                                 from 'react';
import PropTypes                             from 'prop-types';

import { Icon, Text }                        from '../index';
import { eventHandler, generateId, mapAria } from '../utils';
import ThemeContext                          from '../Theming/ThemeContext';
import { createCssMap }                      from '../Theming';


export default class ListBoxOption extends React.Component
{
    static contextType = ThemeContext;

    static propTypes = {
        aria        : PropTypes.objectOf( PropTypes.string ),
        children    : PropTypes.node,
        className   : PropTypes.string,
        cssMap      : PropTypes.objectOf( PropTypes.string ),
        description : PropTypes.string,
        iconSize    : PropTypes.oneOf( [ 'S', 'M', 'L', 'XL', 'XXL' ] ),
        iconType    : PropTypes.oneOf( [
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
            'deactivated',
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
        isActive    : PropTypes.bool,
        id          : PropTypes.string,
        isDisabled  : PropTypes.bool,
        isSelected  : PropTypes.bool,
        onClick     : PropTypes.func,
        onMouseOut  : PropTypes.func,
        onMouseOver : PropTypes.func,
        text        : PropTypes.string,
        value       : PropTypes.string,
    };

    static defaultProps = {
        aria        : undefined,
        children    : undefined,
        className   : undefined,
        cssMap      : undefined,
        description : undefined,
        iconSize    : undefined,
        iconType    : 'none',
        id          : undefined,
        isActive    : false,
        isDisabled  : false,
        isSelected  : false,
        onClick     : undefined,
        onMouseOut  : undefined,
        onMouseOver : undefined,
        text        : undefined,
        value       : undefined,
    };

    render()
    {
        const {
            aria,
            children,
            cssMap = createCssMap( this.context.ListBoxOption, this.props ),
            description,
            iconSize,
            iconType,
            id = generateId( 'ListBoxOption' ),
            isSelected,
            onClick,
            onMouseOut,
            onMouseOver,
            text,
            value,
        } = this.props;


        let label;

        if ( children )
        {
            label = children;
        }
        else
        {
            label = typeof text !== 'undefined' ? text : value;
            label = String( label );
        }

        label = typeof label === 'string' ? (
            <Text className = { cssMap.optionText } noWrap overflowIsHidden>
                { label }
            </Text> ) : label;

        return (
            <li
                { ...mapAria( {
                    ...aria,
                    selected : isSelected,
                    role     : 'option',
                } ) }
                className    = { cssMap.main }
                id           = { id }
                onClick      = { eventHandler( onClick, id ) }
                onMouseEnter = { eventHandler( onMouseOver, id ) }
                onMouseLeave = { eventHandler( onMouseOut, id ) }>
                { ( iconType && iconType !== 'none' ) &&
                    <Icon
                        className = { cssMap.icon }
                        size      = { iconSize || 'S'  }
                        type      = { iconType }
                        variant   = "stroke" />
                }
                <div className = { cssMap.textContainer }>
                    { label }
                    { description &&
                        <Text
                            className = { cssMap.description }
                            overflowIsHidden>
                            { description }
                        </Text> }
                </div>
            </li>
        );
    }
}
