/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React        from 'react';
import PropTypes    from 'prop-types';

import {
    buildOptions,
    updateOptions,
} from './utils';
import {
    buildClassName,
    createEventHandler,
    generateId,
    killFocus,
    mapAria,
} from '../utils';
import styles from './listBox.css';


const ListBox = ( {
    activeOption,
    aria,
    children,
    className,
    cssMap,
    id = generateId( 'ListBox' ),
    isFocusable,
    isMultiselect,
    onClickOption,
    onKeyPress,
    onMouseOutOption,
    onMouseOverOption,
    options,
    selection,
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
        onKeyPress  = { createEventHandler( onKeyPress, { id } ) }
        onMouseDown = { !isFocusable && killFocus }
        tabIndex    = { isFocusable ? '0' : '-1' }>
        { updateOptions(
            children || buildOptions( options ),
            {
                activeOption,
                onClickOption,
                onMouseOutOption,
                onMouseOverOption,
                selection : ( isMultiselect && Array.isArray( selection ) ) ?
                    selection[ 0 ] : selection,
            },
        ) }
    </ul>
);


ListBox.propTypes = {
    aria              : PropTypes.objectOf( PropTypes.string ),
    /**
    *  Highlights option
    */
    activeOption      : PropTypes.string,
    children          : PropTypes.node,
    /**
    *  css class
    */
    className         : PropTypes.string,
    cssMap            : PropTypes.objectOf( PropTypes.string ),
    isFocusable       : PropTypes.bool,
    isMultiselect     : PropTypes.bool,
    /**
    *  ListBox ID
    */
    id                : PropTypes.string,
    /**
    *  Array of strings or objects (to build the options)
    */
    options           : PropTypes.arrayOf( PropTypes.object ),
    /**
     *  onClickOption callback function ( e ) => { ... }
     */
    onClickOption     : PropTypes.func,
    /**
     *  onMouseOutOption callback function ( e ) => { ... }
     */
    onMouseOutOption  : PropTypes.func,
    /**
     *  onMouseOverOption callback function ( e ) => { ... }
     */
    onMouseOverOption : PropTypes.func,
    /**
     *  onKeyPress callback function ( e ) => { ... }
     */
    onKeyPress        : PropTypes.func,
    selection         : PropTypes.oneOfType( [
        PropTypes.string,
        PropTypes.arrayOf( PropTypes.string ),
    ] ),
};

ListBox.defaultProps = {
    aria              : undefined,
    activeOption      : undefined,
    children          : undefined,
    className         : undefined,
    cssMap            : styles,
    isFocusable       : true,
    isMultiselect     : false,
    id                : undefined,
    options           : undefined,
    onClickOption     : undefined,
    onMouseOutOption  : undefined,
    onMouseOverOption : undefined,
    onKeyPress        : undefined,
    selection         : undefined,
};

export default ListBox;
