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

import { Text }         from '..';

import { mapAria }      from '../utils';
import { useTheme }     from '../Theming';

const componentName = 'ListBoxOptionGroup';

const ListBoxOptionGroup = props =>
{
    const {
        aria,
        children,
        header,
        options,
    } = props;

    const cssMap = useTheme( componentName, props );

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
};

ListBoxOptionGroup.propTypes = {
    aria      : PropTypes.objectOf( PropTypes.string ),
    children  : PropTypes.node,
    className : PropTypes.string,
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    header    : PropTypes.string,
    options   : PropTypes.arrayOf( PropTypes.object ),
};

ListBoxOptionGroup.defaultProps = {
    aria      : undefined,
    children  : undefined,
    className : undefined,
    cssMap    : undefined,
    header    : undefined,
    options   : undefined,
};

ListBoxOptionGroup.displayName = componentName;

export default ListBoxOptionGroup;
