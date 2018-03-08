/* eslint max-len: ["error", { "ignoreTrailingComments": true }] */

import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import Flounder             from 'flounder/src/core/flounder';

import Css                  from '../hoc/Css';
import InputContainer       from '../proto/InputContainer';
import H1                   from '../H1';
import H2                   from '../H2';
import H3                   from '../H3';
import H4                   from '../H4';
import styles               from './flounderDropdown.css';
import {
    mapCssToFlounder,
    mapIconClassesToFlounder,
    stringifyArr,
    stringifyObj,
} from './utils';

const headers = { 1: H1, 2: H2, 3: H3, 4: H4 };

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
    'search'
];

const buildFlounder = ( node, props = {} ) =>
{
    if ( node )
    {
        let flounder = node.flounder;

        const keepOpen = !!( flounder &&
            flounder.refs.wrapper.className.match( props.cssMap.open ) );

        const onChange = ( ...args ) =>
        {
            const toChange = !props.isReadOnly && props.onChange;

            if ( typeof props.value !== 'undefined' || props.isReadOnly )
            {
                setValue( flounder, props.value );
            }

            toChange && props.onChange( ...args );
        };

        const flounderProps =
            {
                classes : mapCssToFlounder( props.cssMap ),
                data    : mapIconClassesToFlounder(
                    props.data, props.cssMap ),
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
                placeholder          : props.placeholder,
                search               : !props.isHeader && props.search
            };

        flounder = flounder ? flounder.rebuild( flounderProps ) :
            new Flounder( node, flounderProps );

        if ( keepOpen )
        {
            flounder.toggleList( {} );
        }

        return flounder;
    }

    return false;
};

const setValue = ( flounder, value ) =>
{
    if ( flounder )
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

        const selectedValues = flounder.getSelectedValues() || [];

        if ( stringifyArr( selectedValues ) !== stringifyArr( values ) )
        {
            flounder.deselectAll( true );
            flounder.setByValue( values );
        }
    }
};

export default class FlounderDropdown extends Component
{
    static propTypes =
    {
        /**
        *  Label text
        */
        label         : PropTypes.node,
        /**
         *  Label position
         */
        labelPosition : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
        /**
        *  Placeholder text
        */
        placeholder   : PropTypes.string,
        /**
        *  Array of strings or objects (to build the options)
        */
        data          : PropTypes.arrayOf(
            PropTypes.oneOfType( [
                PropTypes.string,
                PropTypes.shape( {
                    text        : PropTypes.string,
                    value       : PropTypes.string,
                    description : PropTypes.string,
                    disabled    : PropTypes.bool,
                    icon        : PropTypes.string,
                    extraClass  : PropTypes.string
                } )
            ] )
        ),
        /**
         *  Display the dropdown as a header (H1-4)
         */
        headerLevel           : PropTypes.oneOf( [ 1, 2, 3, 4, 'none' ] ),
        /**
         *  Display as error/invalid
         */
        hasError              : PropTypes.bool,
        /**
         *  Tooltip message text (string or JSX)
         */
        errorMessage          : PropTypes.node,
        /**
         *  Tooltip is displayed
         */
        errorMessageIsVisible : PropTypes.bool,
        /**
        *  Error message position relative to the icon
        */
        errorMessagePosition  : PropTypes.oneOf( [ 'top', 'topLeft' ] ),
        /**
        *  Display as disabled
        */
        isDisabled            : PropTypes.bool,
        /**
        *  Display as read only
        */
        isReadOnly            : PropTypes.bool,
        /**
         *  Initial selected value(s). Not the same as the native Flounder
         *  option with the same name
         */
        defaultValue          : PropTypes.oneOfType( [
            PropTypes.string,
            PropTypes.arrayOf( PropTypes.string )
        ] ),
        /**
         *  Selected value(s)
         */
        value : PropTypes.oneOfType( [
            PropTypes.string,
            PropTypes.arrayOf( PropTypes.string )
        ] ),
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
         * Triggered when someone types in a search box. note: this will do
         * nothing if search is not enabled
         */
        onInputChange        : PropTypes.func,
        /**
         * Triggered when the selectbox is opened
         */
        onOpen               : PropTypes.func,
        /**
         *  replaces click to open action with hover
         */
        openOnHover          : PropTypes.bool,
        /**
         *  onFocus callback function: ( e ) => { ... }
         */
        onFocus              : PropTypes.func,
        /**
         *  onBlur callback function (not yet implemented)
         */
        onBlur               : PropTypes.func,
        /**
         *  onMouseOver callback function (not yet implemented)
         */
        onMouseOver          : PropTypes.func,
        /**
         *  onMouseOut callback function : ( e ) => { ... }
         */
        onMouseOut           : PropTypes.func,
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
         * message to display when there are no option left
         */
        noMoreOptionsMessage : PropTypes.string,
        /**
         * message to display when there are no results left after a search
         */
        noMoreResultsMessage : PropTypes.string,
        /**
        *  Determines how a multi-select box is displayed
        */
        multipleTags         : PropTypes.bool,
        /**
        *  Add option to search dropdown
        */
        search               : PropTypes.bool,
        /**
         * Display as hover when required from another component
         */
        forceHover           : PropTypes.bool,
        /**
         * Toggle icon to show on the right of the dropdown
         */
        icon                 : PropTypes.oneOf( [
            'arrow',
            'magnifier',
            'none'
        ] ),
    };

