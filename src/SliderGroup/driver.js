export default class SliderGroupDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    getSlider( index = 0 )
    {
        if ( Array.isArray( index ) )
        {
            const sliders = [];
            this.wrapper.find( 'Slider' ).forEach( ( item, i ) =>
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
