import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import styles    from './listBox.css';
import {
    buildClassName,
    generateId,
    mapAria,
} from '../utils';

const killFocus = e => e.preventDefault();

const ListBox = ( {
    aria,
    activeOption,
    children,
    className,
    cssMap,
    isFocusable,
    isMultiselect,
    id = generateId( 'ListBox' ),
    onClick,
    onClickOption,
    onMouseOutOption,
    onMouseOverOption,
    onKeyPress,
    options,
    selectedOptions,
} ) => (
        <ul
            { ...mapAria( {
                ...aria,
                activeDescendant : isFocusable ? activeOption : null,
                multiSelectable  : isMultiselect,
                role             : 'listbox',
            } ) }
            className   = { buildClassName( className, cssMap ) }
            id          = { id }
            onKeyPress  = { onKeyPress }
            onMouseDown = { !isFocusable && killFocus }
            tabIndex    = { isFocusable ? '0' : '-1' }>
            { children && children.map( option => {
            if( option.options )
            {
                return
            }
            return (
                React.cloneElement( option, {
                    isActive   : option.props.id === activeOption,
                    isSelected : selectedOptions &&
                        selectedOptions.indexOf( option.props.id ) > -1,
                    onClick     : onClickOption,
                    onMouseOut  : onMouseOutOption,
                    onMouseOver : onMouseOverOption,
                } )
            );
            } ) }
        </ul>
);


ListBox.propTypes = {
    aria            : PropTypes.objectOf( PropTypes.string ),
    activeOption    : PropTypes.string,
    children        : PropTypes.node,
    className       : PropTypes.string,
    cssMap          : PropTypes.objectOf( PropTypes.string ),
    isFocusable     : PropTypes.bool,
    isMultiselect   : PropTypes.bool,
    id              : PropTypes.string,
    options         : PropTypes.arrayOf( PropTypes.object ),
    onClick         : PropTypes.func,
    onKeyPress      : PropTypes.func,
    selectedOptions : PropTypes.arrayOf( PropTypes.string ),
};

ListBox.defaultProps = {
    aria            : undefined,
    activeOption    : undefined,
    children        : undefined,
    className       : undefined,
    cssMap          : styles,
    isFocusable     : true,
    isMultiselect   : false,
    id              : undefined,
    options         : undefined,
    onClick         : undefined,
    onKeyPress      : undefined,
    selectedOptions : undefined,
};

export default ListBox;
