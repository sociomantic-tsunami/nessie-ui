/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';
import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming/createCss';

export default class Card extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Horizontal alignment of content (“auto” makes all items 100% width)
         */
        align : PropTypes.oneOf( [
            'auto',
            'left',
            'center',
            'right',
        ] ),
        /**
         *  Module content
         */
        children : PropTypes.node,
        /**
         *  CSS class map
         */
        cssMap   : PropTypes.objectOf( PropTypes.string ),
        /**
        *   Card padding
        */
        padding  : PropTypes.oneOfType( [
            PropTypes.oneOf( [ 'none', 'S', 'M', 'L', 'XL', 'XXL' ] ),
            PropTypes.arrayOf( PropTypes.oneOf( [
                'none',
                'S',
                'M',
                'L',
                'XL',
                'XXL',
            ] ) ),
        ] ),
        /**
         *  Vertical alignment of content
         */
        verticalAlign : PropTypes.oneOf( [
            'top',
            'middle',
            'bottom',
        ] ),
    };

    static defaultProps =
    {
        align         : 'auto',
        padding       : 'M',
        verticalAlign : 'top',
    };

    static displayName = 'Card';

    render()
    {
        const {
            align,
            className,
            children,
            cssMap = createCssMap( this.context.Card, this.props ),
            padding,
            verticalAlign,
        } = this.props;

        return (
            <div
                className = { buildClassName( className, cssMap, {
                    alignX   : align,
                    alignY   : verticalAlign,
                    paddingX : Array.isArray( padding ) ?
                        padding[ 0 ] : padding,
                    paddingY : Array.isArray( padding ) ?
                        padding[ 1 ] : padding,
                } ) }>
                { children }
            </div>
        );
    }
}
