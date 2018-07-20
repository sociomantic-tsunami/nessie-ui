const ERRORS = {
    SWITCH_CANNOT_BE_TOGGLED : ( state ) =>
        `Switch cannot be toggled since it is ${state}`
};

export default class SwitchDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = this.wrapper.props().cssMap;
        this.input = wrapper.find( `.${wrapper.props().cssMap.input}` );
    }

    toggle()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error( ERRORS.SWITCH_CANNOT_BE_TOGGLED( 'disabled' ) );
        }
        if ( props.isReadOnly )
        {
            throw new Error( ERRORS.SWITCH_CANNOT_BE_TOGGLED( 'readonly' ) );
        }

        const node = this.input.getNode();

        node.checked = !node.checked;
        this.input.simulate( 'change' );

        return this.wrapper;
    }

    blur()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error( ERRORS.SWITCH_CANNOT_BE_TOGGLED( 'disabled' ) );
        }

        this.input.simulate( 'blur' );
        return this;
    }

    focus()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error( ERRORS.SWITCH_CANNOT_BE_TOGGLED( 'disabled' ) );
        }

        this.input.simulate( 'focus' );
        return this;
    }
}
