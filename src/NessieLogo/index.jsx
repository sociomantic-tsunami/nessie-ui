import React, { Component } from 'react';

import Css                  from '../hoc/Css';

export default class NessieLogo extends Component
{
    static propTypes = {};

    static defaultProps =
    {
        cssMap : require( './nessieLogo.css' )
    };

    render()
    {
        const { cssMap, className } = this.props;

        return (
            <Css cssMap = { cssMap }>
                <img
                    alt       = ""
                    className = { className }
                    src       = "images/nessie.svg" />
            </Css>
        );
    }
}
