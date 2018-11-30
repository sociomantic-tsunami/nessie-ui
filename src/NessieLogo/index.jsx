/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';

import { buildClassName }   from '../utils';
import ThemeContext         from '../Theming/ThemeContext';
import { evalTheme }        from '../Theming/withTheme';

export default class NessieLogo extends React.PureComponent
{
    static contextType = ThemeContext;

    static propTypes = {};

    static displayName = 'NessieLogo';

    render()
    {
        const {
            className,
            cssMap = evalTheme( this.context.NessieLogo, this.props ),
        } = this.props;

        return (
            <img
                alt       = ""
                className = { buildClassName( className, cssMap ) }
                src       = "images/nessie.svg" />
        );
    }
}
