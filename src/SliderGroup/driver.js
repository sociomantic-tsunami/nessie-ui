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
            const sliders = [];
            this.wrapper.find( 'Slider' ).map( ( item, i ) =>
            {
                if ( index.includes( i ) )
                {
                    sliders.push( item );
                }
            } );

            return sliders;
        }

        return this.wrapper.find( 'Slider' ).at( index );
    }
}
