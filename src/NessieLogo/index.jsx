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

import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming';

export default class NessieLogo extends React.Component
{
    static contextType = ThemeContext;
    static displayName = 'NessieLogo';

    static propTypes = {
        /**
         *  Extra CSS class name
         */
        className : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap    : PropTypes.objectOf( PropTypes.string ),
    };

    static defaultProps =
    {
        className : undefined,
        cssMap    : undefined,
    };

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
