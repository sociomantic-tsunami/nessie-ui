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

import { buildClassName }   from '../utils';
import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming/createCss';

export default class Spinner extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Size of the Spinner
         */
        size : PropTypes.oneOf( [ 'small',
            'big',
        ] ),
    };

    static defaultProps =
    {
        size : 'small',
    };

    static displayName = 'Spinner';

    render()
    {
        const {
            className,
            cssMap = createCssMap( this.context.Spinner, this.props ),
            size,
        } = this.props;

        return (
            <div
                className = { buildClassName( className, cssMap, { size } ) } />
        );
    }
}
