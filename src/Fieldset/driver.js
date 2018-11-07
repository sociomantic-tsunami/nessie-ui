const ERR = {
    FIELDSET_ERR : ( event ) =>
        `Fieldset cannot simulate ${event} because it is disabled`,
};

export default class FieldsetDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
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
