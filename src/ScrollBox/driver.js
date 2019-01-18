/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { ScrollBar }    from 'nessie-ui';

import { createCssMap } from '../Theming';


const ERR = {
    SCROLL_CANNOT_BE_CLICKED : prop =>
        `Button cannot be clicked since it doesn't have ${prop} prop`,
    CANNOT_SCROLL_IN_DIRECTION : direction =>
        `Cannot scroll because scroll direction is neither '${direction}' nor \
'both'`,
};


export default class ScrollBoxDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    get props()
    {
        return this.wrapper.props();
    }

    get instance()
    {
        return this.wrapper.instance();
    }

    get cssMap()
    {
        const { instance } = this;
        return instance.props.cssMap ||
            createCssMap( instance.context.ScrollBox, instance.props );
    }

    get scrollBox()
    {
        return this.wrapper.find( `.${this.cssMap.inner}` );
    }


    clickScrollUp()
    {
        if ( !this.props.scrollUpIsVisible )
        {
            throw new Error( ERR
                .SCROLL_CANNOT_BE_CLICKED( 'scrollUpIsVisible' ) );
        }

        this.wrapper.find( `.${this.cssMap.iconUp}` )
            .first().simulate( 'click' );
        return this;
    }

    clickScrollRight()
    {
        if ( !this.props.scrollRightIsVisible )
        {
            throw new Error( ERR
                .SCROLL_CANNOT_BE_CLICKED( 'scrollRightIsVisible' ) );
        }

        this.wrapper.find( `.${this.cssMap.iconRight}` )
            .first().simulate( 'click' );
        return this;
    }

    clickScrollDown()
    {
        if ( !this.props.scrollDownIsVisible )
        {
            throw new Error( ERR
                .SCROLL_CANNOT_BE_CLICKED( 'scrollDownIsVisible' ) );
        }

        this.wrapper.find( `.${this.cssMap.iconDown}` )
            .first().simulate( 'click' );
        return this;
    }

    clickScrollLeft()
    {
        if ( !this.props.scrollLeftIsVisible )
        {
            throw new Error( ERR
                .SCROLL_CANNOT_BE_CLICKED( 'scrollLeftIsVisible' ) );
        }

        this.wrapper.find( `.${this.cssMap.iconLeft}` )
            .first().simulate( 'click' );
        return this;
    }

    scrollVertical( scrollOffset = 0 )
    {
        const node = this.scrollBox.instance();

        if ( !( this.props.scroll === 'vertical' ||
            this.props.scroll === 'both' ) )
        {
            throw new Error( ERR.CANNOT_SCROLL_IN_DIRECTION( 'vertical' ) );
        }

        node.scrollTop = scrollOffset;
        this.scrollBox.simulate( 'scroll' );

        return this;
    }

    scrollHorizontal( scrollOffset = 0 )
    {
        const node = this.scrollBox.instance();

        if ( !( this.props.scroll === 'horizontal' ||
            this.props.scroll === 'both' ) )
        {
            throw new Error( ERR
                .CANNOT_SCROLL_IN_DIRECTION( 'horizontal' ) );
        }

        node.scrollLeft = scrollOffset;
        this.scrollBox.simulate( 'scroll' );

        return this;
    }

    seekVertical( scrollOffset )
    {
        const node      = this.scrollBox.instance();
        const scrollBar = this.wrapper.find( ScrollBar ).last();

        if ( !( this.props.scroll === 'vertical' ||
            this.props.scroll === 'both' ) )
        {
            throw new Error( ERR.CANNOT_SCROLL_IN_DIRECTION( 'vertical' ) );
        }

        node.scrollTop = scrollOffset;
        this.scrollBox.simulate( 'scroll' );
        scrollBar.driver().change( scrollOffset );

        return this;
    }

    seekHorizontal( scrollOffset )
    {
        const node      = this.scrollBox.instance();
        const scrollBar = this.wrapper.find( ScrollBar ).first();

        if ( !( this.props.scroll === 'vertical' ||
            this.props.scroll === 'both' ) )
        {
            throw new Error( ERR.CANNOT_SCROLL_IN_DIRECTION( 'vertical' ) );
        }


        node.scrollLeft = scrollOffset;
        this.scrollBox.simulate( 'scroll' );
        scrollBar.driver().change( scrollOffset );

        return this;
    }
}
