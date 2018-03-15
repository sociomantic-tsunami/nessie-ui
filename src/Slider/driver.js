const ERRORS = {
    BUTTON_CANNOT_BE_CLICKED : ( label, state ) =>
        `Slider '${label}' cannot be clicked since it is ${state}`
};


export default class SliderDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.props().cssMap;

        this.track          = wrapper.find( `.${this.cssMap.track}` );
        this.inputContainer = wrapper.find( `.${this.cssMap.inputContainer}` );
    }

    blur( index = 0 )
    {
        this.inputContainer.childAt( index ).simulate( 'blur' );
        return this;
    }

    change( index = 0 )
    {
        this.inputContainer.childAt( index ).simulate( 'change' );
        return this;
    }

    click()
    {
        const label = this.wrapper.prop( label );

        if ( this.wrapper.prop( 'isDisabled' ) )
        {
            throw new Error(
                ERRORS.BUTTON_CANNOT_BE_CLICKED( label, 'disabled' )
            );
        }

        this.track.simulate( 'click' );
        return this;
    }

    focus( index = 0 )
    {
        this.inputContainer.childAt( index ).simulate( 'focus' );
        return this;
    }

    keyDown( index = 0 )
    {
        this.inputContainer.childAt( index ).simulate( 'keyDown' );
        return this;
    }

    keyUp( index = 0 )
    {
        this.inputContainer.childAt( index ).simulate( 'keyup' );
        return this;
    }

    mouseDown()
    {
        this.track.simulate( 'mouseDown' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseOut' );
        return this;
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseOver' );
        return this;
    }

    mouseUp()
    {
        this.wrapper.simulate( 'mouseUp' );
        return this;
    }
}
