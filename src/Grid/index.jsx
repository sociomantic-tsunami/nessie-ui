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
import { Column }         from '../index';
import ThemeContext       from '../Theming/ThemeContext';
import { evalTheme }      from '../Theming/withTheme';

export default class Grid extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         * Horizontal alignment of the columns (“auto” makes all columns equal
         * width)
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
         * Wrap content
         */
        hasWrap       : PropTypes.bool,
        /**
         *  stop Console Warnings
         */
        noWarn        : PropTypes.bool,
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
         *  Grid role
         */
        role          : PropTypes.string,
        /**
         *  Row spacing
         */
        spacing       : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
        /**
         * Vertical alignment of the columns (“auto” makes all columns equal
         * height)
         */
        verticalAlign : PropTypes.oneOf( [
            'auto', 'top', 'middle', 'bottom' ] ),
    };

    static defaultProps =
    {
        align         : 'auto',
        children      : undefined,
        className     : undefined,
        gutters       : 'M',
        hasWrap       : true,
        noWarn        : false,
        onClick       : undefined,
        onMouseOut    : undefined,
        onMouseOver   : undefined,
        role          : undefined,
        spacing       : 'M',
        verticalAlign : 'auto',
    };

    static displayName = 'Grid';

    static didWarn = {};

    render()
    {
        const deprecatedSpacingOptions =
            [ 'default', 'h1', 'h2', 'h3', 'h4', 'label' ];

        const {
            align,
            children,
            className,
            cssMap = evalTheme( this.context.Grid, this.props ),
            onClick,
            onMouseOut,
            onMouseOver,
            gutters,
            hasMinHeight,
            hasWrap,
            noWarn,
            role,
            spacing,
            verticalAlign,
        } = this.props;

        if ( !noWarn )
        {
            if ( deprecatedSpacingOptions.includes( spacing ) &&
                !Grid.didWarn[ spacing ] )
            {
                console.warn( `Grid spacing option '${spacing}' is depreacted. \
Please use one of 'S', 'M', 'L' or 'none' instead.` );
                Grid.didWarn[ spacing ] = true;
            }

            if ( !Grid.didWarn.hasMinHeight && hasMinHeight !== undefined )
            {
                console.warn( 'Grid: \'hasMinHeight\' prop is deprecated. \
Please use alternative layout.' );
                this.didWarn.hasMinHeight = true;
            }

            if ( !Grid.didWarn.children && children !== undefined  )
            {
                React.Children.toArray( children ).map( ( child ) =>
                {
                    if ( child.type !== Column )
                    {
                        console.warn( 'Grid / Row must have Columns as direct \
children' );
                        Grid.didWarn.children = true;
                    }
                } );
            }
        }

        return (
            <div
                className = { buildClassName( className, cssMap, {
                    alignX  : align,
                    alignY  : verticalAlign,
                    hasMinHeight,
                    gutters : gutters !== 'none' && gutters,
                    wrap    : hasWrap,
                    spacing : spacing !== 'none' && spacing,
                } ) }
                onClick      = { onClick }
                onMouseEnter = { onMouseOver }
                onMouseLeave = { onMouseOut }
                role         = { role && role !== 'none' ? role : null }>
                { children }
            </div>
        );
    }
}
