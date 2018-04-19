const ERR = {
    DISABLED : item => `Cannot trigger click on the "${item}"`
};

export default class ComboBoxDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    blur()
    {
        this.wrapper.find( 'InputField' ).simulate( 'blur' );
        return this;
    }

    changeInput()
    {
        this.wrapper.find( 'TextInputWithIcon' ).simulate( 'change' );
        return this;
    }

    clickInput()
    {
        this.wrapper.find( 'Input' ).simulate( 'click' );
        return this;
    }

    clickOption()
    {
        this.wrapper.find( 'Option' ).simulate( 'click' );
        return this;
    }

    focus()
    {
        this.wrapper.find( 'TextInputWithIcon' ).simulate( 'focus' );
        return this;
    }

    keyDown()
    {
        this.wrapper.simulate( 'keyDown' );
        return this;
    }

    keyPress()
    {
        this.wrapper.simulate( 'keyPress' );
        return this;
    }

    keyUp()
    {
        this.wrapper.simulate( 'keyUp' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseleave' );
        return this;
    }

    mouseOutOption()
    {
        this.wrapper.find( 'Option' ).simulate( 'mouseleave' );
        return this;
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOverOption()
    {
        this.wrapper.find( 'Option' ).simulate( 'mouseenter' );
        return this;
    }

    scroll()
    {
        this.wrapper.simulate( 'scroll' );
        return this;
    }
}
