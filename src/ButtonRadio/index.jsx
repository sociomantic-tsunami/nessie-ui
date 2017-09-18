import React        from 'react';
import PropTypes    from 'prop-types';

import Component    from '../proto/Component';
import Radio        from '../Radio';
import IconButton   from '../IconButton';

export default class ButtonRadio extends Component
{
    static propTypes =
    {
        /**
        *  Label text
        */
        label      : PropTypes.string,
        /**
        *  Button role/style
        */
        buttonrole : PropTypes.oneOf( [
            'default',
            'secondary',
            'tertiary'
        ] ),
        /*
         *  Icon position relative to Button text
         */
        iconPosition : PropTypes.oneOf( [
            'left',
            'right'
        ] ),
        /*
         *  Icon theme
         */
        iconTheme : PropTypes.oneOf( [
            'control',
            'button',
            'light',
            'dark',
            'navigation'
        ] ),
        /**
        *  Icon to show
        */
        iconType : PropTypes.oneOf( [
            'add',
            'alert',
            'approved',
            'calendar',
            'close',
            'declined',
            'delete',
            'down',
            'download',
            'duplicate',
            'edit',
            'ended',
            'error',
            'info',
            'inspect',
            'left',
            'link',
            'pending',
            'preview',
            'reset',
            'right',
            'search',
            'up',
            'upload',
            'validation',
            'none'
        ] ),
        /**
        *  Custom icon to show (CSS class; overrides type)
        */
        customIcon : PropTypes.string,
        /**
        *  Show the label text (only applies if an icon is specified)
        */
        showLabel  : PropTypes.bool,
        /**
        *  Display as checked
        */
        isChecked  : PropTypes.bool,
        /**
        *  Display as disabled/read-only
        */
        isDisabled : PropTypes.bool,
        /**
        *  HTML value attribute
        */
        value      : PropTypes.string,
        /**
        *  HTML id attribute (override default)
        */
        id         : PropTypes.string,
        /**
        *  Radio group name/id
        */
        name       : PropTypes.string,
        /**
         *  OnChange callback function: ( e ) => { ... }
         */
        onChange   : PropTypes.func
    };

    static defaultProps =
    {
        buttonrole   : 'default',
        isChecked    : false,
        isDisabled   : false,
        iconType     : 'none',
        iconPosition : 'left',
        iconTheme    : 'button',
        showLabel    : true,
        cssMap       : require( './buttonRadio.css' )
    };

    render()
   {
        const {
            buttonrole,
            children,
            cssMap,
            customIcon,
            iconTheme,
            iconPosition,
            iconType,
            isChecked,
            isDisabled,
            label,
            name,
            onChange,
            showLabel,
            value
        } = this.props;

        const { id } = this.state;

        return (
            <Radio
                cssMap     = { cssMap }
                isChecked  = { isChecked }
                isDisabled = { isDisabled }
                value      = { value }
                id         = { id }
                onChange   = { onChange }
                name       = { name }>
                <IconButton
                    element      = "div"
                    role         = { buttonrole }
                    isDisabled   = { isChecked || isDisabled }
                    iconType     = { iconType }
                    customIcon   = { customIcon }
                    iconPosition = { iconPosition }
                    iconTheme    = { iconTheme }
                    showLabel    = { showLabel }>
                    { children || label }
                </IconButton>
            </Radio>
        );
    }
}
