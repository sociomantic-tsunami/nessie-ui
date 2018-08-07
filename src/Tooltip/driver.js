const ERR = {
    CANT_CLOSE : () =>
        'Input can\'t be clicked since it\'s not dismissable',
};

export default class TooltipDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = this.wrapper.props().cssMap;
    }

    getContent()
    {
        return this.wrapper.find( `.${this.cssMap.content}` ).children();
    }

    getMessage()
    {
        return this.wrapper.find( `.${this.cssMap.message}` ).children();
    }

    clickClose()
    {
        if ( !this.wrapper.props().isDismissible )
        {
            throw new Error( ERR.CANT_CLOSE() );
        }

        this.wrapper.find( 'IconButton' ).driver().click();
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
