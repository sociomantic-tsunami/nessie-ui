import { IconButton } from '../index';

const ERR = {
    CANT_CLOSE : () =>
        'Input can\'t be clicked since it\'s not dismissable',
};

export default class TooltipDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.props().cssMap;
    }

    clickClose()
    {
        if ( !this.wrapper.props().isDismissible )
        {
            throw new Error( ERR.CANT_CLOSE() );
        }

        this.wrapper.find( IconButton ).driver().click();
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
