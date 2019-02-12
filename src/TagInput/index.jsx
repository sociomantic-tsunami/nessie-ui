/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, {
    Children,
    useState,
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
} from 'react';
import PropTypes           from 'prop-types';
import { escapeRegExp }    from 'lodash';

import {
    ListBox,
    ScrollBox,
} from '../index';
import Popup               from '../Popup';
import PopperWrapper       from '../PopperWrapper';
import {
    attachEvents,
    callMultiple,
    generateId,
}  from '../utils';
import { buildTagsFromValues } from './utils';
import { useTheme }            from '../Theming';
import { addPrefix }           from '../ComboBox/utils';


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

const componentName = 'TagInput';

const TagInput = forwardRef( ( props, ref ) =>
{
    const inputRef = useRef();
    const outerRef = useRef();

    const cssMap = useTheme( component, props );
    const {
        children,
        container,
        hasError,
        isDisabled,
        isReadOnly,
        placeholder,
    } = props;


    const [ activeOption, setActiveOption ] = useState( undefined );
    const [ filteredOptions, setFilteredOptions ] = useState( undefined );
    const [ inputValue, setInputValue ] = useState( '' );
    const [ isOpen, setIsOpen ] = useState( false );
    const [ id, setId ] = useState( undefined );
    const [ value, setValue ] = useState( Array.isArray( props.defaultValue ) ?
        props.defaultValue : [] );

    useEffect(  ( state ) =>
    {
        const options =
            normalizeOptions( props.suggestions ) || state.options || [];

        return {
            filteredOptions : state.filteredOptions || options,
            id              : props.id || state.id || generateId( 'TagInput' ),
            options,
            value           : ( Array.isArray( props.value ) && props.value ) ||
                  state.value,
        };
    } );
    useImperativeHandle( ref, () => ( {
        focus : () =>
        {
            inputRef.current.focus();
        },
    } ) );

    const enterNewTag = () =>
    {
        setState( ( {
            activeOption,
            filteredOptions,
            inputValue,
            value,
        } ) =>
        {
            let newTag;

            if ( !value.find( tag => tag === inputValue ) )
            {
                if ( activeOption )
                {
                    const option =
                        getOption( activeOption, filteredOptions );

                    newTag = value.indexOf( activeOption ) !== -1 ?
                        inputValue : option.text;
                }
                else if ( inputValue )
                {
                    newTag = inputValue;
                }
            }

            let newTags = value;
            if ( newTag )
            {
                newTags = [ ...value, newTag ];

                const { onChange } = props;
                if ( typeof onChange === 'function' )
                {
                    onChange( { value: newTags } );
                }
            }

            return {
                activeOption    : undefined,
                filteredOptions : filterOptions( newTags ),
                inputValue      : '',
                value           : newTags,
            };
        } );
    };

    const filterOptions = ( tags ) =>
        state.options.filter( option =>
            !tags.includes( option.text ) );

    const handleBlur = () =>
    {
        setState( { isOpen: false } );
        enterNewTag();
    };

    const handleChangeInput = ( e ) =>
    {
        const { value } = e.target;

        setState( ( { options } ) =>
        {
            const filteredOptions = options.filter( ( { text } ) =>
                text.match( new RegExp( escapeRegExp( value ), 'i' ) ) );

            const activeOption = ( value && filteredOptions.length ) ?
                filteredOptions[ 0 ].id : undefined;

            return {
                activeOption,
                filteredOptions,
                inputValue : value,
            };
        } );
    };

    const handleClickClose = ( { id } ) =>
    {
        setState( ( { value } ) =>
        {
            const newTags = value.filter( tag => tag !== id );

            const { onChange } = props;
            if ( typeof onChange === 'function' )
            {
                onChange( { value: newTags } );
            }

            return {
                value           : newTags,
                filteredOptions : filterOptions( newTags ),
            };
        } );
    };

    const handleClickOption = ( { id } ) =>
    {
        setState( ( { filteredOptions, value } ) =>
        {
            const option = getOption( id, filteredOptions );
            const newTags = [ ...value, option.text ];

            const { onChange } = props;
            if ( typeof onChange === 'function' )
            {
                onChange( { value: newTags } );
            }

            return {
                activeOption    : undefined,
                filteredOptions : filterOptions( newTags ),
                inputValue      : '',
                value           : newTags,
            };
        } );
    };

    const handleFocus = () =>
    {
        setState( { isOpen: true } );
    };

    const handleKeyDown = ( e ) =>
    {
        const { key } = e;

        if ( key === 'Backspace' )
        {
            setState( ( { inputValue, value } ) =>
            {
                let newTags = value;
                if ( !inputValue )
                {
                    newTags = value.slice( 0, -1 );

                    const { onChange } = props;
                    if ( typeof onChange === 'function' )
                    {
                        onChange( { value: newTags } );
                    }
                }

                return {
                    value           : newTags,
                    filteredOptions : filterOptions( newTags ),
                };
            } );
        }
        else if ( key === 'Enter' )
        {
            enterNewTag();
        }
        else if ( key === 'ArrowUp' || key === 'ArrowDown' )
        {
            e.preventDefault();

            setState( ( { activeOption, isOpen } ) =>
            {
                const { filteredOptions } = state;

                if ( isOpen && filteredOptions.length )
                {
                    const minIndex = 0;
                    const maxIndex = filteredOptions.length - 1;

                    let activeIndex = getIndex( activeOption, filteredOptions );

                    activeIndex = key === 'ArrowUp' ?
                        Math.max( activeIndex - 1, minIndex ) :
                        Math.min( activeIndex + 1, maxIndex );

                    return {
                        activeOption : filteredOptions[ activeIndex ].id,
                    };
                }

                return { isOpen: true };
            } );
        }
    };

    const handleMouseOutOption = () =>
    {
        setState( { activeOption: undefined } );
    };

    const handleMouseOverOption = ( { id } ) =>
    {
        setState( { activeOption: id } );
    };

    const listBoxOptions = filteredOptions.reduce( ( result, opt ) =>
    {
        if ( !value.find( tag => tag === opt.id  ) )
        {
            result.push( opt );
        }
        return result;
    }, [] );

    const dropdownContent = listBoxOptions.length > 0 && (
        <ScrollBox height = "50vh" scroll = "vertical">
            <ListBox
                activeOption      = { activeOption }
                id                = { addPrefix( 'listbox', id ) }
                isFocusable       = { false }
                onClickOption     = { handleClickOption }
                onMouseOutOption  = { handleMouseOutOption }
                onMouseOverOption = { handleMouseOverOption }
                options           = { listBoxOptions } />
        </ScrollBox>
    );

    let items = children ?
        Children.toArray( children ) : buildTagsFromValues( value );

    items = items.map( tag => (
        React.cloneElement( tag, {
            ...tag.props,
            isDisabled : isDisabled || tag.props.isDisabled,
            isReadOnly : isReadOnly || tag.props.isReadOnly,
            onClick    : handleClickClose,
        } )
    ) );

    const popperChildren = (
        <label
            { ...attachEvents( props ) }
            className = { cssMap.main }
            htmlFor   = { id }
            ref       = { outerRef }>
            { items }
            <input
                className   = { cssMap.input }
                disabled    = { isDisabled }
                id          = { id }
                onBlur      = { callMultiple(
                    handleBlur,
                    props.onBlur,
                ) } // temporary fix
                onChange    = { handleChangeInput }
                onFocus     = { callMultiple(
                    handleFocus,
                    props.onFocus,
                ) } // temporary fix
                onKeyDown   = { callMultiple(
                    handleKeyDown,
                    props.onKeyDown,
                ) } // temporary fix
                placeholder = { placeholder }
                readOnly    = { isReadOnly }
                ref         = { inputRef }
                type        = "text"
                value       = { inputValue } />
        </label>
    );

    const popperPopup = (
        <Popup
            hasError = { hasError }>
            { dropdownContent }
        </Popup>
    );

    return (
        <PopperWrapper
            container      = { container || 'nessie-overlay' }
            isVisible      = { listBoxOptions.length > 0 && isOpen }
            matchRefWidth
            popper         = { popperPopup }
            popperOffset   = "S"
            popperPosition = "bottom">
            { popperChildren }
        </PopperWrapper>
    );
} );