    static defaultProps =
    {
        labelPosition         : 'top',
        headerLevel           : 'none',
        hasError              : false,
        errorMessageIsVisible : false,
        isDisabled            : false,
        isReadOnly            : false,
        multiple              : false,
        multipleMessage       : '(Multiple Items Selected)',
        multipleTags          : false,
        noMoreOptionsMessage  : 'No more options to add',
        search                : false,
        noMoreResultsMessage  : 'No matches found',
        openOnHover           : false,
        disableArrow          : false,
        forceHover            : false,
        placeholder           : 'Please choose an option',
        icon                  : 'arrow',
        cssMap                : styles
    };

    constructor( props )
    {
        super( props );
        this.handleRef = this.handleRef.bind( this );
    }


    componentDidMount()
    {
        const { flounderDiv, props } = this;
        const flounder = buildFlounder( flounderDiv, props );

        setValue( flounder, props.value || props.defaultValue );
        flounder.disable( props.isDisabled );

        this.flounderInstance = flounder;
    }

    componentDidUpdate( prevProps )
    {
        const { flounderDiv, props } = this;
        let { flounderInstance } = this;

        // eslint-disable-next-line no-restricted-syntax
        for ( const propName of rebuildOnProps )
        {
            if ( stringifyObj( prevProps[ propName ] ) !==
                stringifyObj( props[ propName ] ) )
            {
                flounderInstance = buildFlounder( flounderDiv, props );
                break;
            }
        }

        setValue( flounderInstance, props.value );
        flounderInstance.disable( props.isDisabled );
    }

    handleRef( node )
    {
        this.flounderDiv = node;
    }

    render()
    {
        const { className, cssMap, label, ...props } = this.props;

        const {
            forceHover,
            hasError,
            headerLevel,
            icon,
            isDisabled,
            onMouseOut,
            onMouseOver
        } = props;

        const isHeader = typeof headers[ headerLevel ] !== 'undefined';
        const Wrapper  = isHeader ? headers[ headerLevel ] : 'div';

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { {
                    headerMode  : isHeader,
                    headerLevel,
                    toggleIcon  : icon,
                    error       : !isDisabled && hasError,
                    fakeHovered : !isDisabled && !hasError &&
                                              forceHover
                } }>
                <Wrapper className = { className }>
                    <InputContainer { ...props } label = { !isHeader && label }>
                        <div
                            ref = { this.handleRef }
                            onMouseOver = { onMouseOver }
                            onMouseOut  = { onMouseOut }
                        />
                    </InputContainer>
                </Wrapper>
            </Css>
        );
    }
}
