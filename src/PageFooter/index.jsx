import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

export default class PageFooter extends Component
{
    static propTypes =
    {
        /**
         *  PageFooter content
         */
        children : PropTypes.node
    };

    static defaultProps =
    {
        cssMap : require( './pageFooter.css' )
    };

    render()
    {
        const { children,
                cssMap,
                className } = this.props;

        return (
            <Css cssMap = { cssMap }>
                <footer className = { className }>
                    <div className = { cssMap.content }>
                        { children }
                    </div>
                </footer>
            </Css>
        );
    }
}
