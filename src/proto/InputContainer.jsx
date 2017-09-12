import React, { Component } from 'react';

import Css                  from '../hoc/Css';
import Label                from '../Label';
import IconWithTooltip      from '../IconWithTooltip';

export default class InputContainer extends Component
{
    static defaultProps =
    {
        labelPosition         : 'top',
        isDisabled            : false,
        hasError              : false,
        errorMessageIsVisible : false,
        errorMessagePosition  : 'top',
        cssMap                : require( './inputContainer.css' ),
    };

    render()
    {
        const {
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
            onMouseOver
        } = this.props;

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { { labelPosition: label && labelPosition } }>
                <div className = { className }>
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
            </Css>
        );
    }
}
