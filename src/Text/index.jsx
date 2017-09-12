import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

export default class Text extends Component
{
    static propTypes =
    {
        /**
        *  Don’t wrap text to the next line
        */
        noWrap           : PropTypes.bool,
        /**
         *  Clip overflow
         */
        overflowIsHidden : PropTypes.bool,
        /**
        *  Role (style) to apply to text
        */
        role             : PropTypes.oneOf( [
            'default',
            'subtle',
            'promoted',
            'critical'
        ] ),
        /**
        *  Text string
        */
        text : PropTypes.string
    };

    static defaultProps =
    {
        noWrap           : false,
        overflowIsHidden : false,
        role             : 'default',
        cssMap           : require( './text.css' )
    };

    render()
    {
        const {
            cssMap,
            className,
            children,
            noWrap,
            overflowIsHidden,
            role,
            text
        } = this.props;

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { {
                    role,
                    overflowHidden : overflowIsHidden,
                    noWrap
                } }>
                <div className = { className }>
                    { children || text }
                </div>
            </Css>
        );
    }
}
