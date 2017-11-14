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
    title,
} ) => (
    <li
        { ...mapAria( { ...aria, role: 'none' } ) }
        className = { buildClassName( className, cssMap ) }>
        <div className = { cssMap.title }>
            <Text className = { cssMap.titleText }>{ title }</Text>
        </div>
        <ul
            { ...mapAria( { expanded: true, label: title, role: 'group' } ) }
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
    title     : PropTypes.string,
};

ListBoxOptionGroup.defaultProps = {
    aria      : undefined,
    children  : undefined,
    className : undefined,
    cssMap    : styles,
    options   : undefined,
    title     : undefined,
};

export default ListBoxOptionGroup;
