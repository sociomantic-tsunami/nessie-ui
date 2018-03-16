const ERRORS = {
    DISABLED : ( label, action ) =>
        `Slider ${label ? `'${label}'` : ''} cannot be ${action} since it is \
disabled`,
};

const INCREMENT_KEYS = [ 38, 39 ];
const DECREMENT_KEYS = [ 37, 40 ];

export default class SliderDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;

        this.cssMap = wrapper.prop( 'cssMap' );
        this.label  = wrapper.prop( 'label' );

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

    change( value, index = 0 )
    {
        if ( this.wrapper.prop( 'isDisabled' ) )
        {
            throw new Error( ERRORS.DISABLED( this.label, 'changed' ) );
        }

        this.inputContainer.childAt( index ).simulate( 'change', {
            target : { value }
        } );
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

    mouseUp() // not a React SyntheticEvent
    {
        this.wrapper.instance().handleMouseUp();
        return this;
    }

    setValue( value, { inputMethod = 'mouse' } )
    {
        if ( this.wrapper.prop( 'isDisabled' ) )
        {
            throw new Error( ERRORS.DISABLED( this.label, 'changed' ) );
        }

        if( inputMethod === 'mouse')

        let values = Array.isArray( value ) ? value : [ value ];

        values.forEach( ( val, i ) =>
        {
            this.mouseOver();
            this.mouseDown();
            this.focus( index );
            this.change( val, i );
            this.mouseUp();
            this.click();
            this.mouseOut();
        } );
    }

    setValueByKeys( keyCode, index = 0 )
    {
        if ( this.wrapper.prop( 'isDisabled' ) )
        {
            throw new Error( ERRORS.DISABLED( this.label, 'changed' ) );
        }

        const { maxValue, minValue, step, value } = this.wrapper.props();
        const upKey   = 38;
        const downKey = 40;

        let newValue = Array.isArray( value ) ? value[ index ] : value;

        if ( INCREMENT_KEYS.includes( keyCode ) )
        {
            newValue += step;
        }
        else if ( DECREMENT_KEYS.includes( keyCode ) )
        {
            newValue -= step;
        }

        newValue = Math.min( Math.max( newValue, minValue ), maxValue );

        this.focus( index );
        this.keyDown( keyCode, index );
        this.change( newValue, index );
        this.keyUp( keyCode, index );
    }
}
