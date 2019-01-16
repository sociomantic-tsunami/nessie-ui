/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React              from 'react';
import PropTypes          from 'prop-types';

import ThemeContext       from '../Theming/ThemeContext';
import { createCssMap }   from '../Theming';

export default class H4 extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Title text (JSX node; overrides title prop)
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
        *  Title text
        */
        title     : PropTypes.string,
        /**
        *  Role (style) to apply to heading
        */
        role      : PropTypes.oneOf( [
            'default',
            'subtle',
            'promoted',
            'critical',
        ] ),
    };

    static defaultProps =
    {
        children  : undefined,
        className : undefined,
        cssMap    : undefined,
        role      : 'default',
        title     : undefined,
    };

    static displayName = 'H4';

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.H4, this.props ),
            title,
        } = this.props;

        return (
            <h4 className = { cssMap.main }>
                { children || title }
            </h4>
        );
    }
}
