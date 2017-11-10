import React                        from 'react';
import PropTypes                    from 'prop-types';

import { Text }                     from '../index';
import { buildClassName, mapAria }  from '../utils';
import styles                       from './listBoxOptionGroup.css';

const ListBoxOption = ( {
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

ListBoxOption.propTypes = {
    aria      : PropTypes.objectOf( PropTypes.string ),
    children  : PropTypes.node,
    className : PropTypes.string,
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    header    : PropTypes.string,
    options   : PropTypes.arrayOf( PropTypes.object ),
};

ListBoxOption.defaultProps = {
    aria      : undefined,
    children  : undefined,
    className : undefined,
    cssMap    : styles,
    header    : undefined,
    options   : undefined,
};

export default ListBoxOption;
