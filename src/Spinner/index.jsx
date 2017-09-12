import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

export default class Spinner extends Component
{
    static propTypes =
    {
        /**
         *  Size of the Spinner
         */
        size : PropTypes.oneOf( [ 'small',
            'big'
        ] )
    };

    static defaultProps =
    {
        cssMap : require( './spinner.css' ),
        size   : 'small'
    };

    render()
    {
        const { cssMap, className, size } = this.props;

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { { size } }>
                <div className = { className } />
            </Css>
        );
    }
}
