/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global document */

import React, { Component }         from 'react';
import PropTypes                    from 'prop-types';
import { castArray, escapeRegExp }  from 'lodash';

import {
    IconButton,
    ListBox,
    ScrollBox,
    Text,
} from '..';

import Popup            from '../Popup';
import PopperWrapper    from '../PopperWrapper';
import {
    attachEvents,
    callMultiple,
    generateId,
    mapAria,
} from '../utils';
import {
    addPrefix,
    prefixOptions,
    removePrefix,
} from './utils';
import { buildTagsFromValues }  from '../TagInput/utils';
import ThemeContext             from '../Theming/ThemeContext';
import { createCssMap }         from '../Theming';

/**
 * normalize array of options or value
 *
 * @param   {Array} options options to normalize
 *
 * @return  {Array} normalized options
 */
function normalizeOptions( options )
{
    if ( !Array.isArray( options ) ) return;

    return options.map( opt => ( typeof opt === 'object' ?
        opt : { id: opt, text: opt } ) );
}

/**
 * gets the index of the option by the passed id
 *
 * @param {String} id id of the option
 * @param {Array} options Array of options
 *
 * @return {Number} index of the option
 */
const getIndex = ( id, options = [] ) => (
    options.findIndex( opt => opt.id === id ) );


/**
 * gets the option by the passed id
 *
 * @param {String} id id of the option
 * @param {Array} options Array of options
 *
 * @return {Object} option Object.
 */
const getOption = ( id, options = [] ) => (
    options.find( opt => opt.id === id ) );


/**
 * gives correct format to the filtered options
 *
 * @param {Array} filteredOptionsIds options ids after search filter
 * @param {Array} originalOptions original options
 *
 * @return {Array} formattedOptions filtered and formatted options
 */
const optionsFormatted = ( filteredOptionsIds, originalOptions ) => (
    originalOptions.reduce( ( formattedOptions, option ) =>
    {
        if ( option.options )
        {
            const sectionOptions = optionsFormatted(
                filteredOptionsIds,
                option.options,
            );

            if ( sectionOptions.length )
            {
                const newOptions = { ...option, options: sectionOptions };
                formattedOptions.push( newOptions );
            }
        }
        else if ( filteredOptionsIds.includes( option.id ) )
        {
            formattedOptions.push( option );
        }
        return formattedOptions;
    }, [] ) );

