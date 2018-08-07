import React                           from 'react';
import PropTypes                       from 'prop-types';

import { buildClassName }              from '../utils';
import styles                          from './statusIndicator.css';

const deprecatedStatusOptions = [ 'active', 'deactivated' ];


const StatusIndicator = ( { children, className, cssMap, label, status } ) =>
{
    if ( deprecatedStatusOptions.includes( status ) &&
        !StatusIndicator.didWarn[ status ] )
    {
        console.warn( `StatusIndicator status option '${status}' is deprecated.\
        Please use one of 'alert, 'critical' or promoted' instead.` );
        StatusIndicator.didWarn[ status ] = true;
    }

    return (
        <div className = { buildClassName( className, cssMap, { status } ) }>
            { children || label }
        </div>
    );
};

StatusIndicator.propTypes =
{
    /**
     *  Status text (JSX node; overrides label prop)
     */
    children : PropTypes.node,
    /**
     *  CSS class map
     */
    cssMap   : PropTypes.objectOf( PropTypes.string ),
    /**
    *  Status text
    */
    label    : PropTypes.string,
    /**
     *  Display as active/deactivated
     */
    status   : PropTypes.oneOf( [
        'alert', 'critical', 'promoted' ] ),
};

StatusIndicator.defaultProps =
{
    children : undefined,
    cssMap   : styles,
    label    : undefined,
    status   : 'promoted',
};

StatusIndicator.didWarn = {};

export default StatusIndicator;
