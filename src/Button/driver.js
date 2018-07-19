const ERRORS = {
    BUTTON_CANNOT_BE_CLICKED : ( label, state ) => `Button '${label}' cannot be clicked since it is ${state}` // eslint-disable-line max-len
};

export default class ButtonDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = this.wrapper.props().cssMap;
    }

    click()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .BUTTON_CANNOT_BE_CLICKED( label, 'disabled' ) );
        }
        if ( props.isLoading )
        {
            throw new Error( ERRORS
                .BUTTON_CANNOT_BE_CLICKED( label, 'loading' ) );
        }

        return this.wrapper.simulate( 'click' );
    }
}
