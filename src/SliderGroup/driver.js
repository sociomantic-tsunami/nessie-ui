export default class SliderGroupDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    getSlider( index )
    {
        if ( Array.isArray( index ) )
        {
            const items = this.wrapper.find( 'Slider' ).map( item => item );
            console.log( items.debug() );

            let sliders = [];
            index.forEach( i =>
            {
                sliders += items.i;
            } );
            return sliders;
        }

        return this.wrapper.find( 'Slider' ).at( index );
    }
}
