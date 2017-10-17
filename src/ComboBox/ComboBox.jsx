import React, { isReactElement }      from 'react';
import PropTypes                      from 'prop-types';

import Css                            from '../hoc/Css';
import styles                         from './comboBox.css';
import { ListBox, TextInputWithIcon } from '../index';


const generateId = name =>
    `${name}-${Math.floor( ( Math.random() * 9e15 ) + 1e15 )}`;

const mapAria = val =>
{
    if ( typeof val === 'boolean' )
    {
        return val ? 'true' : 'false';
    }

    return val;
};

const ComboBox = ( {
    activeOption,
    className,
    cssMap,
    hasAutocomplete,
    id,
    isOpen,
    isReadOnly,
    isRequired,
    onBlur,
    onClickInput,
    onClickList,
    onFocus,
    onInput,
    onKeyPress,
    options,
    placeholder,
    selectedOptions,
    value,
} ) => (
    <Css
        cssMap   = { cssMap }
        cssProps = { { open: options.length && isOpen } }>
        <div className = { className }>
            <TextInputWithIcon
                aria-autocomplete = { mapAria( hasAutocomplete ) }
                aria-expanded     = { mapAria( isOpen ) }
                aria-controls     = { `${id}-list` }
                className         = { cssMap.textField }
                iconType          = { isOpen ? 'up' : 'down' }
                id                = { `${id}-input` }
                isReadOnly        = { isReadOnly }
                isRequired        = { isRequired }
                onBlur            = { onBlur }
                onClick           = { onClickInput }
                onFocus           = { onFocus }
                onInput           = { onInput }
                onKeyPress        = { onKeyPress }
                placeholder       = { placeholder }
                role              = "combobox"
                value             = { value } />
            <ListBox
                activeOption    = { activeOption }
                className       = { cssMap.listBox }
                isFocusable     = { false }
                id              = { `${id}-list` }
                onClick         = { onClickList }
                options         = { options }
                selectedOptions = { selectedOptions } />
        </div>
    </Css>
);


ComboBox.propTypes = {
    activeOption    : PropTypes.string,
    className       : PropTypes.string,
    cssMap          : PropTypes.objectOf( PropTypes.string ),
    hasAutocomplete : PropTypes.bool,
    id              : PropTypes.string,
    isOpen          : PropTypes.bool,
    isReadOnly      : PropTypes.bool,
    isRequired      : PropTypes.bool,
    options         : PropTypes.arrayOf( PropTypes.object ),
    onBlur          : PropTypes.func,
    onClickInput    : PropTypes.func,
    onClickList     : PropTypes.func,
    onFocus         : PropTypes.func,
    onInput         : PropTypes.func,
    onKeyPress      : PropTypes.func,
    placeholder     : PropTypes.string,
    selectedOptions : PropTypes.arrayOf( PropTypes.string ),
    value           : PropTypes.string,
};

ComboBox.defaultProps = {
    activeOption    : null,
    className       : null,
    cssMap          : styles,
    hasAutocomplete : false,
    id              : generateId( 'ComboBox' ),
    isOpen          : false,
    isReadOnly      : false,
    isRequired      : false,
    options         : null,
    onBlur          : null,
    onClickInput    : null,
    onClickList     : null,
    onFocus         : null,
    onInput         : null,
    onKeyPress      : null,
    placeholder     : null,
    selectedOptions : null,
    value           : null,
};

export default ComboBox;
