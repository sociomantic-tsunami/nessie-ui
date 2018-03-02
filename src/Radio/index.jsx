import React          from 'react';
import PropTypes      from 'prop-types';

import Checkable      from '../proto/Checkable';
import { generateId } from '../utils';
import styles         from './radio.css';

const Checkbox = props => <Checkable { ...props } type = "radio" />;

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
     *  OnChange callback function: ( e ) => { ... }
     */
    onChange         : PropTypes.func,
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
    id               : generateId( 'Radio' ),
    inputRef         : undefined,
    isDefaultChecked : false,
    isDisabled       : false,
    isChecked        : undefined,
    isReadOnly       : false,
    label            : undefined,
    name             : undefined,
    onChange         : undefined,
    onMouseOut       : undefined,
    onMouseOver      : undefined,
    value            : undefined,
};

export default Checkbox;
