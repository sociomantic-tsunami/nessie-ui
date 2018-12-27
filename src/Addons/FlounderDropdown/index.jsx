/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint max-len: ["error", { "ignoreTrailingComments": true }] */
/* global Event */

import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import Flounder             from 'flounder/src/core/flounder';

import H1                   from '../../H1';
import H2                   from '../../H2';
import H3                   from '../../H3';
import H4                   from '../../H4';
import {
    addExtraClasses,
    mapCssToFlounder,
    mapIconClassesToFlounder,
    stringifyArr,
    stringifyObj,
} from './utils';
import { createCssMap } from '../../Theming';
import ThemeContext     from '../../Theming/ThemeContext';

const headers = {
    1 : H1, 2 : H2, 3 : H3, 4 : H4,
};

const rebuildOnProps = [
    'classes',
    'data',
    'headerLevel',
    'icon',
    'isReadOnly',
    'multiple',
    'multipleMessage',
    'multipleTags',
    'noMoreOptionsMessage',
    'noMoreResultsMessage',
    'onBlur',
    'onChange',
    'onClose',
    'onFirstTouch',
    'onFocus',
    'onInputChange',
    'onOpen',
    'openOnHover',
    'placeholder',
    'search',
];


export default class FlounderDropdown extends Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Extra CSS class name
         */
        className : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap    : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Array of strings or objects (to build the options)
         */
        data      : PropTypes.arrayOf( PropTypes.oneOfType( [
            PropTypes.string,
            PropTypes.shape( {
                text        : PropTypes.string,
                value       : PropTypes.string,
                description : PropTypes.string,
                disabled    : PropTypes.bool,
                icon        : PropTypes.string,
                extraClass  : PropTypes.string,
            } ),
        ] ) ),
        /**
         *  Disable arrow
         */
        disableArrow : PropTypes.bool,
        /**
         * Display as hover when required from another component
         */
        forceHover   : PropTypes.bool,
        /**
         *  Display as error/invalid
         */
        hasError     : PropTypes.bool,
        /**
         *  Display the dropdown as a header (H1-4)
         */
        headerLevel  : PropTypes.oneOf( [ 1, 2, 3, 4, 'none' ] ),
        /**
         * Toggle icon to show on the right of the dropdown
         */
        icon         : PropTypes.oneOf( [
            'arrow',
            'magnifier',
            'none',
        ] ),
        /**
         *  Display as disabled
         */
        isDisabled           : PropTypes.bool,
        /**
         *  Display as read only
         */
        isReadOnly           : PropTypes.bool,
        /**
         * Determines whether it is a multi-select box or single
         */
        multiple             : PropTypes.bool,
        /**
         * If there are no tags, this is the message that will be displayed in
         * the selected area when there are multiple options selected
         */
        multipleMessage      : PropTypes.string,
        /**
         *  Determines how a multi-select box is displayed
         */
        multipleTags         : PropTypes.bool,
        /**
         * message to display when there are no option left
         */
        noMoreOptionsMessage : PropTypes.string,
        /**
         * message to display when there are no results left after a search
         */
        noMoreResultsMessage : PropTypes.string,
        /**
         *  onBlur callback function (not yet implemented)
         */
        onBlur               : PropTypes.func,
        /**
         *  onChange callback function triggered when the selection is changed:
         *  ( e ) => { ... }
         */
        onChange             : PropTypes.func,
        /**
         * Triggered when the selectbox is closed
         */
        onClose              : PropTypes.func,
        /**
         * Triggered the first time flounder is interacted with. An example
         * usage would be calling an api for a list of data to populate a
         * dropdown, but waiting to see if the user interacts with it
         */
        onFirstTouch         : PropTypes.func,
        /**
         *  onFocus callback function: ( e ) => { ... }
         */
        onFocus              : PropTypes.func,
        /**
         * Triggered when someone types in a search box. note: this will do
         * nothing if search is not enabled
         */
        onInputChange        : PropTypes.func,
        /**
         *  onMouseOut callback function : ( e ) => { ... }
         */
        onMouseOut           : PropTypes.func,
        /**
         *  onMouseOver callback function (not yet implemented)
         */
        onMouseOver          : PropTypes.func,
        /**
         * Triggered when the selectbox is opened
         */
        onOpen               : PropTypes.func,
        /**
         *  replaces click to open action with hover
         */
        openOnHover          : PropTypes.bool,
        /**
         *  Placeholder text
         */
        placeholder          : PropTypes.string,
        /**
        *  Add option to search dropdown
        */
        search               : PropTypes.bool,
        /**
         *  Selected value(s)
         */
        value                : PropTypes.oneOfType( [
            PropTypes.string,
            PropTypes.arrayOf( PropTypes.string ),
        ] ),
    };

    static defaultProps =
    {
        className            : undefined,
        cssMap               : undefined,
        data                 : undefined,
        disableArrow         : false,
        forceHover           : false,
        hasError             : false,
        headerLevel          : 'none',
        icon                 : 'arrow',
        isDisabled           : false,
        isReadOnly           : false,
        multiple             : false,
        multipleMessage      : '(Multiple Items Selected)',
        multipleTags         : false,
        noMoreOptionsMessage : 'No more options to add',
        noMoreResultsMessage : 'No matches found',
        onBlur               : undefined,
        onChange             : undefined,
        onClose              : undefined,
        onFirstTouch         : undefined,
        onFocus              : undefined,
        onInputChange        : undefined,
        onMouseOut           : undefined,
        onMouseOver          : undefined,
        onOpen               : undefined,
        openOnHover          : false,
        placeholder          : 'Please choose an option',
        search               : false,
        value                : '',
    };

    constructor( props )
    {
        super( props );
        this.handleRef = this.handleRef.bind( this );
        this.state = {
            cssMap : createCssMap( this.context.FlounderDropdown, props ),
        };
    }

    componentDidMount()
    {
        const { props } = this;

        this.buildFlounder();
        this.setValue( props.value );
        this.setDisabled();
    }

    componentDidUpdate( prevProps )
    {
        const { props } = this;

        // eslint-disable-next-line no-restricted-syntax
        for ( const propName of rebuildOnProps )
        {
            if ( stringifyObj( prevProps[ propName ] ) !==
                stringifyObj( props[ propName ] ) )
            {
                this.buildFlounder();
                break;
            }
        }

        this.setValue();
        this.setDisabled();
    }

    componentWillUnmount()
    {
        const { flounderInstance } = this;

        if ( flounderInstance )
        {
            flounderInstance.destroy();
            this.flounderInstance = null;
        }
    }

    setDisabled()
    {
        const { flounderInstance, props } = this;

        if ( flounderInstance )
        {
            flounderInstance.disable( props.isDisabled );
        }
    }

    setValue( value = this.props.value )
    {
        const { flounderInstance } = this;

        if ( !flounderInstance )
        {
            return;
        }

        if ( value !== undefined || this.props.isReadOnly )
        {
            let values = [];

            if ( Array.isArray( value ) )
            {
                values = value;
            }
            else if ( value )
            {
                values = [ value ];
            }

            const selectedValues = flounderInstance.getSelectedValues() || [];

            if ( stringifyArr( selectedValues ) !== stringifyArr( values ) )
            {
                flounderInstance.deselectAll( true );
                flounderInstance.setByValue( values );
            }
        }
    }

    buildFlounder()
    {
        const { flounderDiv } = this;

        if ( flounderDiv )
        {
            const { flounderInstance, props } = this;

            const onChange = ( ...args ) =>
            {
                this.setValue();

                if ( !props.isReadOnly && props.onChange )
                {
                    props.onChange( ...args );
                }
            };

            let data = addExtraClasses(
                props.data,
                props.cssMap.optionWithDescription,
            );

            data = mapIconClassesToFlounder( data, this.state.cssMap );

            const flounderProps = {
                classes              : mapCssToFlounder( this.state.cssMap ),
                data,
                disableArrow         : props.icon === 'none',
                multiple             : props.multiple,
                multipleMessage      : props.multipleMessage,
                multipleTags         : !props.isHeader && props.multipleTags,
                noMoreOptionsMessage : props.noMoreOptionsMessage,
                noMoreResultsMessage : props.noMoreResultsMessage,
                onBlur               : props.onBlur,  // not yet implemented
                onChange,
                onClose              : props.onClose,
                onFirstTouch         : props.onFirstTouch,
                onFocus              : props.onFocus, // not yet implemented
                onInputChange        : props.onInputChange,
                onOpen               : props.onOpen,
                openOnHover          : props.openOnHover,
                placeholder          : props.placeholder || '',
                search               : !props.isHeader && props.search,
            };

            const keepOpen = this.isOpen();

            if ( flounderInstance && flounderInstance === flounderDiv.flounder )
            {
                flounderInstance.rebuild( flounderProps );
            }
            else
            {
                if ( flounderInstance )
                {
                    this.flounderInstance.destroy();
                }

                this.flounderInstance =
                    new Flounder( flounderDiv, flounderProps );
            }

            if ( keepOpen )
            {
                flounderInstance.toggleList( new Event( {} ) );
            }
        }
    }

    isOpen()
    {
        const { flounderInstance } = this;
        const { cssMap } = this.state;

        if ( flounderInstance )
        {
            const { wrapper } = flounderInstance.refs;

            if ( wrapper.className.match( cssMap.open ) )
            {
                return true;
            }
        }

        return false;
    }

    handleRef( node )
    {
        this.flounderDiv = node;
    }

    render()
    {
        const {
            headerLevel,
            onMouseOver,
            onMouseOut,
        } = this.props;

        const { cssMap } = this.state;

        const isHeader = typeof headers[ headerLevel ] !== 'undefined';
        const Wrapper  = isHeader ? headers[ headerLevel ] : 'div';

        return (
            <Wrapper
                className    = { cssMap.main }
                onMouseEnter = { onMouseOver }
                onMouseLeave = { onMouseOut }>
                <div ref = { this.handleRef } />
            </Wrapper>
        );
    }
}
