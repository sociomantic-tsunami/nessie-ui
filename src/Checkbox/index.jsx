import React          from 'react';
import PropTypes      from 'prop-types';

import Checkable      from '../proto/Checkable';
import { generateId } from '../utils';
import styles         from './checkbox.css';

const Checkbox = ( { id = generateId( 'Checkbox' ), ...props } ) => (
    <Checkable { ...props } id = { id } type = "checkbox" />
);

Checkbox.propTypes =
{
    /**
     *  Label content (JSX node; overrides label prop)
     */
    children         : PropTypes.node,
    /**
     *  Extra CSS class name
     */
    className        : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap           : PropTypes.objectOf( PropTypes.string ),
    /**
     * Display as hover when required from another component
     */
    forceHover       : PropTypes.bool,
    /**
     *  Display as error/invalid
     */
    hasError         : PropTypes.bool,
    /**
     *  HTML id attribute (override default)
     */
    id               : PropTypes.string,
    /**
     * Callback that receives the native <input>: ( ref ) => { ... }
     */
    inputRef         : PropTypes.func,
    /**
     *  Display as checked (controlled input)
     */
    isChecked        : PropTypes.bool,
    /**
     *  Display as checked by default (uncontrolled input)
     */
    isDefaultChecked : PropTypes.bool,
    /**
     *  Display as disabled
     */
    isDisabled       : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly       : PropTypes.bool,
    /**
     *  Label content (string)
     */
    label            : PropTypes.string,
    /**
     *  Checkbox group name
     */
    name             : PropTypes.string,
    /**
     *  OnBlur callback function: ( e ) => { ... }
     */
    onBlur           : PropTypes.func,
    /**
     *  OnClick callback function: ( e ) => { ... }
     */
    onClick          : PropTypes.func,
    /**
     *  OnChange callback function: ( e ) => { ... }
     */
    onChange         : PropTypes.func,
    /**
     *  onFocus callback function: ( e ) => { ... }
     */
    onFocus          : PropTypes.func,
    /**
     *  onMouseOut callback function : ( e ) => { ... }
     */
    onMouseOut       : PropTypes.func,
    /**
     *  onMouseOver callback function : ( e ) => { ... }
     */
    onMouseOver      : PropTypes.func,
    /**
     *  HTML value attribute
     */
    value            : PropTypes.string,
};

Checkbox.defaultProps =
{
    children         : undefined,
    className        : undefined,
    cssMap           : styles,
    forceHover       : false,
    hasError         : false,
    id               : undefined,
    inputRef         : undefined,
    isChecked        : undefined,
    isDefaultChecked : undefined,
    isDisabled       : false,
    isReadOnly       : false,
    label            : undefined,
    name             : undefined,
    onBlur           : undefined,
    onChange         : undefined,
    onClick          : undefined,
    onFocus          : undefined,
    onMouseOut       : undefined,
    onMouseOver      : undefined,
    value            : undefined,
};

export default Checkbox;
