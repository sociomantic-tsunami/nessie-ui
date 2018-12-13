/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { IconButton }   from 'nessie-ui';

import DatePickerHeader from './DatePickerHeader';
import DatePickerItem   from './DatePickerItem';

const ERR = {
    ITEM_ERR : ( label, state ) =>
        `Item '${label}' cannot be clicked since it is ${state}`,
    NAV_ERR : ( el, state ) =>
        `${el} cannot simulate click since it is ${state}`,
    NO_INPUT : () =>
        'There\'s no input because <mode> is not <default>',
    TIMEINPUT_ERR : ( event, state ) =>
        `TimeInput cannot simulate ${event} since it is ${state}`,
};

export default class DatePickerDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.header  = wrapper.find( DatePickerHeader ).props().cssMap;
        this.prev    = wrapper.find( IconButton )
            .findWhere( node => node.props().iconType === 'left' );
        this.next    = wrapper.find( IconButton )
            .findWhere( node => node.props().iconType === 'right' );
        this.hour    = this.header.hour;
        this.min     = this.header.min;
    }

    clickItem( index = 0 )
    {
        const dateItem  = this.wrapper.find( DatePickerItem )
            .at( index );
        const { label } = dateItem.props();

        if ( dateItem.isDisabled )
        {
            throw new Error( ERR.ITEM_ERR( label, 'disabled' ) );
        }

        dateItem.simulate( 'click' );
        return this;
    }

    clickPrev()
    {
        if ( this.wrapper.props().prevIsDisabled )
        {
            throw new Error( ERR.NAV_ERR( 'Previous', 'disabled' ) );
        }

        this.prev.driver().click();
        return this;
    }

    clickNext()
    {
        if ( this.wrapper.props().nextIsDisabled )
        {
            throw new Error( ERR.NAV_ERR( 'Next', 'disabled' ) );
        }

        this.next.driver().click();
        return this;
    }

    keyPressHourInput( key )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'keyPress', 'disabled' ) );
        }

        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        this.wrapper.find( `.${this.hour}` ).simulate( 'keyPress', { key } );
        return this;
    }

    keyPressMinuteInput( key )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'keyPress', 'disabled' ) );
        }

        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        this.wrapper.find( `.${this.min}` ).simulate( 'keyPress', { key } );
        return this;
    }

    blurHourInput()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'blur', 'disabled' ) );
        }

        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        this.wrapper.find( `.${this.hour}` ).simulate( 'blur' );
        return this;
    }

    blurMinuteInput()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'blur', 'disabled' ) );
        }

        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        this.wrapper.find( `.${this.min}` ).simulate( 'blur' );
        return this;
    }

    focusHourInput()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'focus', 'disabled' ) );
        }

        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        this.wrapper.find( `.${this.hour}` ).simulate( 'focus' );
        return this;
    }

    focusMinuteInput()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'focus', 'disabled' ) );
        }

        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        this.wrapper.find( `.${this.min}` ).simulate( 'focus' );
        return this;
    }

    changeHourInput( val )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'change', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'change', 'read only' ) );
        }

        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        const node = this.wrapper.find( `.${this.hour}` ).instance();
        node.value = val;

        this.wrapper.find( `.${this.hour}` ).simulate( 'change' );
        return this;
    }

    changeMinuteInput( val )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'change', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'change', 'read only' ) );
        }

        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        const node = this.wrapper.find( `.${this.min}` ).instance();
        node.value = val;

        this.wrapper.find( `.${this.min}` ).simulate( 'change' );
        return this;
    }
}
