import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';
import styles               from './inputContainer.css';
import Label                from '../Label';
import IconWithTooltip      from '../IconWithTooltip';


const InputContainer = ( {
    children,
    className,
    cssMap,
    errorMessage,
    errorMessageIsVisible,
    errorMessagePosition,
    hasError,
    id,
    isDisabled,
    label,
    labelPosition,
    onMouseOut,
    onMouseOver,
} ) => (
    <div
        className = { buildClassName( className, cssMap, {
            labelPosition : label && labelPosition,
        } ) }>
        { label &&
            <Label
                overflowIsHidden = { typeof label === 'string' }
                className        = { cssMap.label }
                htmlFor          = { id }
                role             = { labelPosition === 'top' ?
                    'header' : 'default' }
                onMouseOver      = { onMouseOver }
                onMouseOut       = { onMouseOut }>
                { label }
            </Label>
        }
        <IconWithTooltip
            className        = { cssMap.container }
            iconType         = "error"
            iconPosition     = "topRight"
            message          = { errorMessage }
            tooltipIsVisible = { errorMessageIsVisible }
            tooltipPosition  = { errorMessagePosition }
            iconIsVisible    = { !isDisabled &&
                                 !!errorMessage &&
                                 hasError }
            onMouseOver = { onMouseOver }
            onMouseOut  = { onMouseOut }>
            { children }
        </IconWithTooltip>
    </div>
);

InputContainer.propTypes = {
    /**
     *  Extra CSS class name
     */
    className             : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap                : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Error tooltip message to show
     */
    errorMessage          : PropTypes.string,
    /**
     *  Whether error tooltip is shown
     */
    errorMessageIsVisible : PropTypes.bool,
    /**
     *  Position of error tooltip relative to error icon
     */
    errorMessagePosition  : PropTypes.oneOf( [ 'top', 'topLeft' ] ),
    /**
     *  Whether error icon is shown
     */
    hasError              : PropTypes.bool,
    /**
     *  id of the associated input
     */
    id                    : PropTypes.string,
    /**
     *  Display as disabled
     */
    isDisabled            : PropTypes.bool,
    /**
     *  Input label text
     */
    label                 : PropTypes.node,
    /**
     *  Label position relative to the input
     */
    labelPosition         : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
    /**
     *  Mouse over callback function
     */
    onMouseOut            : PropTypes.func,
    /**
     *  Mouse out callback function
     */
    onMouseOver           : PropTypes.func,
};

InputContainer.defaultProps = {
    className             : undefined,
    cssMap                : styles,
    errorMessage          : undefined,
    errorMessageIsVisible : false,
    errorMessagePosition  : 'top',
    hasError              : false,
    id                    : undefined,
    isDisabled            : false,
    label                 : undefined,
    labelPosition         : 'top',
    onMouseOut            : undefined,
    onMouseOver           : undefined,
};

export default InputContainer;
