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

import { H1 }               from '../index';
import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming/createCss';

export default class PageContentHeader extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Page content header text (h1)
         */
        title    : PropTypes.string,
        /**
         *  Page content header custom content; overrides title
         */
        children : PropTypes.node,
    };

    static displayName = 'PageContentHeader';

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.PageContentHeader, this.props ),
            title,
        } = this.props;

        let header = <H1 className = { cssMap.main }>{ title }</H1>;

        if ( children )
        {
            header = (
                <header className = { cssMap.main }>
                    { children }
                </header>
            );
        }

        return header;
    }
}
