/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global document */

import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import { ScrollBox, Text }  from '../index';
import TextInputWithIcon    from '../TextInputWithIcon';
import ListBox              from '../ListBox';
import withDropdown         from '../Addons/withDropdown';
import { generateId }       from '../utils';
import InputContainer       from '../proto/InputContainer';
import styles               from './comboBox.css';
import {
    addPrefix,
    buildListBoxOptions,
    getScrollParent,
    removePrefix,
} from './utils';


const InputWithDropdown = withDropdown( TextInputWithIcon );


export default class ComboBox extends Component
{
    static propTypes =
    {
        /*
         * Active option in dropdown list
         */
        activeOption          : PropTypes.string,
        /**
         *  Extra CSS class name
         */
        className             : PropTypes.string,
        /**
         * Placeholder text to show when no dropdown list options
         */
        dropdownPlaceholder   : PropTypes.string,
        /**
         * Position of the dropdown relative to the text input
         */
        dropdownPosition      : PropTypes.oneOf( [ 'top', 'bottom', 'auto' ] ),
        /**
         *  Tooltip message text (string or JSX)
         */
        errorMessage          : PropTypes.node,
        /**
         *  Error Tooltip is displayed
         */
        errorMessageIsVisible : PropTypes.bool,
        /**
        *   Error message position relative to the icon
        */
        errorMessagePosition  : PropTypes.oneOf( [ 'top', 'topLeft' ] ),
        /**
         *  Display as hover when required from another component
         */
        forceHover            : PropTypes.bool,
        /**
         *  Input has autocomplete
         */
        hasAutocomplete       : PropTypes.bool,
        /**
         *  Display as error/invalid
         */
        hasError              : PropTypes.bool,
        /**
         *  Display Button icon as disabled
         */
        iconButtonIsDisabled  : PropTypes.bool,
        /**
         *  Alignment of the icon
         */
        iconPosition          : PropTypes.oneOf( [ 'left', 'right' ] ),
        /**
         *  Icon type to display (overrides customIcon)
         */
        iconType              : PropTypes.oneOf( [
            'account',
            'add-circle',
            'add',
            'alert',
            'approved',
            'arrow',
            'bell',
            'board',
            'calendar',
            'close-circle',
            'close-thick',
            'close',
            'dash',
            'dashboard',
            'declined',
            'delete',
            'down',
            'download',
            'duplicate',
            'edit-circle',
            'edit',
            'ended',
            'error',
            'file',
            'graph',
            'hide',
            'info',
            'inspect',
            'left',
            'lightbulb',
            'link',
            'megaphone',
            'options',
            'pending',
            'preview',
            'puzzle-piece',
            'reset',
            'right',
            'search',
            'show',
            'star-stroke',
            'star',
            'swap',
            'table',
            'up',
            'upload',
            'validation',
            'none',
        ] ),
        /**
         *  HTML id attribute
         */
        id                : PropTypes.string,
        /**
         *  Placeholder text
         */
        inputPlaceholder  : PropTypes.string,
        /**
         *  Callback that receives the native <input>: ( ref ) => { ... }
         */
        inputRef          : PropTypes.func,
        /**
         *  Display as disabled
         */
        isDisabled        : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly        : PropTypes.bool,
        /**
         *  Display as read-only for IconButton
         */
        buttonIsReadOnly  : PropTypes.bool,
        /**
         *  Display as read-only for TextInput
         */
        inputIsReadOnly   : PropTypes.bool,
        /**
         *  Input field value
         */
        inputValue        : PropTypes.string,
        /**
         *  Dropdown list allows multiple selection
         */
        isMultiselect     : PropTypes.bool,
        /*
         * Dropdown is open
         */
        isOpen            : PropTypes.bool,
        /**
         *  Label text (string or JSX node)
         */
        label             : PropTypes.node,
        /**
         *  Label position
         */
        labelPosition     : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
        /**
         *  HTML name attribute
         */
        name              : PropTypes.string,
        /**
         *  Blur callback function
         */
        onBlur            : PropTypes.func,
        /**
         *  Input change callback function
         */
        onChangeInput     : PropTypes.func,
        /**
         *  Icon click callback function
         */
        onClickIcon       : PropTypes.func,
        /*
         * On click callback function for input
         */
        onClickInput      : PropTypes.func,
        /*
         * On click callback function for dropdown option
         */
        onClickOption     : PropTypes.func,
        /**
         *  Focus callback function
         */
        onFocus           : PropTypes.func,
        /**
         *  Key down callback function
         */
        onKeyDown         : PropTypes.func,
        /**
         *  Key press callback function
         */
        onKeyPress        : PropTypes.func,
        /**
         *  Key up callback function
         */
        onKeyUp           : PropTypes.func,
        /**
         *  Mouse out callback function
         */
        onMouseOut        : PropTypes.func,
        /**
         *  Icon mouse out callback function
         */
        onMouseOutIcon    : PropTypes.func,
        /*
         * On mouse out callback function for dropdown option
         */
        onMouseOutOption  : PropTypes.func,
        /**
         *  Mouse over  callback function
         */
        onMouseOver       : PropTypes.func,
        /**
         *  Icon mouse over callback function
         */
        onMouseOverIcon   : PropTypes.func,
        /*
         * On mouse over callback function for dropdown option
         */
        onMouseOverOption : PropTypes.func,
        /*
         * On scroll dropdown list
         */
        onScroll          : PropTypes.func,
        /*
         * Dropdown list options
         */
        options           : PropTypes.arrayOf( PropTypes.object ),
        /*
         * Selected option(s) from dropdown list
         */
        selection         : PropTypes.oneOfType( [
            PropTypes.string,
            PropTypes.objectOf( PropTypes.string ),
        ] ),
        /**
         *  Input text alignment
         */
        textAlign : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
    };

