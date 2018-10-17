import { CheckableGroup } from '../index';

export default class CheckboxGroupDriver
{
    constructor( wrapper )
    {
        this.wrapper    = wrapper;
        this.checkables = wrapper.find( CheckableGroup );
    }


    change( index = 0 )
    {
        this.checkables.driver().change( index );
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
}
