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

import { buildClassName } from '../utils';
import ThemeContext       from '../Theming/ThemeContext';
import { evalTheme }      from '../Theming/withTheme';

export default class Dropdown extends React.Component
{
    static contextType = ThemeContext;

    static propTypes = {
        children  : PropTypes.node,
        className : PropTypes.string,
        cssMap    : PropTypes.objectOf( PropTypes.string ),
        hasError  : PropTypes.bool,
        padding   : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
        size      : PropTypes.oneOf( [ 'content', 'default' ] ),
    };

    static defaultProps = {
        children  : undefined,
        className : undefined,
        hasError  : false,
        padding   : 'none',
        size      : 'default',
    };

    static displayName = 'Dropdown';

    render()
    {
        const {
            children,
            className,
            hasError,
            padding,
            size,
        } = this.props;

        const cssMap = evalTheme( this.context.Dropdown, this.props );

        return (
            <div
                className = { buildClassName( className, cssMap, {
                    error : hasError,
                    padding,
                    size,
                } ) }>
                { children }
            </div>
        );
    }
}
