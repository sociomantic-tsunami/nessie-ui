import React                        from 'react';
import PropTypes                    from 'prop-types';

import { ListBox, ScrollBox }       from '../index';
import { ListBoxOption }            from '../ListBox';
import TextInputWithIcon            from '../TextInputWithIcon';
import withDropdown                 from '../Dropdown/withDropdown';
import { generateId }               from '../utils';

const InputWithDropdown = withDropdown( TextInputWithIcon );

const addPrefix    = ( str, id ) => str.replace( `${id}-`, '' );
const removePrefix = ( str, id ) => `${id}-${str}`;

const ComboBox = ( {
    activeOption,
    forceHover,
    hasError,
    id,
    inputRef,
    inputValue,
    isDisabled,
    isOpen,
    isReadOnly,
    name,
    onBlur,
    onChangeInput,
    onClickInput,
    onClickOption,
    onFocus,
    onInput,
    onMouseOutOption,
    onMouseOverOption,
    onScroll,
    options,
    placeholder,
    selectedOption,
} ) =>
{
    const dropdownContent = (
        <ScrollBox onScroll = { onScroll }>
            <ListBox
                activeOption      = { activeOption }
                selectedOptions   = { selectedOption }
                isFocusable       = { false }
                onClickOption     = { ( e, optId ) =>
                    onClickOption( e, removePrefix( optId, id ) ) }
                onMouseOutOption  = { ( e, optId ) =>
                    onMouseOutOption( e, removePrefix( optId, id ) ) }
                onMouseOverOption = { ( e, optId ) =>
                    onMouseOverOption( e, removePrefix( optId, id ) ) }>
                { options.map( ( opt = {} ) => (
                    <ListBoxOption
                        { ...opt }
                        id = { opt.id ? addPrefix( opt.id, id ) : undefined } />
                ) ) }
            </ListBox>
        </ScrollBox>
    );

    return (
        <InputWithDropdown
            aria           = { {
                activeDescendant : addPrefix( activeOption, id ),
                expanded         : isOpen,
                role             : 'combobox',
            } }
            forceHover     = { forceHover }
            hasError       = { hasError }
            iconType       = "search"
            id             = { id }
            inputRef       = { inputRef }
            inputType      = "search"
            isDisabled     = { isDisabled }
            isReadOnly     = { isReadOnly }
            dropdownIsOpen = { isOpen }
            dropdownProps  = { { children: dropdownContent } }
            name           = { name }
            onBlur         = { onBlur }
            onChange       = { onChangeInput }
            onClick        = { onClickInput }
            onFocus        = { onFocus }
            onInput        = { onInput }
            placeholder    = { placeholder }
            value          = { inputValue } />
    );
};

ComboBox.propTypes =
{
    /**
     * Display as hover when required from another component
     */
    forceHover        : PropTypes.bool,
    /**
     *  Display as disabled
     */
    isDisabled        : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly        : PropTypes.bool,
    /**
     *  Display as error/invalid
     */
    hasError          : PropTypes.bool,
    /**
     *  HTML id attribute (overwrite default)
     */
    id                : PropTypes.string,
    /**
     *  Input change callback function
     */
    onChange          : PropTypes.func,
    /**
     *  input callback function
     */
    onInput           : PropTypes.func,
    /**
     * keyPress callback function
     */
    onKeyPress        : PropTypes.func,
    /**
     *  focus callback function
     */
    onFocus           : PropTypes.func,
    /**
     *  blur callback function
     */
    onBlur            : PropTypes.func,
    /**
     *  mouseOver callback function
     */
    onMouseOver       : PropTypes.func,
    /**
     *  mouseOut callback function
     */
    onMouseOut        : PropTypes.func,
    /**
     *  Placeholder text
     */
    placeholder       : PropTypes.string,

    /**
     * Callback that receives the native <input>: ( ref ) => { ... }
     */
    inputRef          : PropTypes.func,
    /*
     * Active option in dropdown list
     */
    activeOption      : PropTypes.string,
    /*
     * Input field value
     */
    inputValue        : PropTypes.string,
    /*
     * Dropdown is open
     */
    isOpen            : PropTypes.bool,
    /*
     * On click dropdown option
     */
    onClickOption     : PropTypes.func,
    /*
     * On mouse out dropdown option
     */
    onMouseOutOption  : PropTypes.func,
    /*
     * On mouse over dropdown option
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
    selectedOption    : PropTypes.oneOfType( [
        PropTypes.string,
        PropTypes.arrayOf( PropTypes.string )
    ] ),
};

ComboBox.defaultProps = {

    placeholder       : undefined,
    isDisabled        : false,
    isReadOnly        : false,
    hasError          : false,
    id                : generateId( 'ComboBox' ),
    onChange          : undefined,
    onInput           : undefined,
    onKeyPress        : undefined,
    onFocus           : undefined,
    onBlur            : undefined,
    onMouseOver       : undefined,
    onMouseOut        : undefined,
    forceHover        : false,
    inputRef          : undefined,
    activeOption      : undefined,
    inputValue        : undefined,
    isOpen            : false,
    onClickOption     : undefined,
    onMouseOutOption  : undefined,
    onMouseOverOption : undefined,
    onScroll          : undefined,
    options           : undefined,
    selectedOption    : undefined,
};

export default ComboBox;
