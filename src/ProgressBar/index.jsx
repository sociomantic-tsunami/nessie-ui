import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';

const ProgressBar = ( { cssMap, className, progressPercentage } ) =>
    <div className = { buildClassName( className, cssMap ) }>
        { progressPercentage > 0 &&
        <div
            style = { { width: `${progressPercentage}%` } }
            className = { cssMap.fill } />
        }
    </div>;

ProgressBar.propTypes =
{
    /**
     *  Current percentage value
     */
    progressPercentage : PropTypes.number,
};

ProgressBar.defaultProps =
{
    cssMap             : require( './progressBar.css' ),
    progressPercentage : 0,
};

export default ProgressBar;
