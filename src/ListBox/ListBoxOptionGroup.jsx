/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                        from 'react';
import PropTypes                    from 'prop-types';

import { Text }                     from '../index';
import { buildClassName, mapAria }  from '../utils';
import styles                       from './listBoxOptionGroup.css';

const ListBoxOptionGroup = ( {
    aria,
    children,
    className,
    cssMap,
    options,
    header,
} ) => (
    <li
        { ...mapAria( { ...aria, role: 'none' } ) }
        className = { buildClassName( className, cssMap ) }>
        <div className = { cssMap.header }>
            <Text className = { cssMap.headerText }>{ header }</Text>
        </div>
        <ul
            { ...mapAria( { expanded: true, label: header, role: 'group' } ) }
            className = { cssMap.options }>
            { children || options }
        </ul>
    </li>
);

ListBoxOptionGroup.propTypes = {
    aria      : PropTypes.objectOf( PropTypes.string ),
    children  : PropTypes.node,
    className : PropTypes.string,
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    options   : PropTypes.arrayOf( PropTypes.object ),
    header    : PropTypes.string,
};

ListBoxOptionGroup.defaultProps = {
    aria      : undefined,
    children  : undefined,
    className : undefined,
    cssMap    : styles,
    options   : undefined,
    header    : undefined,
};

export default ListBoxOptionGroup;
