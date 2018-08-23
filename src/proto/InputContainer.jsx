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
        } ) }
        onMouseEnter = { onMouseOver }
        onMouseLeave = { onMouseOut }>
        { label &&
            <Label
                className        = { cssMap.label }
                htmlFor          = { id }
                overflowIsHidden = { typeof label === 'string' }
                role             = { labelPosition === 'top' ?
                    'header' : 'default' }>
                { label }
            </Label>
        }
        <IconWithTooltip
            className        = { cssMap.container }
            iconIsVisible    = { !isDisabled && !!errorMessage && hasError }
            iconPosition     = "topRight"
            iconType         = "error"
            message          = { errorMessage }
            noWarn
            tooltipIsVisible = { errorMessageIsVisible }
            tooltipPosition  = { errorMessagePosition }>
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
    errorMessage          : PropTypes.node,
    /**
     *  Whether error tooltip is shown
     */
    errorMessageIsVisible : PropTypes.bool,
    /**
     *  Position of error tooltip relative to error icon
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
