/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React            from 'react';
import PropTypes        from 'prop-types';

import { attachEvents } from '../utils';
import ThemeContext     from '../Theming/ThemeContext';
import { createCssMap } from '../Theming';


export default class Modal extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Dialog Content
         */
        children       : PropTypes.node,
        /**
         *  Extra CSS class name
         */
        className      : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap         : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Overlay onClick callback function
         */
        onClickOverlay : PropTypes.func,
    };

    static defaultProps =
    {
        children       : undefined,
        className      : undefined,
        cssMap         : undefined,
        onClickOverlay : undefined,
    };

    static displayName = 'Modal';

    constructor()
    {
        super();
        this.handleClickOverlay = this.handleClickOverlay.bind( this );
    }

    handleClickOverlay( { target, currentTarget } )
    {
        if ( target !== currentTarget ) return;

        const { onClickOverlay } = this.props;
        if ( onClickOverlay )
        {
            onClickOverlay();
        }
    }

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.Modal, this.props ),
        } = this.props;

        return (
            <div
                { ...attachEvents( this.props, { onClick: false } ) }
                onClick   = { this.handleClickOverlay }
                className = { cssMap.main }>
                <div className = { cssMap.content }>
                    { children }
                </div>
            </div>
        );
    }
}
