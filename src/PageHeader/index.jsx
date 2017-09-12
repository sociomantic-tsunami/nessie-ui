import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

export default class PageHeader extends Component
{
    static propTypes =
    {
        /**
         *  PageHeader content
         */
        children : PropTypes.node
    };

    static defaultProps =
    {
        cssMap : require( './pageHeader.css' )
    };

    render()
    {
        const { children,
                cssMap,
                className } = this.props;

        return (
            <Css cssMap = { cssMap }>
                <header className = { className }>
                    <div className = { cssMap.content }>
                        { children }
                    </div>
                </header>
            </Css>
        );
    }
}
