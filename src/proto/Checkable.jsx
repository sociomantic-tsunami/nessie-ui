import React     from 'react';

import Css       from '../hoc/Css';
import Text      from '../Text';
import Component from './Component';


export default class Checkable extends Component
{
    render()
    {
        const {
            children,
            className,
            cssMap,
            forceHover,
            hasError,
            inputRef,
            isChecked,
            isDefaultChecked,
            isDisabled,
            isReadOnly,
            label,
            name,
            onChange,
            onMouseOut,
            onMouseOver,
            type,
            value
        } = this.props;

        const { id } = this.state;

        let labelNode;
        let labelText = label;

        if ( children )
        {
            if ( typeof children === 'string' )
            {
                labelText = children;
            }
            else
            {
                labelNode = children;
            }
        }

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { {
                    disabled    : isDisabled,
                    error       : !isDisabled && hasError,
                    fakeHovered : !isDisabled && !hasError && forceHover
                } }>
                <div className = { className }>
                    <input
                        ref            = { inputRef }
                        type           = { type }
                        name           = { name }
                        className      = { cssMap.input }
                        id             = { id }
                        value          = { value }
                        onChange       = { onChange }
                        checked        = { isChecked }
                        defaultChecked = { isDefaultChecked }
                        readOnly       = { isReadOnly }
                        disabled       = { isDisabled } />
                    <label
                        htmlFor     = { id }
                        onMouseOver = { onMouseOver }
                        onMouseOut  = { onMouseOut }
                        className   = { cssMap.label }>
                        { labelNode || ( labelText &&
                            <Text>{ labelText }</Text>
                        ) }
                    </label>
                </div>
            </Css>
        );
    }
}
