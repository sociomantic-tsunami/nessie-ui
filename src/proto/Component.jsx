import React, { Component } from 'react';

export default class NessieComponent extends Component
{
    constructor( props )
    {
        super( props );

        this.state =
        {
            id : props.id ? props.id : `${this.constructor.name}-${
                     Math.floor( ( Math.random() * 9e15 ) + 1e15 )}`
        };
    }

}
