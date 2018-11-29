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
import { evalTheme }        from '../Theming/withTheme';

export default class Spinner extends React.PureComponent
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
        const { className, size } = this.props;

        const cssMap = evalTheme( this.context.Spinner, this.props );

        return (
            <div
                className = { buildClassName( className, cssMap, { size } ) } />
        );
    }
}
