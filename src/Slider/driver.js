const ERRORS = {
    DISABLED : ( label, action ) =>
        `Slider ${label ? `'${label}'` : ''} cannot be ${action} since it is \
disabled`,
    READONLY : ( label, action ) =>
        `Slider ${label ? `'${label}'` : ''} cannot be ${action} since it is \
read only`,
};

const toArray = value => ( Array.isArray( value ) ? value : [ value ] );

export default class SliderDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;

        this.cssMap = wrapper.prop( 'cssMap' );
        this.label  = wrapper.prop( 'label' );

        this.default        = wrapper.find( `.${this.cssMap.default}` );
        this.inputContainer = wrapper.find( `.${this.cssMap.inputContainer}` );
        this.track          = wrapper.find( `.${this.cssMap.track}` );
    }

    blur( index = 0 )
    {
        if ( this.wrapper.prop( 'isDisabled' ) )
        {
            throw new Error( ERRORS.DISABLED( this.label, 'blurred' ) );
        }

        this.inputContainer.childAt( index ).simulate( 'blur' );
        return this;
    }

    change( value = '0', index = 0 )
    {
        if ( this.wrapper.prop( 'isDisabled' ) )
        {
            throw new Error( ERRORS.DISABLED( this.label, 'changed' ) );
        }

        if ( this.wrapper.prop( 'isReadOnly' ) )
        {
            throw new Error( ERRORS.READONLY( this.label, 'changed' ) );
        }

        const input = this.inputContainer.childAt( index );
        const node  = input.getNode();

        node.value = value;
        input.simulate( 'change' );

        return this;
    }

    click()
    {
        if ( this.wrapper.prop( 'isDisabled' ) )
        {
            throw new Error( ERRORS.DISABLED( this.label, 'clicked' ) );
        }

        this.track.simulate( 'click' );
        return this;
    }

    focus( index = 0 )
    {
        if ( this.wrapper.prop( 'isDisabled' ) )
        {
            throw new Error( ERRORS.DISABLED( this.label, 'focused' ) );
        }

        this.inputContainer.childAt( index ).simulate( 'focus' );
        return this;
    }

    keyDown( keyCode, index = 0 )
    {
        if ( this.wrapper.prop( 'isDisabled' ) )
        {
            throw new Error( ERRORS.DISABLED( this.label, 'changed' ) );
        }

        this.inputContainer.childAt( index ).simulate( 'keyDown', { keyCode } );
        return this;
    }

    keyUp( keyCode, index = 0 )
    {
        if ( this.wrapper.prop( 'isDisabled' ) )
        {
            throw new Error( ERRORS.DISABLED( this.label, 'changed' ) );
        }

        this.inputContainer.childAt( index ).simulate( 'keyUp', { keyCode } );
        return this;
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseleave' );
        return this;
    }

    mouseDown()
    {
        this.track.first().simulate( 'mouseDown' );
        return this;
    }

    mouseUp() // not a React SyntheticEvent
    {
        this.wrapper.node.handleUp();
        return this;
    }
}
