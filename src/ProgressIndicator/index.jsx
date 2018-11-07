import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';


const ProgressIndicator = ( {
    cssMap,
    className,
    currentPercentage,
    showPercentage
} ) =>


    <div className = { buildClassName( className, cssMap ) }>
        <div className = { cssMap.spinner }>
            { showPercentage &&
            <div className = { cssMap.percentageContainer }>
                <span className = { cssMap.percentage } >
                    { currentPercentage }%
                </span>
            </div>
            }
        </div>
    </div>;

ProgressIndicator.propTypes =
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

ProgressIndicator.defaultProps =
{
    cssMap         : require( './progressIndicator.css' ),
    showPercentage : true
};

export default ProgressIndicator;
