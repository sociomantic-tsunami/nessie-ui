import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

export default class Page extends Component
{
    static propTypes =
    {
        /**
         *  Page content
         */
        children : PropTypes.node,

        /**
         * Page overflow setting
         *
         */
        overflow : PropTypes.oneOf( [
            'auto',
            'hidden',
            'visible',
            'scroll',
            'scrollX',
            'scrollY'
        ] ),
    };

    static defaultProps =
    {
        cssMap : require( './page.css' ),
        scroll : 'auto'
    };

    render()
    {
        const { children,
                cssMap,
                className,
                overflow } = this.props;

        return (
            <Css
                cssMap = { cssMap }
                cssProps = { { overflow } } >
                <div className = { className }>
                    { children }
                </div>
            </Css>
        );
    }
}
