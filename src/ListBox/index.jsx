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

import React                              from 'react';
import PropTypes                          from 'prop-types';

import { buildOptions, updateOptions }    from './utils';
import { generateId, killFocus, mapAria } from '../utils';
import ThemeContext                       from '../Theming/ThemeContext';
import { createCssMap }                   from '../Theming';


export default class ListBox extends React.Component
{
    static contextType = ThemeContext;

    static propTypes = {
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
        selection         : PropTypes.oneOfType( [
            PropTypes.string,
            PropTypes.arrayOf( PropTypes.string ),
        ] ),
    };

    static defaultProps = {
        activeOption      : undefined,
        aria              : undefined,
        children          : undefined,
        className         : undefined,
        cssMap            : undefined,
        id                : undefined,
        isFocusable       : true,
        isMultiselect     : false,
        onClickOption     : undefined,
        onMouseOutOption  : undefined,
        onMouseOverOption : undefined,
        options           : undefined,
        selection         : undefined,
    };

    static displayName = 'ListBox';

    render()
    {
        const {
            aria,
            activeOption,
            children,
            cssMap = createCssMap( this.context.ListBox, this.props ),
            isFocusable,
            isMultiselect,
            id = generateId( 'ListBox' ),
            onClickOption,
            onMouseOutOption,
            onMouseOverOption,
            options,
            selection,
        } = this.props;

        let realSelection = selection;

        if ( Array.isArray( selection ) )
        {
            realSelection = isMultiselect ? selection : selection[ 0 ];
        }
        return (
            <ul
                { ...mapAria( {
                    ...aria,
                    activeDescendant : isFocusable ? activeOption : null,
                    multiSelectable  : isMultiselect,
                    role             : 'listbox',
                } ) }
                className   = { cssMap.main }
                id          = { id }
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
    }
}
