import { InputField, FlounderDropdown } from 'nessie-ui';

export default class TextInputWithDropdownDriver
{
    constructor( wrapper )
    {
        this.wrapper    = wrapper;
        this.inputfield = wrapper.find( InputField );
        this.flounder   = wrapper.find( FlounderDropdown );
    }

    blur()
    {
        this.inputfield.driver().blur();
        return this;
    }

    focus()
    {
        this.inputfield.driver().focus();
        return this;
    }

    changeInput( val )
    {
        this.inputfield.driver().change( val );
    }

    changeFlounder( val )
    {
        this.flounder.driver().change( val );
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
}
