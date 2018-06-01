const ERRORS = {
    BUTTON_CANNOT_BE_CLICKED : ( label, state ) =>
        `Button '${label}' cannot be clicked since it is ${state}`
};

export default class ButtonDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.button  = wrapper.find( 'button' ).first();
    }

    click()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error(
                ERRORS.BUTTON_CANNOT_BE_CLICKED( label, 'disabled' )
            );
        }
        if ( props.isLoading )
        {
            throw new Error(
                ERRORS.BUTTON_CANNOT_BE_CLICKED( label, 'loading' )
            );
        }

        this.button.simulate( 'click' );
        return this;
    }

    mouseOut()
    {
        this.button.simulate( 'mouseLeave' );
        return this;
    }

    mouseOver()
    {
        this.button.simulate( 'mouseEnter' );
        return this;
    }
}
