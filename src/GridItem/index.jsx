/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
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
import { createCssMap }   from '../Theming/createCss';

export default class GridItem extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         * Vertical alignment of the GridItem content
         */
        align     : PropTypes.oneOf( [ 'top', 'middle', 'bottom', 'stretch' ] ),
        /**
         *  GridItem content
         */
        children  : PropTypes.node,
        /**
         *  CSS class name
         */
        className : PropTypes.string,
        /**
         *  GridItem column span - should be an integer > 0
         */
        colSpan   : PropTypes.number,
        /**
         *  CSS class map
         */
        cssMap    : PropTypes.objectOf( PropTypes.string ),
        /**
         * Horizontal alignment of the GridItem content
         */
        justify   : PropTypes.oneOf( [ 'left', 'center', 'right', 'stretch' ] ),
        /**
         * GridItem row span - should be an integer > 0
         */
        rowSpan   : PropTypes.number,
    };

    static defaultProps =
    {
        align     : 'top',
        children  : undefined,
        className : undefined,
        colSpan   : undefined,
        justify   : 'left',
        rowSpan   : undefined,
    };

    render()
    {
        const {
            align,
            children,
            className,
            colSpan,
            cssMap = createCssMap( this.context.GridItem, this.props ),
            justify,
            rowSpan,
        } = this.props;

        const span = {
            gridColumn : `span ${colSpan}`,
            gridRow    : `span ${rowSpan}`,
        };

        return (
            <div
                className = { buildClassName( className, cssMap, {
                    align,
                    justify,
                } ) }
                style = { span }>
                { children }
            </div>
        );
    }
}
