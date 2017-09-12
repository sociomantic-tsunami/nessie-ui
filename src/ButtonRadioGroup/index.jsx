import React            from 'react';
import PropTypes        from 'prop-types';

import Component        from '../proto/Component';
import CheckableGroup   from '../CheckableGroup';
import ButtonRadio      from '../ButtonRadio';

export default class ButtonRadioGroup extends Component
{
    static propTypes =
    {
        /**
        *  Group label text or JSX node
        */
        label  : PropTypes.node,
        /**
        *  Array of strings (to build the Checkboxes)
        */
        values : PropTypes.arrayOf(
                                        PropTypes.oneOfType( [
                                            PropTypes.string,
                                            PropTypes.shape( {
                                                value : PropTypes.string,
                                                label : PropTypes.string,
                                                icon  : PropTypes.string
                                            } )
                                        ] )
                                    ),
        /**
        *  The selected string (to build the ButtonRadios)
        */
        selectedValue         : PropTypes.string,
        /**
        *  How to lay out the ButtonRadios
        */
        layout                : PropTypes.oneOf( [ 'horizontal', 'vertical' ] ),
        /**
        *  Show the button labels (only applies if ButtonRadio has an icon)
        */
        showLabels            : PropTypes.bool,
        /**
        *  Display as disabled
        */
        isDisabled            : PropTypes.bool,
        /**
        *  Display as read-only
        */
        isReadOnly            : PropTypes.bool,
        /**
         *  Display as error/invalid
         */
        hasError              : PropTypes.bool,
        /**
         *  Tooltip message text (string or JSX)
         */
        errorMessage          : PropTypes.node,
        /**
         *  Tooltip is displayed
         */
        errorMessageIsVisible : PropTypes.bool,
        /**
        *  HTML name attribute of ButtonRadios in group (overrides default)
        */
        name                  : PropTypes.string,
        /**
        *  onChange callback function : ( e ) => { ... }
        */
        onChange              : PropTypes.func
    };

    static defaultProps =
    {
        layout     : 'horizontal',
        showLabels : false,
        isDisabled : false,
        isReadOnly : false,
        hasError   : false
    };

    render()
    {
        const {
            children,
            isDisabled,
            onChange,
            selectedValue,
            showLabels,
            values = []
        } = this.props;

        const name = name || this.state.id;

        const buildRadios = ( vals ) =>
            vals.map( ( value, index ) =>
            {
                let radioValue;
                let radioLabel;
                let radioIcon;

                if ( typeof value === 'object' )
                    {
                    radioValue     = value.value;
                    radioLabel     = value.label;
                    radioIcon      = value.icon;
                }
                else
                    {
                    radioValue = radioLabel = value;
                }

                const radioIsChecked = selectedValue === radioValue;

                radioIcon = !radioIcon ? 'none' : radioIcon;

                return (
                    <ButtonRadio
                        key        = { index } // eslint-disable-line react/no-array-index-key, max-len
                        iconType   = { radioIcon }
                        value      = { radioValue }
                        label      = { radioLabel }
                        isDisabled = { value.isDisabled }
                        isReadOnly = { value.isReadOnly }
                        hasError   = { value.hasError }
                        isChecked  = { radioIsChecked }
                        onChange   = { onChange }
                        showLabel  = { showLabels } />
                );
            } );

        return (
            <CheckableGroup name = { name } { ...this.props }>
                { children || buildRadios( values ) }
            </CheckableGroup>
        );
    }
}