const useSelection = ( defaultValue, value ) =>
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Extra CSS class name
         */
        className    : PropTypes.string,
        /**
         *  Default selected option id(s) (when uncontrolled)
         */
        defaultValue : PropTypes.oneOfType(
            PropTypes.string,
            PropTypes.arrayOf( PropTypes.string ),
        ),
        /**
         *  id of the DOM element used as container for popup listBox
         */
        container           : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap              : PropTypes.objectOf( PropTypes.string ),
        /**
         * Placeholder text to show when no dropdown list options
         */
        dropdownPlaceholder : PropTypes.string,
        /**
         *  Display as error/invalid
         */
        hasError            : PropTypes.bool,
        /**
         *  Component id
         */
        id                  : PropTypes.string,
        /**
         *  Placeholder text
         */
        inputPlaceholder    : PropTypes.string,
        /**
         *  Display as disabled
         */
        isDisabled          : PropTypes.bool,
        /**
         *  Enables multi-select behavior
         */
        isMultiselect       : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly          : PropTypes.bool,
        /**
          *  input searchable
          */
        isSearchable        : PropTypes.bool,
        /**
         *  Change callback: ( { value } ) => ...
         */
        onChange            : PropTypes.func,
        /**
         *  Input field change callback: ( { value } ) => ...
         */
        onChangeInput       : PropTypes.func,
        /*
         * Dropdown list options
         */
        options             : PropTypes.arrayOf( PropTypes.object ),
        /**
         *  Selected option id(s)
         */
        value               : PropTypes.oneOfType(
            PropTypes.string,
            PropTypes.arrayOf( PropTypes.string ),
        ),
    };

    static defaultProps =
    {
        className           : undefined,
        container           : undefined,
        cssMap              : undefined,
        defaultValue        : [],
        dropdownPlaceholder : 'No results to show',
        hasError            : false,
        id                  : undefined,
        inputPlaceholder    : undefined,
        isDisabled          : false,
        isMultiselect       : false,
        isReadOnly          : undefined,
        isSearchable        : false,
        onChange            : undefined,
        onChangeInput       : undefined,
        options             : undefined,
        value               : undefined,
    };

    constructor( { defaultValue, isMultiselect } )
    {
        super();

        this.state = {
            activeOption    : undefined,
            filteredOptions : undefined,
            flatOptions     : undefined,
            id              : undefined,
            isOpen          : undefined,
            options         : undefined,
            searchValue     : undefined,
            selection       : isMultiselect ?
                castArray( defaultValue ) : defaultValue,
        };

        this.inputRef     = React.createRef();
        this.scrollBoxRef = React.createRef();

        this.handleBlur            = this.handleBlur.bind( this );
        this.handleChangeInput     = this.handleChangeInput.bind( this );
        this.handleClick           = this.handleClick.bind( this );
        this.handleClickClose      = this.handleClickClose.bind( this );
        this.handleClickIcon       = this.handleClickIcon.bind( this );
        this.handleClickOption     = this.handleClickOption.bind( this );
        this.handleFocus           = this.handleFocus.bind( this );
        this.handleKeyDown         = this.handleKeyDown.bind( this );
        this.handleMouseOutOption  = this.handleMouseOutOption.bind( this );
        this.handleMouseOverOption = this.handleMouseOverOption.bind( this );
    }

    const setter = ( newValue ) =>
    {
        let { flatOptions } = state;

        const options = normalizeOptions( props.options ) ||
            state.options || [];

        if ( options && options !== state.options )
        {
            flatOptions = options.flatMap( o => o.options || o );
        }
    };

        let { selection } = state;
        if ( props.value )
        {
            selection = props.value;
        }

        if ( props.isMultiselect )
        {
            selection = castArray( selection );
        }

        const filteredOptions = state.searchValue && (
            flatOptions.filter( ( { text } ) => (
                text.match( new RegExp(
                    escapeRegExp( state.searchValue ),
                    'i',
                ) )
            ) )
        );

        const activeOption = ( state.searchValue && filteredOptions.length ) ?
            filteredOptions[ 0 ].id : state.activeOption;

        return {
            activeOption,
            flatOptions,
            filteredOptions,
            id : props.id || state.id || generateId( 'ComboBox' ),
            options,
            selection,
        };
    }

