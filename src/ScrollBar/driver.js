export default class ScrollBarDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.control = wrapper.find( `.${wrapper.props().cssMap.range}` )
            .first();
    }

    change( value )
    {
        const node  = this.control.getNode();
        node.value = value;
        this.control.simulate( 'change' );

        return this;
    }
}
