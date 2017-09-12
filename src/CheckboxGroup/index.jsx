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
        selectedValues : PropTypes.arrayOf( PropTypes.string ),
    };

    static defaultProps =
    {
        isDisabled : false,
        forceHover : false,
        hasError   : false
    };

    render()
    {
        const {
            children,
            selectedValues = [],
            values = []
        } = this.props;

        const name = name || this.state.id;

        const buildCheckboxes = ( vals ) => vals.map( ( value ) =>
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

            const checkboxIsChecked =
                    selectedValues.indexOf( checkboxValue ) > -1;

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

        return (
            <CheckableGroup name = { name } { ...this.props }>
                { children || buildCheckboxes( values ) }
            </CheckableGroup>
        );
    }
}
