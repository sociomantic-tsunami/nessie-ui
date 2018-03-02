import React            from 'react';
import PropTypes        from 'prop-types';

import Component        from '../proto/Component';
import CheckableGroup   from '../CheckableGroup';
import Checkbox         from '../Checkbox';


export default class CheckboxGroup extends Component
{
    static propTypes =
    {
        /**
        *  Array of strings or objects (to build the Checkboxes)
        */
        values : PropTypes.oneOfType( [
            PropTypes.arrayOf( PropTypes.string ),
            PropTypes.arrayOf( PropTypes.shape( {
                value : PropTypes.string,
                label : PropTypes.string
            } ) ),
        ] ),
        /**
        *  Array of selected strings (to build the Checkboxes)
        */
        selectedValues        : PropTypes.arrayOf( PropTypes.string ),
        /**
        *  How to lay out the Checkboxes
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
        *  HTML name attribute of Checkboxes in group (overrides default)
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
        isDisabled : false,
        forceHover : false,
        hasError   : false,
        layout     : 'horizontal',
    };

    buildCheckboxes()
    {
        const { values = [], selectedValues } = this.props;

        return values.map( ( value ) =>
        {
            let checkboxValue;
            let checkboxLabel;

            if ( typeof value === 'object' )
            {
                checkboxValue = value.value;
                checkboxLabel = value.label;
            }
            else
            {
                checkboxValue = checkboxLabel = value;
            }

            const checkboxIsChecked = selectedValues.includes( checkboxValue );

            return (
                <Checkbox
                    key         = { checkboxValue }
                    value       = { checkboxValue }
                    label       = { checkboxLabel }
                    isDisabled  = { value.isDisabled }
                    isReadOnly  = { value.isReadOnly }
                    hasError    = { value.hasError }
                    isChecked   = { checkboxIsChecked } />
            );
        } );
    }

    render()
    {
        const { children } = this.props;

        const name = name || this.state.id;

        return (
            <CheckableGroup name = { name } { ...this.props }>
                { children || this.buildCheckboxes() }
            </CheckableGroup>
        );
    }
}
