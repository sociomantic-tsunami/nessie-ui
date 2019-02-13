/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, {
    useImperativeHandle,
    useRef,
    forwardRef,
} from 'react';
import PropTypes                             from 'prop-types';

import { attachEvents, mapAria, generateId } from '../utils';
import { useTheme }                          from '../Theming';

const componentName = 'TextInput';

const TextInput = forwardRef( ( props, ref ) =>
{
    const inputRef = useRef();
    const cssMap = useTheme( componentName, props );

    useImperativeHandle( ref, () => ( {
        focus : () => inputRef.current.focus(),
    } ) );

    const {
        aria,
        autoCapitalize,
        autoComplete,
        autoCorrect,
        id = generateId( componentName ),
        isDisabled,
        isReadOnly,
        placeholder,
        spellCheck,
        value,
    } = props;

    return (
        <input
            { ...mapAria( aria ) }
            { ...attachEvents( props ) }
            autoCapitalize = { autoCapitalize }
            autoComplete   = { autoComplete }
            autoCorrect    = { autoCorrect }
            className      = { cssMap.main }
            disabled       = { isDisabled }
            id             = { id }
            placeholder    = { placeholder }
            readOnly       = { isReadOnly }
            ref            = { inputRef }
            spellCheck     = { spellCheck }
            value          = { value } />
    );
} );

TextInput.propTypes =
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
    autoComplete : PropTypes.oneOf( [ 'on', 'off' ] ),
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
     *  Display as error/invalid
     */
    hasError     : PropTypes.bool,
    /**
     *  HTML id attribute
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
     *  HTML attribute controlling input spell check
     */
    spellCheck   : PropTypes.bool,
    /**
     *  Input text alignment
     */
    textAlign    : PropTypes.oneOf( [ 'left', 'right' ] ),
    /**
     *  Input string value
     */
    value        : PropTypes.string,
};

TextInput.defaultProps =
{
    aria           : undefined,
    autoCapitalize : undefined,
    autoComplete   : undefined,
    autoCorrect    : undefined,
    className      : undefined,
    cssMap         : undefined,
    hasError       : false,
    id             : undefined,
    isDisabled     : false,
    isReadOnly     : false,
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
    spellCheck     : undefined,
    textAlign      : 'left',
    value          : '',
};

TextInput.displayName = componentName;

export default TextInput;
