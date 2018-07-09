import React                from 'react';
import PropTypes            from 'prop-types';

                  

const StatusIndicator = ( { children, className, cssMap, label, status } ) =>
    <Css
        cssMap = { cssMap }
        cssProps = { { status } }>
        <div className = { className }>
            { children || label }
        </div>
    </Css>;

StatusIndicator.propTypes =
{
    /**
    *  Status text
    */
    label  : PropTypes.string,
    /**
     *  Display as active/deactivated
     */
    status : PropTypes.oneOf( [ 'active', 'deactivated', 'alert' ] )
};

StatusIndicator.defaultProps =
{
    status : 'deactivated',
    cssMap : require( './statusIndicator.css' )
};

export default StatusIndicator;
