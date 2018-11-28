/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */


/**
 * Driver for flounder dropdown driver. The flounder dropdown uses currently
 * a non React control. This renders Enzyme useless in many cases and a manual
 * approach is used. If the control changes to React please extend
 * InputComponentDriver.
 * When this will happen the following methods could be developed easily:
 * Search, SearchAndChoose (through change text)
 * ToggleDropdownOptions (through click/hover)
 *
 * otherwise I think it's possible to change the elements through
 * this.flounderControl.refs and re-render the wrapper.
 */

export default class FlounderDropdownDriver
{
    constructor( wrapper )
    {
        // Nessie Control
        this.wrapper = wrapper;
        // the 3rd party control
        this.innerFlounderComponent = wrapper.instance().flounderInstance;
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
        this.wrapper.children().simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.children().simulate( 'mouseleave' );
        return this;
    }
}
