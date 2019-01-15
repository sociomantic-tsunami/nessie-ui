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
import { createCssMap }   from '../Theming';

export default class Row extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Horizontal alignment of the columns (“auto” makes all columns equal
         *  width)
         */
        align : PropTypes.oneOf( [
            'auto', 'left', 'center', 'right' ] ),
        /**
         *  Grid content (Columns)
         */
        children      : PropTypes.node,
        /**
         *  CSS class name
         */
        className     : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap        : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Gutter size
         */
        gutters       : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
        /**
         *  Adds dividers between row items
         */
        hasDividers   : PropTypes.bool,
        /*
         *  Sets 'width: 100%' to prevent content growth from negative margins
         */
        hasFullWidth  : PropTypes.bool,
        /**
         *  Wrap content
         */
        hasWrap       : PropTypes.bool,
        /**
         *  Grid role
         */
        role          : PropTypes.string,
        /**
         *  Row spacing
         */
        spacing       : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
        /**
         *  Vertical alignment of the columns (“auto” makes all columns equal
         *  height)
         */
        verticalAlign : PropTypes.oneOf( [
            'auto', 'top', 'middle', 'bottom' ] ),
    };

    static defaultProps =
    {
        align         : 'auto',
        children      : undefined,
        className     : undefined,
        cssMap        : undefined,
        gutters       : 'M',
        hasDividers   : false,
        hasFullWidth  : false,
        hasWrap       : false,
        role          : undefined,
        spacing       : 'M',
        verticalAlign : 'auto',
    };

    static displayName = 'Row';

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.Row, this.props ),
            hasDividers,
            role,
        } = this.props;

        let elements;

        if ( hasDividers )
        {
            elements = React.Children.toArray( children ).flatMap( (
                child,
                index,
                { length },
            ) =>
                ( index < length - 1 ?
                    [ child, <div className = { cssMap.divider } /> ] :
                    child ) );
        }

        return (
            <div
                className = { cssMap.main }
                hasWrap   = { false }
                role      = { role && role !== 'none' ? role : null }>
                { hasDividers ? elements : children }
            </div>
        );
    }
}
