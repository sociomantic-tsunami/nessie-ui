import { InputField, FlounderDropdown } from '../index';

export default class TextInputWithDropdownDriver
{
    constructor( wrapper )
    {
        this.wrapper    = wrapper;
        this.inputfield = wrapper.find( InputField );
        this.flounder   = wrapper.find( FlounderDropdown );
        this.row        = wrapper.find( `.${wrapper.props().cssMap.row}` );
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

    changeInput( val = 'k' )
    {
        this.inputfield.driver().change( val );
    }

    changeFlounder( val = 'g' )
    {
        this.flounder.driver().change( val );
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOverRow()
    {
        this.row.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseleave' );
        return this;
    }

    mouseOutRow()
    {
        this.row.simulate( 'mouseleave' );
        return this;
    }
}
