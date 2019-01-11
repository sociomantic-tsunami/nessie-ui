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

export default class Grid extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         * Vertical alignment of the grid items
         */
        align : PropTypes.oneOf( [
            'start', 'middle', 'end', 'stretch' ] ),
        /**
         * Defines the size of implicitly set columns
         */
        autoCols      : PropTypes.string,
        /**
         * Controls where to auto place new grid items if their place is
         * undefined
         */
        autoFlow      : PropTypes.oneOf( [ 'row', 'col' ] ),
        /**
         * Defines the size of implicitly set rows
         */
        autoRows      : PropTypes.string,
        /**
         *  Grid content (Columns)
         */
        children      : PropTypes.node,
        /**
         *  CSS class name
         */
        className     : PropTypes.string,
        /**
         *  Column gap
         */
        columnGap     : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
        /**
         *  Number of columns - should be an integer > 0
         */
        columns       : PropTypes.number,
        /**
         *  CSS class map
         */
        cssMap        : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Custom sizes of columns
         */
        customColumns : PropTypes.string,
        /**
         *  Custom sizes of rows
         */
        customRows    : PropTypes.string,
        /**
         * Horizontal alignment of the grid items
         */
        justify       : PropTypes.oneOf( [
            'start', 'center', 'end', 'stretch' ] ),
        /**
         *  Row gap
         */
        rowGap : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
        /**
         *  Number of rows - should be an integer > 0
         */
        rows   : PropTypes.number,
    };

    static defaultProps =
    {
        align         : 'top',
        autoCols      : undefined,
        autoFlow      : 'row',
        autoRows      : undefined,
        children      : undefined,
        className     : undefined,
        columnGap     : 'M',
        columns       : undefined,
        customColumns : undefined,
        customRows    : undefined,
        justify       : 'left',
        rowGap        : 'M',
        rows          : undefined,
    };

    static displayName = 'Grid';

    render()
    {
        const {
            align,
            autoCols,
            autoFlow,
            autoRows,
            children,
            className,
            columns,
            customColumns,
            customRows,
            columnGap,
            cssMap = createCssMap( this.context.Grid, this.props ),
            justify,
            rows,
            rowGap,
        } = this.props;

        const layout = {
            gridAutoColumns     : autoCols || '1fr',
            gridAutoRows        : autoRows || '1fr',
            gridTemplateColumns : customColumns || `repeat( ${columns}, 1fr )`,
            gridTemplateRows    : customRows || `repeat( ${rows}, 1fr )`,
        };

        return (
            <div
                className = { buildClassName( className, cssMap, {
                    flow : autoFlow,
                    justify,
                    align,
                    columnGap,
                    rowGap,
                } ) }
                style = { layout }>
                { children }
            </div>
        );
    }
}
