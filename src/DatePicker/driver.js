/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

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
        this.cssMap  = wrapper.props().cssMap;
        this.header  = wrapper.find( DatePickerHeader ).props().cssMap;
        this.hour    = this.header.hour;
        this.min     = this.header.min;
    }

    clickItem( index = 0 )
    {
        const dateItem = this.wrapper.find( DatePickerItem )
            .at( index );
        const { label } = dateItem.props();

        if ( dateItem.isDisabled )
        {
            throw new Error( ERR.ITEM_ERR( label, 'disabled' ) );
        }

        if ( dateItem.isReadOnly )
        {
            throw new Error( ERR.ITEM_ERR( label, 'read only' ) );
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

        this.wrapper.find( `.${this.cssMap.prev}` ).simulate( 'click' );
        return this;
    }

    clickNext()
    {
        if ( this.wrapper.props().nextIsDisabled )
        {
            throw new Error( ERR.NAV_ERR( 'Next', 'disabled' ) );
        }

        this.wrapper.find( `.${this.cssMap.next}` ).simulate( 'click' );
        return this;
    }

    keyPressHour( key )
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'keyPress', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'keyPress', 'read only' ) );
        }

        this.wrapper.find( `.${this.hour}` )
            .simulate( 'keyPress', { key } );
        return this;
    }

    keyPressMinute( key )
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'keyPress', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'keyPress', 'read only' ) );
        }

        this.wrapper.find( `.${this.min}` )
            .simulate( 'keyPress', { key } );
        return this;
    }

    blurHour()
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'blur', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'blur', 'read only' ) );
        }

        this.wrapper.find( `.${this.hour}` ).simulate( 'blur' );
        return this;
    }

    blurMinute()
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'blur', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'blur', 'read only' ) );
        }

        this.wrapper.find( `.${this.min}` ).simulate( 'blur' );
        return this;
    }

    focusHour()
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'focus', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'focus', 'read only' ) );
        }

        this.wrapper.find( `.${this.hour}` ).simulate( 'focus' );
        return this;
    }

    focusMinute()
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'focus', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'focus', 'read only' ) );
        }

        this.wrapper.find( `.${this.min}` ).simulate( 'focus' );
        return this;
    }

    changeHour( val )
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'change', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'change', 'read only' ) );
        }

        const node = this.wrapper.find( `.${this.hour}` ).getNode();
        node.value = val;

        this.wrapper.find( `.${this.hour}` ).simulate( 'change' );
        return this;
    }

    changeMinute( val )
    {
        if ( this.wrapper.props().mode !== 'default' )
        {
            throw new Error( ERR.NO_INPUT() );
        }

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'change', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TIMEINPUT_ERR( 'change', 'read only' ) );
        }

        const node = this.wrapper.find( `.${this.min}` ).getNode();
        node.value = val;

        this.wrapper.find( `.${this.min}` ).simulate( 'change' );
        return this;
    }
}
