/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';

import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming';

export default class NessieLogo extends React.Component
{
    static contextType = ThemeContext;
    static displayName = 'NessieLogo';
    static propTypes = {};

    render()
    {
        const {
            cssMap = createCssMap( this.context.NessieLogo, this.props ),
        } = this.props;

        return (
            <img
                alt       = ""
                className = { cssMap.main }
                src       = "images/nessie.svg" />
        );
    }
}
