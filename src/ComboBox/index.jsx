import React                        from 'react';
import PropTypes                    from 'prop-types';

import { ListBox, ScrollBox }       from '../index';
import ListBoxOption                from '../ListBox/ListBoxOption';
import ListBoxOptionGroup           from '../ListBox/ListBoxOptionGroup';
import TextInputWithIcon            from '../TextInputWithIcon';
import withDropdown                 from '../Dropdown/withDropdown';
import { generateId }               from '../utils';

const InputWithDropdown = withDropdown( TextInputWithIcon );

const addPrefix    = ( str = '', prefix ) => `${prefix}-${str}`;
const removePrefix = ( str = '', prefix ) => str.replace( `${prefix}-`, '' );

const createHandler = ( func, comboId ) => func && (
    ( proxy, event, optId ) =>
        func( proxy, event, removePrefix( optId, comboId ) )
);

const buildListBoxOptions = ( options = [], prefix = '' ) =>
    options.map( ( option = {} ) =>
    {
        if ( option.header )
        {
            const { options: groupOptions, ...groupProps } = option;

            return (
                <ListBoxOptionGroup { ...groupProps }>
                    { buildListBoxOptions( groupOptions, prefix ) }
                </ListBoxOptionGroup>
            );
        }

        return (
            <ListBoxOption
                { ...option }
                id = { option.id && addPrefix( option.id, prefix ) } />
        );
    } );

const ComboBox = function ComboBox( {
    activeOption,
    forceHover,
    hasError,
    id = generateId( 'ComboBox' ),
    inputRef,
    inputValue,
    isDisabled,
    isOpen,
    inputIsReadOnly,
    name,
    onBlur,
    onChangeInput,
    onClickInput,
    onClickOption,
    onFocus,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    onMouseOut,
    onMouseOutOption,
    onMouseOver,
    onMouseOverOption,
    onScroll,
    options,
    placeholder,
    selectedOption,
} )
{
    const dropdownContent = (
        <ScrollBox
            height   = "50vh"
            onScroll = { onScroll }>
            <ListBox
                activeOption      = { addPrefix( activeOption, id ) }
                id                = { addPrefix( 'listbox', id ) }
                isFocusable       = { false }
                onClickOption     = { createHandler( onClickOption, id ) }
                onMouseOutOption  = { createHandler( onMouseOutOption, id ) }
                onMouseOverOption = { createHandler( onMouseOverOption, id ) }
                selectedOptions   = {
                    selectedOption && addPrefix( selectedOption, id ) }>
                { buildListBoxOptions( options, id ) }
            </ListBox>
        </ScrollBox>
    );

    return (
        <InputWithDropdown
            aria           = { {
                activeDescendant :
                    activeOption && addPrefix( activeOption, id ),
                expanded : isOpen,
                hasPopup : 'listbox',
                owns     : addPrefix( 'listbox', id ),
                role     : 'combobox',
            } }
            forceHover     = { forceHover || isOpen }
            hasError       = { hasError }
            iconType       = "search"
            id             = { id }
            inputRef       = { inputRef }
            inputType      = "search"
            isDisabled     = { isDisabled }
            isReadOnly     = { inputIsReadOnly }
            dropdownIsOpen = { isOpen }
            dropdownProps  = { { children: dropdownContent, hasError } }
            name           = { name }
            onBlur         = { onBlur }
            onChange       = { onChangeInput }
            onClick        = { onClickInput }
            onFocus        = { onFocus }
            onKeyDown      = { onKeyDown }
            onKeyPress     = { onKeyPress }
            onKeyUp        = { onKeyUp }
            onMouseOut     = { onMouseOut }
            onMouseOver    = { onMouseOver }
            placeholder    = { placeholder }
            value          = { inputValue } />
    );
};

ComboBox.propTypes =
{
    /*
     * Active option in dropdown list
     */
    activeOption      : PropTypes.string,
    /**
     * Display as hover when required from another component
     */
    forceHover        : PropTypes.bool,
    /**
     *  Display as error/invalid
     */
    hasError          : PropTypes.bool,
    /**
     *  Display as disabled
     */
    isDisabled        : PropTypes.bool,
    /**
     *  HTML id attribute (overwrite default)
     */
    id                : PropTypes.string,
    /**
     *  Display as read-only
     */
    inputIsReadOnly   : PropTypes.bool,
    /**
     * Callback that receives the native <input>: ( ref ) => { ... }
     */
    inputRef          : PropTypes.func,
    /*
     * Input field value
     */
    inputValue        : PropTypes.string,
    /*
     * Dropdown is open
     */
    isOpen            : PropTypes.bool,
    /**
     *  HTML name attribute
     */
    name              : PropTypes.string,
    /**
     *  Input change callback function
     */
    onChangeInput     : PropTypes.func,
    /**
     * key down callback function
     */
    onKeyDown         : PropTypes.func,
    /**
     * key press callback function
     */
    onKeyPress        : PropTypes.func,
    /**
     * key up callback function
     */
    onKeyUp           : PropTypes.func,
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
    /*
     * On click callback funciton for input
     */
    onClickInput      : PropTypes.func,
    /*
     * On click callback function for doropdown option
     */
    onClickOption     : PropTypes.func,
    /*
     * On mouse out callback function for dropdown option
     */
    onMouseOutOption  : PropTypes.func,
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
    selectedOption    : PropTypes.string,
};

ComboBox.defaultProps = {
    placeholder       : undefined,
    isDisabled        : false,
    inputIsReadOnly   : false,
    hasError          : false,
    id                : undefined,
    name              : undefined,
    onChangeInput     : undefined,
    onBlur            : undefined,
    onClickInput      : undefined,
    onKeyDown         : undefined,
    onKeyPress        : undefined,
    onKeyUp           : undefined,
    onFocus           : undefined,
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
