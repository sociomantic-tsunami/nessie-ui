/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React          from 'react';
import PropTypes      from 'prop-types';

import { generateId } from '../utils';
import { InputField } from '../index';


const TextArea = ( {
    id = generateId( 'TextArea' ),
    ...props
} ) =>  <InputField { ...props } id = { id } element = "textarea" />;

TextArea.propTypes =
{
    /**
     *  ARIA properties
     */
    aria : PropTypes.objectOf( PropTypes.oneOfType( [
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
    ] ) ),
    /**
     *  HTML attribute controlling input auto capitalize
     */
    autoCapitalize : PropTypes.oneOf( [
        'on',
        'off',
        'none',
        'sentences',
        'words',
        'characters',
    ] ),
    /**
     *  HTML attribute controlling input auto complete
     */
    autoComplete : PropTypes.string,
    /**
     *  HTML attribute controlling input auto correct (Safari-specific)
     */
    autoCorrect  : PropTypes.oneOf( [ 'on', 'off' ] ),
    /**
     *  Extra CSS class name
     */
    className    : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap       : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Display as hover when required from another component
     */
    forceHover   : PropTypes.bool,
    /**
     *  Display as error/invalid
     */
    hasError     : PropTypes.bool,
    /**
     *  HTML id attribute
     */
    id           : PropTypes.string,
    /**
     *  Callback that receives the native <input>: ( ref ) => { ... }
     */
    inputRef     : PropTypes.func,
    /**
     *  Display as disabled
     */
    isDisabled   : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly   : PropTypes.bool,
    /**
     * Sets the input to be vertically resizable
     */
    isResizable  : PropTypes.bool,
    /**
     *  HTML name attribute
     */
    name         : PropTypes.string,
    /**
     *  Blur callback function
     */
    onBlur       : PropTypes.func,
    /**
     *  Input change callback function
     */
    onChange     : PropTypes.func,
    /**
     *  Input click callback function
     */
    onClick      : PropTypes.func,
    /**
     *  Focus callback function
     */
    onFocus      : PropTypes.func,
    /**
     *  Key down callback function
     */
    onKeyDown    : PropTypes.func,
    /**
     *  Key press callback function
     */
    onKeyPress   : PropTypes.func,
    /**
     *  Key up callback function
     */
    onKeyUp      : PropTypes.func,
    /**
     *  Mouse out callback function
     */
    onMouseOut   : PropTypes.func,
    /**
     *  Mouse over  callback function
     */
    onMouseOver  : PropTypes.func,
    /**
     *  Placeholder text
     */
    placeholder  : PropTypes.string,
    /**
     *  Number of rows
     */
    rows         : PropTypes.number,
    /**
     *  HTML attribute controlling input spell check
     */
    spellCheck   : PropTypes.bool,
    /**
     *  Input text alignment
     */
    textAlign    : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
    /**
     *  Input string value
     */
    value        : PropTypes.string,
};

TextArea.defaultProps =
{
    aria           : undefined,
    autoCapitalize : undefined,
    autoComplete   : undefined,
    autoCorrect    : undefined,
    className      : undefined,
    forceHover     : false,
    hasError       : false,
    id             : undefined,
    inputRef       : undefined,
    isDisabled     : false,
    isReadOnly     : false,
    isResizable    : true,
    name           : undefined,
    onBlur         : undefined,
    onChange       : undefined,
    onClick        : undefined,
    onFocus        : undefined,
    onKeyDown      : undefined,
    onKeyPress     : undefined,
    onKeyUp        : undefined,
    onMouseOut     : undefined,
    onMouseOver    : undefined,
    placeholder    : undefined,
    rows           : 3,
    spellCheck     : undefined,
    textAlign      : 'left',
    value          : '',
};

TextArea.displayName = 'TextArea';

export default TextArea;
