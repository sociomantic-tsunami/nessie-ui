/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import { Row, TableCell }   from '../index';
import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming';

export default class TableRow extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Globally sets cell horizonal alignment for this row (individual cell
         *  alignment will override)
         */
        align : PropTypes.oneOf( [
            'auto', 'left', 'center', 'right' ] ),
        /**
         *  Row content (TableCells)
         */
        children      : PropTypes.node,
        /**
         *  Extra CSS class name
         */
        className     : PropTypes.node,
        /**
         *  CSS class map
         */
        cssMap        : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Gutter size
         */
        gutters       : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
        /**
         *  Display as active/highlighted
         */
        isActive      : PropTypes.bool,
        /**
         *  Row is clickable
         */
        isClickable   : PropTypes.bool,
        /**
         *  Makes the row sticky
         */
        isSticky      : PropTypes.bool,
        /**
         *  onClick callback function:
         *  ( e ) => { ... }
         */
        onClick       : PropTypes.func,
        /**
         *  onMouseOut callback function:
         *  ( e ) => { ... }
         */
        onMouseOut    : PropTypes.func,
        /**
         *  onMouseOver callback function:
         *  ( e ) => { ... }
         */
        onMouseOver   : PropTypes.func,
        /**
         *  Row spacing
         */
        spacing       : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
        /**
         *  Globally sets cell vertical alignment for this row (individual cell
         *  alignment will overrides)
         */
        verticalAlign : PropTypes.oneOf( [
            'auto', 'top', 'middle', 'bottom' ] ),
    };

    static defaultProps =
    {
        align         : undefined,
        children      : undefined,
        className     : undefined,
        cssMap        : undefined,
        gutters       : undefined,
        isActive      : false,
        isClickable   : false,
        isSticky      : false,
        onClick       : undefined,
        onMouseOut    : undefined,
        onMouseOver   : undefined,
        spacing       : undefined,
        verticalAlign : undefined,
    };

    static displayName = 'TableRow';

    static didWarn = {};

    render()
    {
        const {
            align,
            children,
            className,
            cssMap = createCssMap( this.context.TableRow, this.props ),
            isActive,
            isClickable,
            isSticky,
            verticalAlign,
            ...props
        } = this.props;

        if ( !TableRow.didWarn.children && children !== undefined  )
        {
            React.Children.toArray( children ).map( ( child ) =>
            {
                if ( child.type !== TableCell )
                {
                    console.warn( 'TableRow must have TableCells as direct \
    children' );
                    TableRow.didWarn.children = true;
                }
            } );
        }

        const cells = React.Children.toArray( children ).map( cell =>
            React.cloneElement( cell, {
                align     : cell.props.align || align,
                className : cell.props.className ?
                    `${cell.props.className}  ${cssMap.cell}` : cssMap.cell,
                verticalAlign : cell.props.verticalAlign || verticalAlign,
            } ) );

        return (
            <Row
                { ...props }
                className = { cssMap.main }
                role      = "row"
                noWarn>
                { cells }
            </Row>
        );
    }
}
