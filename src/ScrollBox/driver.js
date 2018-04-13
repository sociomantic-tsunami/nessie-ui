const ERRORS = {
    SCROLL_CANNOT_BE_CLICKED   : ( prop ) => `Button cannot be clicked since it doesn't have ${prop} prop`, // eslint-disable-line max-len
    CANNOT_SCROLL_IN_DIRECTION : ( direction ) => `Cannot scroll because scroll direction is neither '${direction}' nor 'both'` // eslint-disable-line max-len
};

export default class ScrollBoxDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.props = this.wrapper.props();
    }

    clickScrollUp()
    {
        if ( !this.props.scrollUpIsVisible )
        {
            throw new Error(
                ERRORS.SCROLL_CANNOT_BE_CLICKED( 'scrollUpIsVisible' )
            );
        }

        if ( !this.props.onClickScrollUp )
        {
            throw new Error(
                ERRORS.SCROLL_CANNOT_BE_CLICKED( 'onClickScrollUp' )
            );
        }

        this.wrapper.find( '.scrollBox__icon__up' ).first()
            .simulate( 'click' );
        return this;
    }

    clickScrollRight()
    {
        if ( !this.props.scrollRightIsVisible )
        {
            throw new Error(
                ERRORS.SCROLL_CANNOT_BE_CLICKED( 'scrollRightIsVisible' )
            );
        }

        if ( !this.props.onClickScrollRight )
        {
            throw new Error(
                ERRORS.SCROLL_CANNOT_BE_CLICKED( 'onClickScrollRight' )
            );
        }

        this.wrapper.find( '.scrollBox__icon__right' ).first()
            .simulate( 'click' );
        return this;
    }

    clickScrollDown()
    {
        if ( !this.props.scrollDownIsVisible )
        {
            throw new Error(
                ERRORS.SCROLL_CANNOT_BE_CLICKED( 'scrollDownIsVisible' )
            );
        }

        if ( !this.props.onClickScrollDown )
        {
            throw new Error(
                ERRORS.SCROLL_CANNOT_BE_CLICKED( 'onClickScrollDown' )
            );
        }

        this.wrapper.find( '.scrollBox__icon__down' ).first()
            .simulate( 'click' );
        return this;
    }

    clickScrollLeft()
    {
        if ( !this.props.scrollLeftIsVisible )
        {
            throw new Error(
                ERRORS.SCROLL_CANNOT_BE_CLICKED( 'scrollLeftIsVisible' )
            );
        }

        if ( !this.props.onClickScrollLeft )
        {
            throw new Error(
                ERRORS.SCROLL_CANNOT_BE_CLICKED( 'onClickScrollLeft' )
            );
        }

        this.wrapper.find( '.scrollBox__icon__left' ).first()
            .simulate( 'click' );
        return this;
    }

    scrollVertical( scrollOffset )
    {
        if ( !( this.props.scroll === 'vertical' ||
            this.props.scroll === 'both' ) )
        {
            throw new Error(
                ERRORS.CANNOT_SCROLL_IN_DIRECTION( 'vertical' )
            );
        }

        this.wrapper.find( '.scrollBox__scrollBox' ).simulate( 'scroll', {
            target : { scrollTop: scrollOffset }
        } );
        return this;
    }

    scrollHorizontal( scrollOffset )
    {
        if ( !( this.props.scroll === 'horizontal' ||
            this.props.scroll === 'both' ) )
        {
            throw new Error(
                ERRORS.CANNOT_SCROLL_IN_DIRECTION( 'horizontal' )
            );
        }

        this.wrapper.find( '.scrollBox__scrollBox' ).simulate( 'scroll', {
            target : { scrollLeft: scrollOffset }
        } );
        return this;
    }
}
