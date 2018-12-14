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

export default class PageFooter extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  PageFooter content
         */
        children : PropTypes.node,
    };

    static displayName = 'PageFooter';

    render()
    {
        const {
            children,
            className,
            cssMap = createCssMap( this.context.PageFooter, this.props ),
        } = this.props;

        return (
            <footer className = { buildClassName( className, cssMap ) }>
                <div className = { cssMap.content }>
                    { children }
                </div>
            </footer>
        );
    }
}
