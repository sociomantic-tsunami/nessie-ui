import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

export default class ProgressIndicator extends Component
{
    static propTypes =
    {
        /**
         *  Show percentage
         */
        showPercentage    : PropTypes.bool,
        /**
         *  Current percentage value
         */
        currentPercentage : PropTypes.number
    };

    static defaultProps =
    {
        cssMap         : require( './progressIndicator.css' ),
        showPercentage : true
    };

    render()
    {
        const { cssMap,
                className,
                currentPercentage,
                showPercentage } = this.props;


        return (
            <Css cssMap   = { cssMap }>
                <div className = { className }>
                    <div className = { cssMap.spinner }>
                        { showPercentage &&
                            <div className = { cssMap.percentageContainer }>
                                <span className = { cssMap.percentage } >
                                    { currentPercentage }%
                                </span>
                            </div>
                        }
                    </div>
                </div>
            </Css>
        );
    }
}
