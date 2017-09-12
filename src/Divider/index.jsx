import React, { Component } from 'react';

import Css                  from '../hoc/Css';

export default class Divider extends Component
{
    static defaultProps =
    {
        cssMap : require( './divider.css' )
    };

    render()
    {
        const { cssMap, className } = this.props;

        return (
            <Css cssMap = { cssMap }>
                <hr className = { className } />
            </Css>
        );
    }
}
