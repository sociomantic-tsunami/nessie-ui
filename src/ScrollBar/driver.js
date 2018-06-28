export default class ScrollBarDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.control = wrapper.find( `.${wrapper.props().cssMap.range}` ).first();
        this.outer = wrapper.find( `.${wrapper.props().cssMap.default}` );
    }

    change( value )
    {
        const node  = this.control.getNode();
        node.value = value;
        this.control.simulate( 'change' );

        return this;
    }

    mouseOver()
    {
        this.outer.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.outer.simulate( 'mouseleave' );
        return this;
    }
}
