/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import { generateId }       from '../utils';
import { IconButton, Text } from '../index';
import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming';


export default class Tooltip extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Tooltip message (JSX node; overrides message prop)
         */
        children      : PropTypes.node,
        /**
         * Extra CSS class name
         */
        className     : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap        : PropTypes.objectOf( PropTypes.string ),
        /**
         * HTML id attribute
         */
        id            : PropTypes.string,
        /**
         *  Display the tooltip as user dismissible
         */
        isDismissible : PropTypes.bool,
        /**
         *  Tooltip message (string)
         */
        message       : PropTypes.string,
        /**
         *  Function to call on “Close” button click: ( e ) => { ... }
         */
        onClickClose  : PropTypes.func,
        /**
         *  onMouseOver callback function: ( e ) => { ... }
         */
        onMouseOver   : PropTypes.func,
        /**
         *  onMouseOut callback function: ( e ) => { ... }
         */
        onMouseOut    : PropTypes.func,
        /**
         *  Tooltip position relative to associated component
         */
        position      : PropTypes.oneOf( [
            'top',
            'topLeft',
            'topRight',
            'bottom',
            'bottomLeft',
            'bottomRight',
            'left',
            'leftTop',
            'leftBottom',
            'right',
            'rightTop',
            'rightBottom',
        ] ),
        /**
         *  Tooltip role/style
         */
        role : PropTypes.oneOf( [
            'default',
            'critical',
            'promoted',
            'warning',
         ] ),
    };

    static defaultProps =
    {
        children      : undefined,
        className     : undefined,
        cssMap        : undefined,
        id            : undefined,
        isDismissible : undefined,
        message       : undefined,
        onClickClose  : undefined,
        onMouseOut    : undefined,
        onMouseOver   : undefined,
        position      : 'top',
        role          : 'default',
    };

    static displayName = 'Tooltip';

    constructor( props )
    {
        super();
        this.state = { id: props.id || generateId( 'Tooltip' ) };
    }

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.Tooltip, this.props ),
            isDismissible,
            message,
            onClickClose,
            onMouseOut,
            onMouseOver,
        } = this.props;

        const { id } = this.state;

        return (
            <div
                className    = { cssMap.main }
                id           = { id }
                onMouseEnter = { onMouseOver }
                onMouseLeave = { onMouseOut }
                role         = "tooltip">
                <div className = { cssMap.message }>
                    { children || ( typeof message === 'string' ?
                        <Text>{ message }</Text> : message )
                    }
                </div>
                { isDismissible &&
                    <IconButton
                        className    = { cssMap.close }
                        iconSize     = "S"
                        iconTheme    = "button"
                        iconType     = "close"
                        label        = "Close"
                        onClick      = { onClickClose } />
                }
            </div>
        );
    }
}
