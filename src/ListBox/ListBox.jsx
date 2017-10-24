import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import Css       from '../hoc/Css';
import styles    from './listBox.css';
import {
    buildOptions,
    generateId,
    mapFocusable,
    mapToAria
} from './utils';


const ListBox = ( {
    children,
    className,
    cssMap,
    isFocusable,
    isMultiselect,
    id,
    onClick,
    onKeyPress,
} ) => (
    /* eslint-disable jsx-a11y/aria-activedescendant-has-tabindex */
    // nonsense ^^
    <Css cssMap = { cssMap }>
        <ul
            aria-activedescendant = { isFocusable && props.activeOption }
            aria-multiselectable  = { mapToAria( isMultiselect ) }
            className             = { className }
            id                    = { id }
            onClick               = { onClick &&
                ( e => onClick( e, e.target.id ) ) }
            onKeyPress            = { onKeyPress }
            role                  = "listbox"
            tabIndex              = { mapFocusable( isFocusable ) }>
            { children.map( option => {
                const isActive = option.props.id === activeOption ||
                    option.props.isActive;

                const isSelected =
                    selectedOptions.indexOf( option.props.id ) > -1 ||
                        option.props.isSelected;

                return React.cloneElement( isActive, isSelected );
            } ) }
        </ul>
    </Css>
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
);


ListBox.propTypes = {
    activeOption    : PropTypes.string,
    children        : PropTypes.node,
    className       : PropTypes.string,
    cssMap          : PropTypes.objectOf( PropTypes.string ),
    isFocusable     : PropTypes.bool,
    isMultiselect   : PropTypes.bool,
    id              : PropTypes.string,
    optionions         : PropTypes.arrayOf( PropTypes.object ),
    onClick         : PropTypes.func,
    onKeyPress      : PropTypes.func,
    selectedOptions : PropTypes.arrayOf( PropTypes.string ),
};

ListBox.defaultProps = {
    activeOption    : null,
    children        : null,
    className       : null,
    cssMap          : styles,
    isFocusable     : true,
    isMultiselect   : false,
    id              : generateId( 'ListBox' ),
    options         : null,
    onClick         : null,
    onKeyPress      : null,
    selectedOptions : null,
};

export default ListBox;
