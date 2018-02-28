import React                from 'react';
import PropTypes            from 'prop-types';

import Checkable            from '../proto/Checkable';

const Radio = ( props ) =>
    <Checkable { ...props } type = "radio" />;

Radio.propTypes =
{
    /**
    *  Label text string
    */
    label            : PropTypes.string,
    /**
    *  Display as checked by default (uncontrolled input)
    */
    isDefaultChecked : PropTypes.bool,
    /**
    *  Display as checked (controlled input)
    */
    isChecked        : PropTypes.bool,
    /**
    *  Display as disabled
    */
    isDisabled       : PropTypes.bool,
    /**
    *  Display as read-only
    */
    isReadOnly       : PropTypes.bool,
    /**
    *  Display as error/invalid
    */
    hasError         : PropTypes.bool,
    /**
     * Display as hover when required from another component
     */
    forceHover       : PropTypes.bool,
    /**
    *  HTML value attribute
    */
    value            : PropTypes.string,
    /**
    *  HTML id attribute (override default)
    */
    id               : PropTypes.string,
    /**
    *  Radio group name
    */
    name             : PropTypes.string,
    /**
     *  OnChange callback function: ( e ) => { ... }
     */
    onChange         : PropTypes.func,
    /**
     *  onMouseOver callback function : ( e ) => { ... }
     */
    onMouseOver      : PropTypes.func,
    /**
     *  onMouseOut callback function : ( e ) => { ... }
     */
    onMouseOut       : PropTypes.func,
    /**
     * Callback that receives the native <input>: ( ref ) => { ... }
     */
    inputRef         : PropTypes.func,
};

Radio.defaultProps =
{
    isDefaultChecked : false,
    isChecked        : undefined,
    isDisabled       : false,
    hasError         : false,
    forceHover       : false,
    cssMap           : require( './radio.css' )
};

export default Radio;
