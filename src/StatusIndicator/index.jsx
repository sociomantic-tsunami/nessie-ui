import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';

const StatusIndicator = ( {
    children, className, cssMap, label, status,
} ) =>

    <div className = { buildClassName( className, cssMap, { status } ) }>
        { children || label }
    </div>;

StatusIndicator.propTypes =
{
    /**
    *  Status text
    */
    label  : PropTypes.string,
    /**
     *  Display as active/deactivated
     */
    status : PropTypes.oneOf( [ 'active', 'deactivated', 'alert' ] ),
};

StatusIndicator.defaultProps =
{
    status : 'deactivated',
    cssMap : require( './statusIndicator.css' ),
};

export default StatusIndicator;
