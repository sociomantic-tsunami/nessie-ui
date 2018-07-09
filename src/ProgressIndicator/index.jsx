import React                from 'react';
import PropTypes            from 'prop-types';

                  

const ProgressIndicator = ( {
    cssMap,
    className,
    currentPercentage,
    showPercentage } ) =>

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
        </Css>;

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
