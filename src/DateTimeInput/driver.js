/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { DatePicker, IconButton } from 'nessie-ui';


const ERR = {
    INPUT_ERR : ( event, state ) =>
        `Main input cannot simulate ${event} since it is ${state}`,
};

export default class DateTimeInputDriver
{
    constructor( wrapper )
    {
        this.wrapper    = wrapper;
        this.cssMap     = wrapper.children().props().cssMap;

        this.mainInput  = wrapper.find( `.${this.cssMap.input}` );
        this.calendar   = wrapper.find( DatePicker );
        this.icon       = wrapper.find( IconButton )
            .findWhere( node => node.props().iconType === 'calendar' );
        this.prev       = wrapper.find( `.${this.cssMap.prev}` );
        this.next       = wrapper.find( `.${this.cssMap.next}` );
    }

    blurMainInput()
    {
        this.mainInput.simulate( 'blur' );
        return this;
    }

    focusMainInput()
    {
        this.mainInput.simulate( 'focus' );
        return this;
    }

    blurHourInput()
    {
        this.calendar.driver().blurHourInput();
        return this;
    }

    focusHourInput()
    {
        this.calendar.driver().focusHourInput();
        return this;
    }

    blurMinuteInput()
    {
        this.calendar.driver().blurMinuteInput();
        return this;
    }

    focusMinuteInput()
    {
        this.calendar.driver().focusMinuteInput();
        return this;
    }

    clickCellByIndex( index = 0 )
    {
        this.calendar.driver().clickItem( index );
        return this;
    }

    clickCellByValue( value )
    {
        const day = this.calendar.findWhere( n => n.prop( 'value' ) === value )
            .first();

        day.simulate( 'click' );
        return this;
    }

    clickPrev()
    {
        this.prev.simulate( 'click' );
        return this;
    }

    clickNext()
    {
        this.next.simulate( 'click' );
        return this;
    }

    clickIcon()
    {
        this.icon.driver().click();
        return this;
    }

    changeMainInput( val )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'change', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly ||
            this.wrapper.props().isReadOnlyInput )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'change', 'read only' ) );
        }

        const node = this.mainInput.getNode();
        node.value = val;

        this.mainInput.simulate( 'change' );
        return this;
    }

    keyDownMainInput( keyCode )
    {
        this.mainInput.simulate( 'keyDown', { keyCode, which: keyCode } );
        return this;
    }

    keyUpMainInput( keyCode )
    {
        this.mainInput.simulate( 'keyUp', { keyCode, which: keyCode } );
        return this;
    }

    keyPressMainInput( keyCode )
    {
        this.mainInput.simulate( 'keyPress', { keyCode, which: keyCode } );
        return this;
    }

    keyPressHour( keyCode )
    {
        this.calendar.driver().keyPressHourInput( keyCode );
        return this;
    }

    keyPressMinute( keyCode )
    {
        this.calendar.driver().keyPressMinuteInput( keyCode );
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
