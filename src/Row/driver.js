export default class RowColumnDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    getContent()
    {
        return this.wrapper.children();
    }
}
