/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
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
import { attachEvents }   from '../utils';


export default class Icon extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         * Icon label (overrides label prop)
         */
        children  : PropTypes.string,
        /**
         *  CSS class name
         */
        className : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap    : PropTypes.objectOf( PropTypes.string ),
        /**
         * Icon label
         */
        label     : PropTypes.string,
        /**
         *  Icon role
         */
        role      : PropTypes.oneOf( [
            'default',
            'critical',
            'promoted',
            'warning',
        ] ),
        /**
         *  Icon size
         */
        size : PropTypes.oneOf( [ 'S', 'M', 'L', 'XL' ] ),
        /**
         *  Icon to show
         */
        type : PropTypes.string,
    };

    static defaultProps =
    {
        children  : undefined,
        className : undefined,
        cssMap    : undefined,
        label     : undefined,
        role      : 'default',
        size      : 'S',
        type      : 'none',
    };

    static displayName = 'Icon';

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.Icon, this.props ),
            label,
            type,
        } = this.props;

        return (
            <svg
                { ...attachEvents( this.props ) }
                aria-label = { children || label }
                className  = { cssMap.main }>
                { ( type !== 'none' ) &&
                <use xlinkHref = { `#nessie-${type}` } /> }
            </svg>
        );
    }
}
