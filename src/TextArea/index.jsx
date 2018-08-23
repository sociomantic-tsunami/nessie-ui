import React                          from 'react';
import PropTypes                      from 'prop-types';

import { generateId, buildClassName } from '../utils';
import InputField                     from '../InputField';
import InputContainer                 from '../proto/InputContainer';
import styles                         from './textArea.css';


const TextArea = ( {
    className,
    cssMap,
    id = generateId( 'TextArea' ),
    onMouseOut,
    onMouseOver,
    ...props
} ) => (
    <InputContainer
        { ...props }
        className   = { buildClassName( className, cssMap ) }
        id          = { id }
        onMouseOut  = { onMouseOut }
        onMouseOver = { onMouseOver }>
        <InputField { ...props } id = { id } element = "textarea" />
    </InputContainer>
);

TextArea.propTypes =
{
    /**
     * Extra CSS class name
     */
    className             : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap                : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Label text (string or JSX node)
     */
    label                 : PropTypes.node,
    /**
     *  Label position
     */
    labelPosition         : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
    /**
     *  Placeholder text
     */
    placeholder           : PropTypes.string,
    /**
     *  Number of text input rows
     */
    rows                  : PropTypes.number,
    /**
      * Sets the text area to be vertically resizable
      */
    isResizable           : PropTypes.bool,
    /**
     *  Alignment of the input text
     */
    textAlign             : PropTypes.oneOf( [ 'left', 'right' ] ),
    /**
     *  Display as disabled
     */
    isDisabled            : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly            : PropTypes.bool,
    /**
     *  Display as error/invalid
     */
    hasError              : PropTypes.bool,
    /**
     *  Error tooltip message text (string or JSX)
     */
    errorMessage          : PropTypes.node,
    /**
     *  Error Tooltip is displayed
     */
    errorMessageIsVisible : PropTypes.bool,
    /**
    *  Error message position relative to the icon
    */
    errorMessagePosition  : PropTypes.oneOf( [
        'top',
        'topLeft',
        'topRight',
        'bottom',
        'bottomLeft',
        'bottomRight',
        'left',
        'leftTop',
        'leftBottom',
        'right',
        'rightTop',
        'rightBottom',
    ] ),
    /**
     * Initial input string value
     */
    defaultValue          : PropTypes.string,
    /**
     * Input string value
     */
    value                 : PropTypes.string,
    /**
     * HTML id attribute (overwrite default)
     */
    id                    : PropTypes.string,
    /**
     *  HTML name attribute
     */
    name                  : PropTypes.string,
    /**
     *  Input change callback function
     */
    onChange              : PropTypes.func,
    /**
     *  Input click callback function
     */
    onClick               : PropTypes.func,
    /**
     *  Input focus callback function
     */
    onFocus               : PropTypes.func,
    /**
     *  Input blur callback function
     */
    onBlur                : PropTypes.func,
    /**
     *  Input mouseOver callback function
     */
    onMouseOver           : PropTypes.func,
    /**
     *  Input mouseOut callback function
     */
    onMouseOut            : PropTypes.func,
    /**
     * Display as hover when required from another component
     */
    forceHover            : PropTypes.bool,
    /**
     * Callback that receives the native <textarea>: ( ref ) => { ... }
     */
    inputRef              : PropTypes.func,
};

TextArea.defaultProps =
{
    className             : undefined,
    cssMap                : styles,
    defaultValue          : undefined,
    errorMessage          : undefined,
    errorMessageIsVisible : false,
    errorMessagePosition  : 'top',
    forceHover            : false,
    hasError              : false,
    id                    : undefined,
    inputRef              : undefined,
    isDisabled            : false,
    isReadOnly            : false,
    isResizable           : true,
    label                 : undefined,
    labelPosition         : 'top',
    name                  : undefined,
    onBlur                : undefined,
    onChange              : undefined,
    onClick               : undefined,
    onFocus               : undefined,
    onMouseOut            : undefined,
    onMouseOver           : undefined,
    placeholder           : undefined,
    rows                  : 3,
    textAlign             : 'left',
    value                 : undefined,
};

export default TextArea;