const ComboBox = props =>
{
    const [ activeOption, setActiveOption ] = useState( undefined );
    const [ filteredOptions, setFilteredOptions ] = useState( undefined );
    const [ isOpen, setIsOpen ] = useState( undefined );
    const [ searchValue, setSearchValue ] = useState( undefined );

    // const filteredOptions = searchValue && (
    //     flatOptions.filter( ( { text } ) => (
    //         text.match( new RegExp(
    //             escapeRegExp( searchValue ),
    //             'i',
    //         ) )
    //     ) )
    // );

    const inputRef = useRef( null );
    const scrollBoxRef = useRef( null );

    const {
        className,
        container,
        defaultValue,
        dropdownPlaceholder,
        hasError,
        id,
        inputPlaceholder,
        isDisabled,
        isMultiselect,
        isReadOnly,
        isSearchable,
        onChange,
        options,
        value,
    } = props;

    const [ optionSelected, setOptionSelected ] = useSelection(
        isMultiselect ? castArray( defaultValue ) : defaultValue,
        isMultiselect ? castArray( value ) : value,
    );

    const flatOptions = useMemo(
        () => ( options.flatMap( o => o.options || o ) ),
        [ options ],
    );

    const componentId = useMemo(
        () => ( id || generateId( 'ComoBox' ) ),
        [ id ],
    );

    useEffect( () =>
    {
        if ( scrollBoxRef.current && activeOption )
        {
            const activeEl =
                document.getElementById( addPrefix(
                    activeOption,
                    componentId,
                ) );

            if ( activeEl &&
                scrollBoxRef.current.scrollHeight >
                scrollBoxRef.current.offsetHeight )
            {
                const pos        = activeEl.offsetTop;
                const elHeight   = activeEl.offsetHeight;
                const contHeight = scrollBoxRef.current.offsetHeight;

                const min = scrollBoxRef.current.scrollTop;
                const max = min +
                  ( scrollBoxRef.current.offsetHeight - elHeight );

                if ( pos < min )
                {
                    scrollBoxRef.current.scrollTop = pos;
                }
                else if ( pos > max )
                {
                    scrollBoxRef.current.scrollTop =
                      pos - ( contHeight - elHeight );
                }
            }
        }
    } );

    const focus = useCallback( () =>
    {
        this.inputRef.current.focus();
    }

    filterOptions( tags )
    {
        return this.state.options.filter( option =>
            !tags.includes( option.text ) );
    }

    handleFocus()
    {
        this.focus();

        if ( this.props.isSearchable )
        {
            this.setState( { searchValue: '' } );
        }
    }

    handleChangeInput( e )
    {
        e.stopPropagation();
        const { value } = e.target;

        const { onChangeInput } = this.props;
        if ( typeof onChangeInput === 'function' )
        {
            onChangeInput( { value }, e );
        }

        const filteredOptionsToUse = flatOptions.filter( ( { text } ) =>
            !searchValueToUse || text.toLowerCase().indexOf(
                searchValueToUse,
            ) > -1 );

        const activeOptionToUse = ( searchValueToUse &&
            filteredOptionsToUse.length ) ?
            filteredOptionsToUse[ 0 ].id : undefined;

        setActiveOption( activeOptionToUse );
        setFilteredOptions( filteredOptionsToUse );
        setSearchValue( searchValueToUse );
    }, [ flatOptions ] );

    const handleClickIcon = useCallback( () =>
    {
        focus();
        setIsOpen( !isOpen );
    }, [ isOpen ] );

    const handleClickInput = () =>
    {
        setIsOpen( true );
    };

    const handleClickOption = useCallback( ( { id : optId } ) =>
    {
        const unprefixedId = removePrefix( optId, componentId );

        let newSelection = !isReadOnly ? getOption(
            unprefixedId,
            flatOptions,
        ).id : optionSelected;

        if ( isMultiselect )
        {
            const optId = removePrefix( prefixedId, id );
            const { isMultiselect, onChange } = this.props;

            let newSelection = optId;
            if ( isMultiselect )
            {
                newSelection = selection.includes( optId ) ?
                    selection.filter( item => item !== optId ) :
                    [ ...selection, optId ];
            }

        if ( !isReadOnly && typeof onChange === 'function' )
        {
            onChange( { id, newSelection } );
        }

        setActiveOption( newSelection );
        setFilteredOptions( undefined );
        setIsOpen( false );
        setSearchValue( undefined );
        setOptionSelected( newSelection );
    }, [ componentId, isReadOnly, flatOptions, optionSelected, onChange ] );

    handleClickClose( { id } )
    {
        this.setState( ( { selection } ) =>
        {
            const newTags = selection.filter( tag => tag !== id );

            const { onChange } = this.props;
            if ( typeof onChange === 'function' )
            {
                onChange( { value: newTags } );
            }

            return {
                selection       : newTags,
                filteredOptions : this.filterOptions( newTags ),
            };
        } );
    }

    handleKeyDown( e )
    {
        const { key } = e;

        if ( key === 'ArrowUp' || key === 'ArrowDown' )
        {
            e.preventDefault();

            const optionsToUse = filteredOptions || flatOptions;

            if ( isOpen && optionsToUse.length )
            {
                const minIndex = 0;
                const maxIndex = optionsToUse.length - 1;

                let activeIndex = getIndex(
                    activeOption || optionSelected,
                    optionsToUse,
                );

                activeIndex = key === 'ArrowUp' ?
                    Math.max( activeIndex - 1, minIndex ) :
                    Math.min( activeIndex + 1, maxIndex );

                setActiveOption( optionsToUse[ activeIndex ].id );
            }

            setIsOpen( true );
        }
        else if ( key === 'Escape' )
        {
            setActiveOption( undefined );
            setFilteredOptions( undefined );
            setIsOpen( false );
            setSearchValue( undefined );
        }
        else if ( key === 'Enter' )
        {
            if ( !isReadOnly )
            {
                let newSelection = !isReadOnly && activeOption ?
                    activeOption : optionSelected;

                if ( newSelection && isMultiselect )
                {
                    newSelection = optionSelected.includes( newSelection ) ?
                        optionSelected.filter( item => item !== newSelection ) :
                        [ ...optionSelected, newSelection ];
                }

                newSelection = newSelection || optionSelected;

                if ( typeof onChange === 'function' )
                {
                    onChange( { id, newSelection } );
                }

                setActiveOption( activeOption );
                setFilteredOptions( undefined );
                setIsOpen( !isOpen );
                setSearchValue( undefined );
                setOptionSelected( newSelection );
            }
        }
    }, [ filteredOptions, flatOptions, isOpen, activeOption, optionSelected,
        isReadOnly, onChange ] );

    const handleMouseOutOption = () =>
    {
        setActiveOption( undefined );
    };

    const handleMouseOverOption = useCallback( ( { id : optId } ) =>
    {
        const unprefixedId = removePrefix( optId, componentId );

        setActiveOption( getOption(
            unprefixedId,
            flatOptions,
        ).id );
    }, [ componentId, flatOptions ] );

    const handleBlur = () =>
    {
        const {
            container,
            cssMap = createCssMap( this.context.ComboBox, this.props ),
            dropdownPlaceholder,
            hasError,
            inputPlaceholder,
            isDisabled,
            isMultiselect,
            isReadOnly,
            isSearchable,
        } = this.props;

        const {
            activeOption,
            filteredOptions,
            flatOptions,
            id,
            isOpen,
            searchValue,
            options,
            selection,
        } = this.state;

        const selectedOption = getOption( selection, flatOptions );
        const selectedText = selectedOption ? selectedOption.text : '';

        let optionsToShow = options || [];

        if ( filteredOptions )
        {
            selectedText = optionSelected.length &&
                    `(${optionSelected.length} items selected)`;
        }
    }

    let optionsToShow = options || [];

        let tags;

        if ( isMultiselect )
        {
            tags = buildTagsFromValues( selection );
            tags = tags.map( tag => (
                React.cloneElement( tag, {
                    ...tag.props,
                    isDisabled : isDisabled || tag.props.isDisabled,
                    isReadOnly : isReadOnly || tag.props.isReadOnly,
                    onClick    : this.handleClickClose,
                } )
            ) );
        }

        const popperChildren = (
            <label
                { ...attachEvents( this.props ) }
                className = { cssMap.main }
                htmlFor   = { id }>
                { tags }
                <input
                    { ...mapAria( {
                        activeDescendant :
                            activeOption && addPrefix( activeOption, id ),
                        autocomplete : 'list',
                        expanded     : isOpen,
                        hasPopup     : 'listbox',
                        owns         : addPrefix( 'listbox', id ),
                        role         : 'combobox',
                    } ) }
                    autoCapitalize = "off"
                    autoComplete   = "off"
                    autoCorrect    = "off"
                    className      = { cssMap.input }
                    disabled       = { isDisabled }
                    hasError       = { hasError }
                    id             = { id }
                    onBlur         = { callMultiple(
                        this.handleBlur,
                        this.props.onBlur,
                    ) } // temporary fix
                    onChange       = { this.handleChangeInput }
                    onClick        = { callMultiple(
                        this.handleClick,
                        this.props.onClick,
                    ) } // temporary fix
                    onFocus        = { callMultiple(
                        this.handleFocus,
                        this.props.onFocus,
                    ) } // temporary fix
                    onKeyDown      = { callMultiple(
                        this.handleKeyDown,
                        this.props.onKeyDown,
                    ) } // temporary fix
                    placeholder    = { inputPlaceholder }
                    readOnly       = { !isSearchable || !isOpen }
                    ref            = { this.inputRef }
                    spellCheck     = { false }
                    value          = { ( isOpen && isSearchable ) ?
                        searchValue : selectedText } />
                <IconButton
                    className   = { cssMap.icon }
                    iconType    = { isOpen ? 'chevron-up' : 'chevron-down' }
                    isFocusable = { false }
                    onClick     = { this.handleClickIcon } />
            </label>
        );
    }

    let dropdownContent;

    if ( optionsToShow.length )
    {
        dropdownContent = (
            <ScrollBox
                height       = "50vh"
                scroll       = "vertical"
                scrollBoxRef = { scrollBoxRef }>
                <ListBox
                    activeOption      = { addPrefix(
                        activeOption,
                        componentId,
                    ) }
                    id                = { addPrefix( 'listbox', componentId ) }
                    isFocusable       = { false }
                    onClickOption     = { handleClickOption }
                    onMouseOutOption  = { handleMouseOutOption }
                    onMouseOverOption = { handleMouseOverOption }
                    options           = {
                        prefixOptions( optionsToShow, componentId )
                    }
                    selection = { addPrefix( optionSelected, componentId ) } />
            </ScrollBox>
        );
    }
    else
    {
        dropdownContent = (
            <Text
                noWrap
                overflowIsHidden
                role    = "subtle"
                variant = "RegularIt">
                { dropdownPlaceholder }
            </Text>
        );
    }

    const popperChildren = (
        <TextInputWithIcon
            aria = { {
                activeDescendant :
                    activeOption && addPrefix( activeOption, id ),
                autocomplete : 'list',
                expanded     : isOpen,
                hasPopup     : 'listbox',
                owns         : addPrefix( 'listbox', id ),
                role         : 'combobox',
            } }
            autoCapitalize = "off"
            autoComplete   = "off"
            autoCorrect    = "off"
            className      = { className }
            hasError       = { hasError }
            iconType       = { isOpen ? 'chevron-up' : 'chevron-down' }
            id             = { id }
            inputRef       = { inputRef }
            isDisabled     = { isDisabled }
            isReadOnly     = { !isSearchable || !isOpen }
            onBlur         = { callMultiple(
                handleBlur,
                props.onBlur,
            ) } // temporary fix
            onChangeInput  = { handleChangeInput }
            onClick        = { callMultiple(
                handleClickInput,
                props.onClick,
            ) } // temporary fix
            onClickIcon    = { handleClickIcon }
            onFocus        = { props.onFocus } // temporary fix
            onKeyDown      = { callMultiple(
                handleKeyDown,
                props.onKeyDown,
            ) } // temporary fix
            placeholder    = { inputPlaceholder }
            spellCheck     = { false }
            value          = { ( isOpen && isSearchable ) ?
                searchValue : selectedText
            } />
    );

    const popperPopup = (
        <Popup
            hasError = { hasError }
            padding  = { optionsToShow.length ? 'none' : 'S' }>
            { dropdownContent }
        </Popup>
    );

    return (
        <PopperWrapper
            container      = { container || 'nessie-overlay' }
            isVisible      = { isOpen }
            matchRefWidth
            popper         = { popperPopup }
            popperOffset   = "S"
            popperPosition = "bottom">
            { popperChildren }
        </PopperWrapper>
    );
};

