/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global document */

import React        from 'react';
import PropTypes    from 'prop-types';

import {
    ListBox,
    ScrollBox,
    TagInput,
} from '../index';
import withDropdown from '../Addons/withDropdown';
import {
    addPrefix,
    buildListBoxOptions,
    getScrollParent,
} from '../ComboBox/utils';

const TagInputwithDropdown = withDropdown( TagInput );

export default class TagInputStateful extends React.Component
{
    static propTypes =
    {
        /**
         *  CSS class name
         */
        className        : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap           : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Position of the dropdown relative to the text input
         */
        dropdownPosition : PropTypes.oneOf( [ 'top', 'bottom', 'auto' ] ),
        /**
         *  Display as hover when required from another component
         */
        forceHover       : PropTypes.bool,
        /**
         *  specifies the height for the tag input (CSS length value)
         */
        height           : PropTypes.string,
        /**
         *  Display as error/invalid
         */
        hasError         : PropTypes.bool,
        /**
         *  HTML id attribute
         */
        id               : PropTypes.string,
        /**
         *  Callback that receives the native <input>: ( ref ) => { ... }
         */
        inputRef         : PropTypes.func,
        /**
         *  Display as disabled
         */
        isDisabled       : PropTypes.bool,
        /**
         *  Dropdown is open
         */
        isOpen           : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly       : PropTypes.bool,
        /**
         *  Allows container to be resize by the user
         */
        isResizable      : PropTypes.bool,
        /**
         *  HTML name attribute
         */
        name             : PropTypes.string,
        /**
         * onBlur callback function
         */
        onBlur           : PropTypes.func,
        /**
         *  Input change callback function
         */
        onChange         : PropTypes.func,
        /**
         *  Button click callback function: ( e ) => { ... }
         */
        onClickClose     : PropTypes.func,
        /*
         * On click callback function for dropdown option
         */
        onClickOption    : PropTypes.func,
        /**
         *  onFocus callback function
         */
        onFocus          : PropTypes.func,
        /**
         *  onKeyDown callback function
         */
        onKeyDown        : PropTypes.func,
        /**
         *  onKeyUp callback function
         */
        onKeyUp          : PropTypes.func,
        /**
         *  onKeyPress callback function
         */
        onKeyPress       : PropTypes.func,
        /**
         *  Input mouseOut callback function
         */
        onMouseOut       : PropTypes.func,
        /**
         *  Input mouseOver callback function
         */
        onMouseOver      : PropTypes.func,
        /**
         *  Dropdown list options
         */
        options          : PropTypes.arrayOf( PropTypes.object ),
        /**
         *  Placeholder text
         */
        placeholder      : PropTypes.string,
        /**
         *  Array of strings to build Tag components
         */
        tags             : PropTypes.arrayOf( PropTypes.oneOfType( [
            PropTypes.string,
            PropTypes.object,
        ] ) ),
        /**
         *  Input's value
         */
        value : PropTypes.string,
    };

    static defaultProps =
    {
        className        : undefined,
        dropdownPosition : 'auto',
        forceHover       : false,
        hasError         : false,
        height           : undefined,
        id               : undefined,
        inputRef         : undefined,
        isDisabled       : false,
        isOpen           : false,
        isReadOnly       : false,
        isResizable      : false,
        name             : undefined,
        onBlur           : undefined,
        onChange         : undefined,
        onClickClose     : undefined,
        onClickOption    : undefined,
        onFocus          : undefined,
        onKeyDown        : undefined,
        onKeyPress       : undefined,
        onKeyUp          : undefined,
        onMouseOut       : undefined,
        onMouseOver      : undefined,
        options          : undefined,
        placeholder      : undefined,
        tags             : undefined,
        value            : '',
    };