TagInput.propTypes =
{
    /**
     * Node containing Tag components ( overrides value prop )
     */
    children     : PropTypes.node,
    /**
     *  CSS class name
     */
    className    : PropTypes.string,
    /**
     *  id of the DOM element used as container for popup listbox
     */
    container    : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap       : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Initial value (when component is uncontrolled)
     */
    defaultValue : PropTypes.arrayOf( PropTypes.string ),
    /**
     *  Display as error/invalid
     */
    hasError     : PropTypes.bool,
    /**
     *  Component id
     */
    id           : PropTypes.string,
    /**
     *  Display as disabled
     */
    isDisabled   : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly   : PropTypes.bool,
    /**
     *  Change callback function
     */
    onChange     : PropTypes.func,
    /**
     *  Placeholder text
     */
    placeholder  : PropTypes.string,
    /**
     *  Tag suggestions
     */
    suggestions  : PropTypes.arrayOf( PropTypes.string ),
    /**
     * Array of strings to build Tag components
     */
    value        : PropTypes.arrayOf( PropTypes.string ),
};

TagInput.defaultProps =
{
    children     : undefined,
    className    : undefined,
    container    : undefined,
    cssMap       : undefined,
    defaultValue : undefined,
    hasError     : false,
    id           : undefined,
    isDisabled   : false,
    isReadOnly   : false,
    onChange     : undefined,
    placeholder  : undefined,
    suggestions  : undefined,
    value        : undefined,
};

TagInput.displayName = componentName;

export default TagInput;
