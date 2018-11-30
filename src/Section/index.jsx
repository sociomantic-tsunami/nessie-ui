/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                            from 'react';
import PropTypes                        from 'prop-types';

import { generateId, buildClassName }   from '../utils';
import { H1, H2, H3, H4 }               from '../index';
import ThemeContext                     from '../Theming/ThemeContext';
import { evalTheme }                    from '../Theming/withTheme';

export default class Section extends React.PureComponent
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         * Section content
         */
        children  : PropTypes.node,
        /**
         * Extra CSS class name
         */
        className : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap    : PropTypes.objectOf( PropTypes.string ),
        /**
         * HTML id attribute
         */
        id        : PropTypes.string,
        /**
         *  Section title
         */
        title     : PropTypes.string,
        /**
         *  Section level in the document outline
         */
        level     : PropTypes.number,
    };

    static defaultProps =
    {
        children  : undefined,
        className : undefined,
        id        : undefined,
        level     : undefined,
        title     : undefined,
    };

    static displayName = 'Section';


    render()
    {
        const {
            children,
            className,
            cssMap = evalTheme( this.context.Section, this.props ),
            id = generateId( 'Section' ),
            level,
            title,
        } = this.props;

        const headers = {
            1 : H1, 2 : H2, 3 : H3, 4 : H4,
        };
        const SectionHeader = headers[ level ];

        return (
            <section
                className = { buildClassName( className, cssMap, { level } ) }
                id        = { id }>
                { title && SectionHeader &&
                    <SectionHeader>{ title }</SectionHeader>
                }
                <div className = { cssMap.content }>
                    { children }
                </div>
            </section>
        );
    }
}