    constructor( props )
    {
        super( props );

        const dropdownPosition = props.dropdownPosition !== 'auto' ?
            props.dropdownPosition : 'bottom';

        this.state = {
            dropdownPosition,
            isOpen : props.isOpen,
            tags   : props.tags,
            value  : props.value,
        };

        this.handleBlur        = this.handleBlur.bind( this );
        this.handleChange      = this.handleChange.bind( this );
        this.handleClickClose  = this.handleClickClose.bind( this );
        this.handleClickOption = this.handleClickOption.bind( this );
        this.handleFocus       = this.handleFocus.bind( this );
        this.handleKeyDown     = this.handleKeyDown.bind( this );
        this.setInputRef       = this.setInputRef.bind( this );
        this.setScrollBoxRef   = this.setScrollBoxRef( this );
        this.setWrapperRef     = this.setWrapperRef.bind( this );
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

    setInputRef( ref )
    {
        this.inputRef = ref;
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

    handleBlur( e )
    {
        const callback = this.props.onBlur;

        if ( callback )
        {
            callback( e );
        }

        this.setState( { isOpen: false } );
    }

    handleChange( e )
    {
        const newValue = e.target.value;
        const callback = this.props.onChange;

        if ( callback )
        {
            callback( e );
        }

        this.setState( { value: newValue } );
    }

    handleClickClose( e )
    {
        const { tags } = this.state;
        const callback = this.props.onClickClose;
        const closeTag = e.target.value;

        if ( callback )
        {
            callback( closeTag );
        }

        const newItems = tags.filter( ( item ) => ( typeof item === 'string' ?
            item !== closeTag : item.value !== closeTag ) );

        this.setState( { tags: newItems } );
    }

    handleClickOption( e, id )
    {
        const { tags } = this.state;
        const callback = this.props.onClickOption;

        if ( callback )
        {
            callback( e );
        }

        const option = this.props.options.find( opt => opt.id === id );
        const newTags = [ ...tags, option.text ];

        this.setState( { tags: newTags } );
    }

    handleFocus( e )
    {
        const callback = this.props.onFocus;

        if ( callback )
        {
            callback( e );
        }

        this.setState( { isOpen: true } );
    }

    handleKeyDown( e )
    {
        const BACKSPACE       = 8;
        const ENTER           = 13;
        const { tags, value } = this.state;
        const callback        = this.props.onKeyDown;

        if ( callback )
        {
            callback( e );
        }

        if ( e.keyCode === BACKSPACE && value === '' )
        {
            const newItems = tags.slice( 0, -1 );

            this.setState( { tags: newItems } );
        }

        if ( e.keyCode === ENTER && value !== '' )
        {
            const newItems = tags.concat( value );

            this.setState( { tags: newItems, value: '' } );
        }
    }

    render()
    {
        const { props }  = this;
        const { isOpen } = this.state;


        const filteredOptions = this.props.options.filter( item =>
            !this.state.tags.includes( item.text ) );


        const dropdownContent = !!filteredOptions.length && (
            <ScrollBox
                onScroll     = { props.onScroll }
                scroll       = "vertical"
                scrollBoxRef = { this.setScrollBoxRef }>
                <ListBox
                    id            = { addPrefix( 'listbox', props.id ) }
                    isFocusable   = { false }
                    onClickOption = { this.handleClickOption }
                    selection = { addPrefix( props.selection, props.id ) }>
                    { buildListBoxOptions(
                        filteredOptions,
                        props.id,
                    ) }
                </ListBox>
            </ScrollBox>
        );

        return (
            <TagInputwithDropdown
                { ...props }
                dropdownIsOpen   = { filteredOptions.length && isOpen }
                dropdownPosition = { this.state.dropdownPosition }
                dropdownProps    = { {
                    children : dropdownContent,
                    padding  : props.options.length ? 'none' : 'S',
                } }
                inputRef     = { this.setInputRef }
                onBlur       = { this.handleBlur }
                onChange     = { this.handleChange }
                onClickClose = { this.handleClickClose }
                onFocus      = { this.handleFocus }
                onKeyDown    = { this.handleKeyDown }
                tags         = { this.state.tags }
                value        = { this.state.value }
                wrapperRef   = { this.setWrapperRef } />
        );
    }
}
