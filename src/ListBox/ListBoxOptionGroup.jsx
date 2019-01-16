/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React            from 'react';
import PropTypes        from 'prop-types';

import { Text }         from '../index';
import { mapAria }      from '../utils';
import ThemeContext     from '../Theming/ThemeContext';
import { createCssMap } from '../Theming';

export default class ListBoxOptionGroup extends React.Component
{
    static contextType = ThemeContext;

    static propTypes = {
        aria      : PropTypes.objectOf( PropTypes.string ),
        children  : PropTypes.node,
        className : PropTypes.string,
        cssMap    : PropTypes.objectOf( PropTypes.string ),
        header    : PropTypes.string,
        options   : PropTypes.arrayOf( PropTypes.object ),
    };

    static defaultProps = {
        aria      : undefined,
        children  : undefined,
        className : undefined,
        cssMap    : undefined,
        header    : undefined,
        options   : undefined,
    };

    render()
    {
        const {
            aria,
            children,
            cssMap = createCssMap(
                this.context.ListBoxOptionGroup,
                this.props,
            ),
            header,
            options,
        } = this.props;

        return (
            <li
                { ...mapAria( { ...aria, role: 'none' } ) }
                className = { cssMap.main }>
                <div className = { cssMap.header }>
                    <Text className = { cssMap.headerText }>{ header }</Text>
                </div>
                <ul
                    { ...mapAria( {
                        expanded : true,
                        label    : header,
                        role     : 'group',
                    } ) }
                    className = { cssMap.options }>
                    { children || options }
                </ul>
            </li>
        );
    }
}
