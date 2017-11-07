import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

const ProgressBar = ( { cssMap, className, progressPercentage } ) =>
    <Css cssMap = { cssMap }>
        <div className = { className }>
            { progressPercentage > 0 &&
                <div
                    style = { { width: `${progressPercentage}%` } }
                    className = { cssMap.fill } />
            }
        </div>
    </Css>;

ProgressBar.propTypes =
{
    /**
     *  Current percentage value
     */
    progressPercentage : PropTypes.number
};

ProgressBar.defaultProps =
{
    cssMap             : require( './progressBar.css' ),
    progressPercentage : 0
};

export default ProgressBar;