ComboBox.propTypes =
{
    /**
     *  Extra CSS class name
     */
    className    : PropTypes.string,
    /**
     *  Default selected option id(s) (when uncontrolled)
     */
    defaultValue : PropTypes.oneOfType(
        PropTypes.string,
        PropTypes.arrayOf( PropTypes.string ),
    ),
    /**
     *  id of the DOM element used as container for popup listBox
     */
    container           : PropTypes.string,
    /**
     * Placeholder text to show when no dropdown list options
     */
    dropdownPlaceholder : PropTypes.string,
    /**
     *  Display as error/invalid
     */
    hasError            : PropTypes.bool,
    /**
     *  Component id
     */
    id                  : PropTypes.string,
    /**
     *  Placeholder text
     */
    inputPlaceholder    : PropTypes.string,
    /**
     *  Display as disabled
     */
    isDisabled          : PropTypes.bool,
    /**
     *  Enables multi-select behavior
     */
    isMultiselect       : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly          : PropTypes.bool,
    /**
      *  input searchable
      */
    isSearchable        : PropTypes.bool,
    /**
     *  Change callback: ( { value } ) => ...
     */
    onChange            : PropTypes.func,
    /**
     *  Input field change callback: ( { value } ) => ...
     */
    onChangeInput       : PropTypes.func,
    /*
     * Dropdown list options
     */
    options             : PropTypes.arrayOf( PropTypes.object ),
    /**
     *  Selected option id(s)
     */
    value               : PropTypes.oneOfType(
        PropTypes.string,
        PropTypes.arrayOf( PropTypes.string ),
    ),
};

ComboBox.defaultProps =
{
    className           : undefined,
    container           : undefined,
    defaultValue        : undefined,
    dropdownPlaceholder : 'No results to show',
    hasError            : false,
    id                  : undefined,
    inputPlaceholder    : undefined,
    isDisabled          : false,
    isMultiselect       : false,
    isReadOnly          : undefined,
    isSearchable        : false,
    onChange            : undefined,
    onChangeInput       : undefined,
    options             : undefined,
    value               : undefined,
};

ComboBox.displayName = 'ComboBox';

export default ComboBox;
