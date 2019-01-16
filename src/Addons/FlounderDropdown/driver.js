/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */


export default class FlounderDropdownDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    get innerFlounderComponent()
    {
        return this.wrapper.instance().flounderInstance;
    }


    getFlounderAPI()
    {
        return this.innerFlounderComponent;
    }

    change( val )
    {
        this.innerFlounderComponent.onChange( val );
        return this;
    }

    close()
    {
        this.innerFlounderComponent.onClose();
        return this;
    }

    open()
    {
        this.innerFlounderComponent.onOpen();
        return this;
    }

    firstTouch()
    {
        this.innerFlounderComponent.onFirstTouch();
        return this;
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
