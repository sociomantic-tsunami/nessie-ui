export default class UploaderDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = this.wrapper.props().cssMap;
    }

    click()
    {
        this.wrapper.find( 'Button' ).first().driver().click();
        return this;
    }

    clickSecondary()
    {
        this.wrapper.find( 'IconButton' ).first().driver().click();
        return this;
    }

    change( val )
    {
        this.wrapper.find( `.${this.cssMap.input}` )
            .simulate( 'change', { target: { value: val } } );
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
