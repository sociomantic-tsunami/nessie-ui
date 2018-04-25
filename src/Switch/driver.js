import SimpleComponentDriver from '../Testing/CommonDrivers/simpleComponentDriver'; // eslint-disable-line max-len

const ERRORS = {
    SWITCH_CANNOT_BE_TOGGLED : ( state ) => `Switch cannot be toggled since it is ${state}` // eslint-disable-line max-len
};

export default class SwitchDriver extends SimpleComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.props().cssMap.default}` );
    }

    toggle()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error(
                ERRORS.SWITCH_CANNOT_BE_TOGGLED( 'disabled' )
            );
        }
        if ( props.isReadOnly )
        {
            throw new Error(
                ERRORS.SWITCH_CANNOT_BE_TOGGLED( 'readonly' )
            );
        }

        this.input.simulate( 'change',
            { target: { checked: !props.isChecked } } );

        return this.wrapper;
    }

    blur()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error(
                ERRORS.SWITCH_CANNOT_BE_TOGGLED( 'disabled' )
            );
        }

        this.wrapper.find( 'input' ).simulate( 'blur' );
        return this;
    }

    focus()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error(
                ERRORS.SWITCH_CANNOT_BE_TOGGLED( 'disabled' )
            );
        }

        this.wrapper.find( 'input' ).simulate( 'focus' );
        return this;
    }
}
