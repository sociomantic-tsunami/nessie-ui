import SimpleComponentDriver from
    '../Testing/CommonDrivers/simpleComponentDriver';

const ERRORS = {
    SWITCH_CANNOT_BE_TOGGLED : ( state ) =>
        `Switch cannot be toggled since it is ${state}`
};

export default class SwitchDriver extends SimpleComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.prop( 'cssMap' ).default}` );
        this.input = wrapper.find( `.${wrapper.prop( 'cssMap' ).input}` );
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

        const node = this.input.instance();

        node.checked = !node.checked;
        this.input.simulate( 'change' );

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

        this.input.simulate( 'blur' );
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

        this.input.simulate( 'focus' );
        return this;
    }
}
