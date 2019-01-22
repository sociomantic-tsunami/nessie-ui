/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React            from 'react';
import PropTypes        from 'prop-types';

import ThemeContext     from '../Theming/ThemeContext';
import { createCssMap } from '../Theming';

export default class Spinner extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Extra CSS class name
         */
        className : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap    : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Size of the Spinner
         */
        size      : PropTypes.oneOf( [ 'small', 'big' ] ),
    };

    static defaultProps =
    {
        className : undefined,
        cssMap    : undefined,
        size      : 'small',
    };

    static displayName = 'Spinner';

    render()
    {
        const {
            cssMap = createCssMap( this.context.Spinner, this.props ),
        } = this.props;

        return <div className = { cssMap.main } />;
    }
}
