export default class FormDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    submit()
    {
        this.wrapper.simulate( 'submit' );
        return this.wrapper;
    }
}
