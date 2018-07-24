const ERR = {
    NOT_A_CAROUSEL : item => `Cannot trigger click on the "${item}" because \
the modal is not a Carousel`
};

export default class ModalDialogDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;

        this.cssMap  = this.wrapper.props().cssMap;

        this.overlay = wrapper.find( `.${this.cssMap.default}` );

        this.content = wrapper.find( `.${this.cssMap.content}` );

        this.closeButton = wrapper.find( `.${this.cssMap.header}` )
            .find( 'IconButton' );

        this.prevButton = wrapper.find( `.${this.cssMap.navigation}` )
            .find( 'IconButton' ).first();

        this.nextButton = wrapper.find( `.${this.cssMap.navigation}` )
            .find( 'IconButton' ).last();
    }

    clickOverlay()
    {
        this.overlay.simulate( 'click' );
    }

    clickClose()
    {
        if ( this.wrapper.prop( 'type' ) !== 'carousel' )
        {
            throw new Error( ERR.NOT_A_CAROUSEL( 'Close Button' ) );
        }
        this.closeButton.driver().click();
    }

    clickPrev()
    {
        if ( this.wrapper.prop( 'type' ) !== 'carousel' )
        {
            throw new Error( ERR.NOT_A_CAROUSEL( 'Prev Button' ) );
        }
        this.prevButton.driver().click();
    }

    clickNext()
    {
        if ( this.wrapper.prop( 'type' ) !== 'carousel' )
        {
            throw new Error( ERR.NOT_A_CAROUSEL( 'Next Button' ) );
        }
        this.nextButton.driver().click();
    }
}
