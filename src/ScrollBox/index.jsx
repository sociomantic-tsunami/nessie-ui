import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

export default class ScrollBox extends Component
{
    static propTypes =
    {
        /**
         *  ScrollBox content
         */
        children : PropTypes.node,
        /**
         *  ScrollBox height, specified in rem units
         */
        height   : PropTypes.number,
        /**
         *  Scroll direction
         */
        scroll   : PropTypes.oneOf( [ 'horizontal', 'vertical', 'both' ] )

    };

    static defaultProps =
    {
        scroll : 'both',
        cssMap : require( './scrollBox.css' )
    };

    render()
    {
        const { cssMap, children, height, scroll } = this.props;

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { { scroll } }>
                <div style = { { maxHeight: height ? `${height}rem` : null } }>
                    { children }
                </div>
            </Css>
        );
    }
}
