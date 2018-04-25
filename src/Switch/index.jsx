import React        from 'react';
import PropTypes    from 'prop-types';

import Component    from '../proto/Component';
import Css          from '../hoc/Css';

export default class Switch extends Component
{
    static propTypes =
    {
        /**
         * Display as hover when required from another component
         */
        forceHover  : PropTypes.bool,
        /**
         * HTML id attribute (overrides default)
         */
        id          : PropTypes.string,
        /**
         *  Display as checked/“on”
         */
        isChecked   : PropTypes.bool,
        /**
         *  Display as disabled
         */
        isDisabled  : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly  : PropTypes.bool,
        /**
         *  input name
         */
        name        : PropTypes.string,
        /**
         *  “Off”/unchecked label text
         */
        offLabel    : PropTypes.string,
        /**
         * onChange callback function: ( e ) => { ... }
         */
        onChange    : PropTypes.func,
        /**
         *  “On”/checked label text
         */
        onLabel     : PropTypes.string,
        /**
         *  onMouseOut callback function: ( e ) => { ... }
         */
        onMouseOut  : PropTypes.func,
        /**
         *  onMouseOver callback function: ( e ) => { ... }
         */
        onMouseOver : PropTypes.func,
        /**
         *  Show “on/off” label text
         */
        showLabel   : PropTypes.bool,
        /**
         * HTML value attribute
         */
        value       : PropTypes.string
    };

    static defaultProps =
    {
        onLabel    : 'On',
        offLabel   : 'Off',
        showLabel  : true,
        isChecked  : false,
        isDisabled : false,
        isReadOnly : false,
        forceHover : false,
        cssMap     : require( './switch.css' )
    };

    render()
    {
        const {
            className,
            cssMap,
            forceHover,
            isChecked,
            isDisabled,
            isReadOnly,
            name,
            offLabel,
            onChange,
            onLabel,
            onMouseOut,
            onMouseOver,
            showLabel,
            value } = this.props;

        const { id } = this.state;

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { {
                    disabled    : isDisabled,
                    fakeHovered : !isDisabled && forceHover
                } }>
                <div
                    className    = { className }
                    onMouseEnter = { onMouseOver }
                    onMouseLeave = { onMouseOut }>
                    <input
                        type         = "checkbox"
                        name         = { name }
                        id           = { id }
                        className    = { cssMap.input }
                        defaultValue = { value }
                        onChange     = { !isReadOnly && onChange }
                        checked      = { isChecked }
                        disabled     = { isDisabled || isReadOnly } />
                    <label
                        htmlFor      = { id }
                        className    = { cssMap.label }>
                        <div className = { cssMap.on }>
                            { showLabel && onLabel }
                        </div>
                        <div className = { cssMap.off }>
                            { showLabel && offLabel }
                        </div>
                    </label>
                </div>
            </Css>
        );
    }
}
