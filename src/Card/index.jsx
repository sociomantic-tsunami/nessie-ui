/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
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


export default class Card extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Module content
         */
        children  : PropTypes.node,
        /**
         *  Extra CSS class name
         */
        className : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap    : PropTypes.objectOf( PropTypes.string ),
        /**
        *   Card padding
        */
        padding   : PropTypes.oneOfType( [
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
    };

    static defaultProps =
    {
        children  : undefined,
        className : undefined,
        cssMap    : undefined,
        padding   : 'M',
    };

    static displayName = 'Card';

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.Card, this.props ),
        } = this.props;

        return (
            <div { ...attachEvents( this.props ) } className = { cssMap.main }>
                { children }
            </div>
        );
    }
}
