import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

export default class ProgressBar extends Component
{
    static propTypes =
    {
        /**
         *  Current percentage value
         */
        progressPercentage : PropTypes.number
    };

    static defaultProps =
    {
        cssMap             : require( './progressBar.css' ),
        progressPercentage : 0
    };

    render()
    {
        const { cssMap,
                className,
                progressPercentage } = this.props;

        return (
            <Css cssMap = { cssMap }>
                <div className = { className }>
                    { progressPercentage > 0 &&
                        <div
                            style = { { width: `${progressPercentage}%` } }
                            className = { cssMap.fill } />
                    }
                </div>
            </Css>
        );
    }
}