    static defaultProps = {
        activeOption          : undefined,
        buttonIsReadOnly      : undefined,
        className             : undefined,
        dropdownPlaceholder   : undefined,
        dropdownPosition      : 'auto',
        errorMessage          : undefined,
        errorMessageIsVisible : false,
        errorMessagePosition  : 'top',
        forceHover            : false,
        hasAutocomplete       : false,
        hasError              : false,
        iconButtonIsDisabled  : undefined,
        iconPosition          : undefined,
        iconType              : 'none',
        id                    : undefined,
        inputIsReadOnly       : false,
        inputPlaceholder      : undefined,
        inputRef              : undefined,
        inputValue            : undefined,
        isDisabled            : false,
        isMultiselect         : false,
        isOpen                : false,
        isReadOnly            : undefined,
        label                 : undefined,
        labelPosition         : 'top',
        name                  : undefined,
        onBlur                : undefined,
        onChangeInput         : undefined,
        onClickIcon           : undefined,
        onClickInput          : undefined,
        onClickOption         : undefined,
        onFocus               : undefined,
        onKeyDown             : undefined,
        onKeyPress            : undefined,
        onKeyUp               : undefined,
        onMouseOut            : undefined,
        onMouseOutIcon        : undefined,
        onMouseOutOption      : undefined,
        onMouseOver           : undefined,
        onMouseOverIcon       : undefined,
        onMouseOverOption     : undefined,
        onScroll              : undefined,
        options               : undefined,
        selection             : undefined,
        textAlign             : 'auto',
    };

    constructor( props )
    {
        super();

        const dropdownPosition = props.dropdownPosition !== 'auto' ?
            props.dropdownPosition : 'bottom';

        this.state = { dropdownPosition };

        this.handleClickOption     = this.handleClickOption.bind( this );
        this.handleMouseOutOption  = this.handleMouseOutOption.bind( this );
        this.handleMouseOverOption = this.handleMouseOverOption.bind( this );
        this.setScrollBoxRef       = this.setScrollBoxRef( this );
        this.setWrapperRef         = this.setWrapperRef.bind( this );
    }

    componentDidMount()
    {
        this.setDropdownPosition();
    }

    componentWillReceiveProps( newProps )
    {
        this.setDropdownPosition( newProps );
    }

    componentDidUpdate()
    {
        const { scrollBox } = this;
        const { activeOption, id } = this.props;

        if ( scrollBox && activeOption )
        {
            const activeEl =
                document.getElementById( addPrefix( activeOption, id ) );

            if ( activeEl && scrollBox.scrollHeight > scrollBox.offsetHeight )
            {
                const pos        = activeEl.offsetTop;
                const elHeight   = activeEl.offsetHeight;
                const contHeight = scrollBox.offsetHeight;

                const min = scrollBox.scrollTop;
                const max = min + ( scrollBox.offsetHeight - elHeight );

                if ( pos < min )
                {
                    scrollBox.scrollTop = pos;
                }
                else if ( pos > max )
                {
                    scrollBox.scrollTop = pos - ( contHeight - elHeight );
                }
            }
        }
    }

    setScrollBoxRef( ref )
    {
        if ( ref )
        {
            this.scrollBox = ref;
        }
    }

    setWrapperRef( ref )
    {
        if ( ref )
        {
            this.wrapperRef = ref;
        }
    }

    setDropdownPosition( props = this.props )
    {
        let { dropdownPosition } = props;

        if ( props.dropdownPosition === 'auto' )
        {
            const { wrapperRef } = this;

            if ( wrapperRef )
            {
                const scrollParent = getScrollParent( wrapperRef );
                const wrapperBox   = wrapperRef.getBoundingClientRect();
                const parentBox    = scrollParent.getBoundingClientRect();
                const { height }   = parentBox;

                const offset =
                    wrapperBox.top - parentBox.top - scrollParent.scrollTop;

                dropdownPosition = offset > height / 2 ? 'top' : 'bottom';
            }
            else
            {
                dropdownPosition = 'bottom';
            }
        }

        this.setState( { dropdownPosition } );
    }

