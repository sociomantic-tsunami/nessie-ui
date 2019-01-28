/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
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
import withDropdown     from '../Addons/withDropdown';
import { generateId }   from '../utils';
import {
    addPrefix,
    buildListBoxOptions,
} from '../ComboBox/utils';


/**
 * gets the index of the option by the passed id
 *
 * @param {String} id id of the option
 * @param {Array} options Array of options
 *
 * @return {Number} index of the option
 */
function getIndex( id, options = [] )
{
    return options.findIndex( opt => opt.id === id );
}

/**
 * gets the option by the passed id
 *
 * @param {String} id id of the option
 * @param {Array} options Array of options
 *
 * @return {Object} option Object.
 */
function getOption( id, options = [] )
{
    return options.find( opt => opt.id === id );
}


const TagInputwithDropdown = withDropdown( TagInput );

export default class TagInputStateful extends React.Component
{
    static propTypes =
    {
        /**
         *  CSS class name
         */
        className         : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap            : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Position of the dropdown relative to the text input
         */
        dropdownPosition  : PropTypes.oneOf( [ 'top', 'bottom', 'auto' ] ),
        /**
         *  Display as hover when required from another component
         */
        forceHover        : PropTypes.bool,
        /**
         *  specifies the height for the tag input (CSS length value)
         */
        height            : PropTypes.string,
        /**
         *  Display as error/invalid
         */
        hasError          : PropTypes.bool,
        /**
         *  HTML id attribute
         */
        id                : PropTypes.string,
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
         *  Allows container to be resize by the user
         */
        isResizable       : PropTypes.bool,
        /**
         *  HTML name attribute
         */
        name              : PropTypes.string,
        /**
         * onBlur callback function
         */
        onBlur            : PropTypes.func,
        /**
         *  Input change callback function
         */
        onChange          : PropTypes.func,
        /**
         *  Button click callback function: ( e ) => { ... }
         */
        onClickClose      : PropTypes.func,
        /*
         * On click callback function for dropdown option
         */
        onClickOption     : PropTypes.func,
        /**
         *  onFocus callback function
         */
        onFocus           : PropTypes.func,
        /**
         *  onKeyDown callback function
         */
        onKeyDown         : PropTypes.func,
        /**
         *  onKeyUp callback function
         */
        onKeyUp           : PropTypes.func,
        /**
         *  onKeyPress callback function
         */
        onKeyPress        : PropTypes.func,
        /**
         *  Input mouseOut callback function
         */
        onMouseOut        : PropTypes.func,
        /**
         *  On mouse out callback function for dropdown option
         */
        onMouseOutOption  : PropTypes.func,
        /**
         *  Input mouseOver callback function
         */
        onMouseOver       : PropTypes.func,
        /**
         *  On mouse over callback function for dropdown option
         */
        onMouseOverOption : PropTypes.func,
        /**
         *  Dropdown list options
         */
        options           : PropTypes.arrayOf( PropTypes.object ),
        /**
         *  Placeholder text
         */
        placeholder       : PropTypes.string,
        /**
         *  Array of strings to build Tag components
         */
        tags              : PropTypes.arrayOf( PropTypes.oneOfType( [
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
        className         : undefined,
        dropdownPosition  : 'auto',
        forceHover        : false,
        hasError          : false,
        height            : undefined,
        id                : undefined,
        inputRef          : undefined,
        isDisabled        : false,
        isReadOnly        : false,
        isResizable       : false,
        name              : undefined,
        onBlur            : undefined,
        onChange          : undefined,
        onClickClose      : undefined,
        onClickOption     : undefined,
        onFocus           : undefined,
        onKeyDown         : undefined,
        onKeyPress        : undefined,
        onKeyUp           : undefined,
        onMouseOutOption  : undefined,
        onMouseOut        : undefined,
        onMouseOver       : undefined,
        onMouseOverOption : undefined,
        options           : undefined,
        placeholder       : undefined,
        tags              : undefined,
        value             : '',
    };

    constructor( props )
    {
        super( props );

        const dropdownPosition = props.dropdownPosition !== 'auto' ?
            props.dropdownPosition : 'bottom';

        this.state = {
            activeOption    : undefined,
            dropdownPosition,
            filteredOptions : undefined,
            isOpen          : false,
            options         : props.options,
            selection       : undefined,
            tags            : props.tags,
            value           : props.value,
        };

        this.inputRef = React.createRef();

        this.handleBlur            = this.handleBlur.bind( this );
        this.handleChange          = this.handleChange.bind( this );
        this.handleClickClose      = this.handleClickClose.bind( this );
        this.handleClickOption     = this.handleClickOption.bind( this );
        this.handleFocus           = this.handleFocus.bind( this );
        this.handleKeyDown         = this.handleKeyDown.bind( this );
        this.handleMouseOutOption  = this.handleMouseOutOption.bind( this );
        this.handleMouseOverOption = this.handleMouseOverOption.bind( this );
        this.scrollBoxRef          = this.setScrollBoxRef( this );
        this.wrapperRef            = this.setWrapperRef.bind( this );
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

    static getDerivedStateFromProps( props, state )
    {
        const { selectedOption } = props;
        let optionId = selectedOption || state.selection;
        let flatOptions;

        if ( props.options !== state.options )
        {
            flatOptions = props.options.flatMap( o => o.options || o );
        }

        if ( optionId )
        {
            optionId = getOption( optionId, flatOptions )
                ? getOption( optionId, flatOptions ).id : undefined;
        }

        return {
            filteredOptions : state.filteredOptions || props.options,
            id              : props.id || state.id || generateId( 'Select' ),
            isOpen          : state.isOpen,
            options         : props.options,
            value           : state.value,
            selection       : optionId,
        };
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
        const callback = this.props.onChange;

        if ( callback )
        {
            callback( e );
        }

        const searchValue = ( e.target.value || '' ).toLowerCase();

        const filteredOptions = this.props.options.filter( ( { text } ) =>
            !searchValue || text.toLowerCase().indexOf( searchValue ) > -1 );

        const activeOption = ( searchValue && filteredOptions.length ) ?
            filteredOptions[ 0 ].id : undefined;

        this.setState( {
            activeOption,
            filteredOptions,
            value : e.target.value,
        } );
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

        this.setState( prevState =>
        {
            const selectedOption = getOption( id, prevState.options );
            return {
                activeOption : selectedOption.id,
                selection    : selectedOption.id,
                value        : undefined,
                tags         : newTags,
            };
        } );
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
        const { activeOption, tags, value } = this.state;
        const { key } = e;
        const callback = this.props.onKeyDown;

        if ( callback )
        {
            callback( e );
        }

        if ( key === 'Backspace' && value === '' )
        {
            const newTags = tags.slice( 0, -1 );

            this.setState( { tags: newTags } );
        }

        if ( key === 'Enter' )
        {
            let newTags;

            if ( activeOption )
            {
                const option =
                    this.props.options.find( opt => opt.id === activeOption );

                newTags = tags.concat( option.text );
                this.setState( {
                    activeOption : undefined,
                    tags         : newTags,
                    value        : '',
                } );
            }

            if ( value !== '' && !activeOption )
            {
                newTags = tags.concat( value );
                this.setState( { tags: newTags, value: '' } );
            }
        }

        if ( key === 'ArrowUp' || key === 'ArrowDown' )
        {
            e.preventDefault();

            this.setState( prevState =>
            {
                const options = prevState.filteredOptions ||
                prevState.flatOptions;

                if ( prevState.isOpen && options.length )
                {
                    const minIndex = 0;
                    const maxIndex = options.length - 1;

                    let activeIndex = getIndex(
                        prevState.activeOption || prevState.selection,
                        options,
                    );

                    activeIndex = key === 'ArrowUp' ?
                        Math.max( activeIndex - 1, minIndex ) :
                        Math.min( activeIndex + 1, maxIndex );

                    return {
                        activeOption : options[ activeIndex ].id,
                    };
                }

                return { isOpen: true };
            } );
        }

        if ( key === 'Escape' )
        {
            this.setState( {
                activeOption    : undefined,
                filteredOptions : undefined,
                isOpen          : false,
                value           : '',
            } );
        }
    }

    handleMouseOutOption( e )
    {
        const callback = this.props.onMouseOutOption;

        if ( callback )
        {
            callback( e );
        }

        this.setState( { activeOption: undefined } );
    }

    handleMouseOverOption( e, id )
    {
        const callback = this.props.onMouseOverOption;

        if ( callback )
        {
            callback( e );
        }

        this.setState( prevState =>
        {
            const activeOption = getOption(
                id,
                prevState.filteredOptions,
            ).id;

            return { activeOption };
        } );
    }

    render()
    {
        const { props }  = this;
        const {
            activeOption,
            isOpen,
            tags,
            value,
        } = this.state;

        const filteredOptions = this.state.filteredOptions.filter( item =>
            !tags.includes( item.text ) );


        const dropdownContent = !!filteredOptions.length && (
            <ScrollBox
                onScroll     = { props.onScroll }
                scroll       = "vertical"
                scrollBoxRef = { this.scrollBoxRef }>
                <ListBox
                    activeOption      = { activeOption }
                    id                = { addPrefix( 'listbox', props.id ) }
                    isFocusable       = { false }
                    onClickOption     = { this.handleClickOption }
                    onMouseOutOption  = { this.handleMouseOutOption }
                    onMouseOverOption = { this.handleMouseOverOption }
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
                inputRef     = { this.inputRef }
                onBlur       = { this.handleBlur }
                onChange     = { this.handleChange }
                onClickClose = { this.handleClickClose }
                onFocus      = { this.handleFocus }
                onKeyDown    = { this.handleKeyDown }
                tags         = { this.state.tags }
                value        = { value }
                wrapperRef   = { this.wrapperRef } />
        );
    }
}
