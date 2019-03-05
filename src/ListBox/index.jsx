/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React                           from 'react';
import PropTypes                       from 'prop-types';

import { buildOptions, updateOptions } from './utils';
import {
    attachEvents,
    killFocus,
    mapAria,
    useTheme,
} from '../utils';


const componentName = 'ListBox';

const ListBox = props =>
{
    const {
        aria,
        activeOption,
        children,
        isFocusable,
        isMultiselect,
        onClickOption,
        onMouseOutOption,
        onMouseOverOption,
        options,
        selection,
    } = props;

    const cssMap = useTheme( componentName, props );

    let realSelection = selection;

    if ( Array.isArray( selection ) )
    {
        realSelection = isMultiselect ? selection : selection[ 0 ];
    }
    return (
        <ul
            { ...attachEvents( props ) }
            { ...mapAria( {
                ...aria,
                activeDescendant : isFocusable ? activeOption : null,
                multiSelectable  : isMultiselect,
                role             : 'listbox',
            } ) }
            className   = { cssMap.main }
            onMouseDown = { !isFocusable ? killFocus : undefined }
            tabIndex    = { isFocusable ? '0' : '-1' }>
            { updateOptions(
                children || buildOptions( options ),
                {
                    activeOption,
                    onClickOption,
                    onMouseOutOption,
                    onMouseOverOption,
                    selection : realSelection,
                },
            ) }
        </ul>
    );
};

ListBox.propTypes = {
    aria              : PropTypes.objectOf( PropTypes.string ),
    /**
    *  Highlights option
    */
    activeOption      : PropTypes.string,
    children          : PropTypes.node,
    /**
     *  Extra CSS class name
     */
    className         : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap            : PropTypes.objectOf( PropTypes.string ),
    isFocusable       : PropTypes.bool,
    isMultiselect     : PropTypes.bool,
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
    selection         : PropTypes.oneOfType( [
        PropTypes.string,
        PropTypes.arrayOf( PropTypes.string ),
    ] ),
};

ListBox.defaultProps = {
    activeOption      : undefined,
    aria              : undefined,
    children          : undefined,
    className         : undefined,
    cssMap            : undefined,
    isFocusable       : true,
    isMultiselect     : false,
    onClickOption     : undefined,
    onMouseOutOption  : undefined,
    onMouseOverOption : undefined,
    options           : undefined,
    selection         : undefined,
};

ListBox.displayName = componentName;

export default ListBox;
