import React            from 'react';
import PropTypes        from 'prop-types';

import Component        from '../proto/Component';
import CheckableGroup   from '../CheckableGroup';
import Radio            from '../Radio';

export default class RadioGroup extends Component
{
    static propTypes =
    {
        /**
        *  Group label text string or JSX node
        */
        label  : PropTypes.node,
        /**
        *  Array of strings or objects (to build the Radios)
        */
        values : PropTypes.oneOfType( [
            PropTypes.arrayOf( PropTypes.string ),
            PropTypes.arrayOf( PropTypes.shape( {
                value : PropTypes.string,
                label : PropTypes.string
            } ) ),
        ] ),
        /**
        *  The selected string (to build the Radios)
        */
        selectedValue         : PropTypes.string,
        /**
        *  How to lay out the Radios
        */
        layout                : PropTypes.oneOf( [ 'horizontal', 'vertical' ] ),
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
        *  HTML name attribute of Radios in group (overrides default)
        */
        name                  : PropTypes.string,
        /**
        *  onChange callback function : ( e ) => { ... }
        */
        onChange              : PropTypes.func,
        /**
         *  onItemMouseOver callback function : ( e ) => { ... }
         */
        onItemMouseOver       : PropTypes.func,
        /**
         *  onItemMouseOut callback function : ( e ) => { ... }
         */
        onItemMouseOut        : PropTypes.func,
        /**
         * Display as hover when required from another component
         */
        forceHover            : PropTypes.bool
    };

    static defaultProps =
    {
        layout     : 'horizontal',
        isDisabled : false,
        isReadOnly : false,
        forceHover : false,
        hasError   : false
    };


    buildRadios()
    {
        const { values = [], selectedValue  } = this.props;

        return values.map( ( value, index ) =>
        {
            let radioValue;
            let radioLabel;

            if ( typeof value === 'object' )
            {
                radioValue     = value.value;
                radioLabel     = value.label;
            }
            else
            {
                radioValue = radioLabel = value;
            }

            const radioIsChecked = selectedValue === radioValue;

            return (
                <Radio
                    key        = { index } // eslint-disable-line react/no-array-index-key, max-len
                    value      = { radioValue }
                    label      = { radioLabel }
                    isDisabled = { value.isDisabled }
                    isReadOnly = { value.isReadOnly }
                    hasError   = { value.hasError }
                    isChecked  = { radioIsChecked } />
            );
        } );
    }

    render()
    {
        const { children } = this.props;

        const name = name || this.state.id;

        return (
            <CheckableGroup name = { name } { ...this.props }>
                { children || this.buildRadios() }
            </CheckableGroup>
        );
    }
}
