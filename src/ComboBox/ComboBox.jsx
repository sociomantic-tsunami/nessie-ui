import React                  from 'react';
import PropTypes              from 'prop-types';

import { ListBox, ScrollBox } from '../index';
import TextInputWithIcon      from '../TextInputWithIcon';
import withDropdown           from '../Dropdown/withDropdown';
import { generateId }         from '../utils';

const InputWithDropdown = withDropdown( TextInputWithIcon );

const SearchBox = ( {
    activeOption,
    id,
    inputValue,
    isOpen,
    onChangeInput,
    onClickInput,
    onClickOption,
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
                activeOption   = { activeOption }
                selectedOption = { selectedOption }
                isFocusable    = { false }
                onClickOption  = { onClickOption }
                onMouseOut     = { onMouseOutOption }
                onMouseOver    = { onMouseOverOption }
                options        = { options } />
        </ScrollBox>
    );

    return (
        <InputWithDropdown
            aria           = { { activeDescendant: `${id}` } }
            id             = { `${id}-input` }
            inputType      = "search"
            iconType       = "search"
            dropdownIsOpen = { isOpen }
            dropdownProps  = { { children: dropdownContent } }
            onChange       = { onChangeInput }
            onClick        = { onClickInput }
            onInput        = { onInput }
            placeholder    = { placeholder }
            value          = { inputValue } />
    );
};

SearchBox.propTypes =
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
     * Dropdown options as ListOption nodes (overrides “options” prop)
     */
    children          : PropTypes.node,
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

SearchBox.defaultProps = {

    placeholder       : undefined,
    isDisabled        : false,
    isReadOnly        : false,
    hasError          : false,
    id                : generateId( 'SearchBox' ),
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
    children          : undefined,
    inputValue        : undefined,
    isOpen            : false,
    onClickOption     : undefined,
    onMouseOutOption  : undefined,
    onMouseOverOption : undefined,
    onScroll          : undefined,
    options           : undefined,
    selectedOption    : undefined,
};

export default SearchBox;
