import React        from 'react';
import PropTypes    from 'prop-types';

import Component    from '../proto/Component';
import Css          from '../hoc/Css';

export default class Switch extends Component
{
    static propTypes =
    {
        /**
         *  “On”/checked label text
         */
        onLabel    : PropTypes.string,
        /**
         *  “Off”/unchecked label text
         */
        offLabel   : PropTypes.string,
        /**
         *  input name
         */
        name       : PropTypes.string,
        /**
         *  Show “on/off” label text
         */
        showLabel  : PropTypes.bool,
        /**
         *  Display as checked/“on”
         */
        isChecked  : PropTypes.bool,
        /**
         *  Display as disabled
         */
        isDisabled : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly : PropTypes.bool,
        /**
         * Display as hover when required from another component
         */
        forceHover : PropTypes.bool,
        /**
         * HTML value attribute
         */
        value      : PropTypes.string,
        /**
         * HTML id attribute (overrides default)
         */
        id         : PropTypes.string,
        /**
         * onChange callback function: ( e ) => { ... }
         */
        onChange   : PropTypes.func
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
            onChange,
            isChecked,
            isDisabled,
            isReadOnly,
            name,
            onLabel,
            offLabel,
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
                <div className = { className }>
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
                        htmlFor   = { id }
                        className = { cssMap.label }>
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