    handleClickOption( e, optId )
    {
        const { id, onClickOption } = this.props;
        if ( onClickOption )
        {
            onClickOption( e, removePrefix( optId, id ) );
        }
    }

    handleMouseOutOption( e, optId )
    {
        const { id, onMouseOutOption } = this.props;
        if ( onMouseOutOption )
        {
            onMouseOutOption( e, removePrefix( optId, id ) );
        }
    }

    handleMouseOverOption( e, optId )
    {
        const { id, onMouseOverOption } = this.props;
        if ( onMouseOverOption )
        {
            onMouseOverOption( e, removePrefix( optId, id ) );
        }
    }


    render()
    {
        const {
            activeOption,
            buttonIsReadOnly,
            className,
            dropdownPlaceholder,
            errorMessage,
            errorMessageIsVisible,
            errorMessagePosition,
            forceHover,
            hasAutocomplete,
            hasError,
            iconButtonIsDisabled,
            iconPosition,
            iconType,
            id = generateId( 'ComboBox' ),
            inputIsReadOnly,
            inputPlaceholder,
            inputRef,
            inputValue,
            isDisabled,
            isMultiselect,
            isOpen,
            isReadOnly,
            label,
            labelPosition,
            name,
            onBlur,
            onChangeInput,
            onClickIcon,
            onClickInput,
            onFocus,
            onKeyDown,
            onKeyPress,
            onKeyUp,
            onMouseOut,
            onMouseOutIcon,
            onMouseOver,
            onMouseOverIcon,
            onScroll,
            options = [],
            selection,
            textAlign,
        } = this.props;

        const { dropdownPosition } = this.state;

        let dropdownContent;

        if ( options.length )
        {
            dropdownContent = (
                <ScrollBox
                    height       = "50vh"
                    onScroll     = { onScroll }
                    scroll       = "vertical"
                    scrollBoxRef = { this.setScrollBoxRef }>
                    <ListBox
                        activeOption      = { addPrefix( activeOption, id ) }
                        id                = { addPrefix( 'listbox', id ) }
                        isFocusable       = { false }
                        isMultiselect     = { isMultiselect }
                        onClickOption     = { this.handleClickOption }
                        onMouseOutOption  = { this.handleMouseOutOption }
                        onMouseOverOption = { this.handleMouseOverOption }
                        selection         = { addPrefix( selection, id ) }>
                        { buildListBoxOptions( options, id ) }
                    </ListBox>
                </ScrollBox>
            );
        }
        else
        {
            dropdownContent = (
                <Text
                    className = { styles.dropdownPlaceholder }
                    noWrap
                    overflowIsHidden
                    role = "subtle">
                    { dropdownPlaceholder }
                </Text>
            );
        }

        return (
            <InputContainer
                className     = { className }
                label         = { label }
                labelPosition = { labelPosition }
                onMouseOut    = { onMouseOut }
                onMouseOver   = { onMouseOver }>
                <InputWithDropdown
                    aria = { {
                        activeDescendant :
                            activeOption && addPrefix( activeOption, id ),
                        autocomplete : hasAutocomplete ? 'both' : 'list',
                        expanded     : isOpen,
                        hasPopup     : 'listbox',
                        owns         : addPrefix( 'listbox', id ),
                        role         : 'combobox',
                    } }
                    autoCapitalize   = "off"
                    autoComplete     = "off"
                    autoCorrect      = "off"
                    dropdownIsOpen   = { isOpen }
                    dropdownPosition = { dropdownPosition }
                    dropdownProps    = { {
                        children : dropdownContent,
                        hasError,
                        padding  : options.length ? 'none' : 'S',
                    } }
                    errorMessage          = { errorMessage }
                    errorMessageIsVisible = { errorMessageIsVisible }
                    errorMessagePosition  = { errorMessagePosition }
                    forceHover            = { forceHover }
                    hasError              = { hasError }
                    iconButtonIsDisabled  = { iconButtonIsDisabled }
                    iconPosition          = { iconPosition }
                    iconType              = { iconType }
                    id                    = { id }
                    inputRef              = { inputRef }
                    isDisabled            = { isDisabled }
                    isReadOnly            = { isReadOnly }
                    isReadOnlyButton      = { buttonIsReadOnly }
                    isReadOnlyInput       = { inputIsReadOnly }
                    name                  = { name }
                    onBlur                = { onBlur }
                    onChange              = { onChangeInput }
                    onClick               = { onClickInput }
                    onClickIcon           = { onClickIcon }
                    onFocus               = { onFocus }
                    onKeyDown             = { onKeyDown }
                    onKeyPress            = { onKeyPress }
                    onKeyUp               = { onKeyUp }
                    onMouseOutIcon        = { onMouseOutIcon }
                    onMouseOverIcon       = { onMouseOverIcon }
                    placeholder           = { inputPlaceholder }
                    spellCheck            = { false }
                    textAlign             = { textAlign }
                    value                 = { inputValue }
                    wrapperRef            = { this.setWrapperRef } />
            </InputContainer>
        );
    }
}
