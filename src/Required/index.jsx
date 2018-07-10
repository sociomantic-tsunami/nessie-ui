import React        from 'react';
import PropTypes    from 'prop-types';

import Css          from '../hoc/Css';

const Required = ( {
    children,
    className,
    cssMap,
    isRequired,
    text } ) =>
{
    if ( !Required.didWarn )
    {
        console.warn( 'Required: This component is deprecated and will be \
removed in the next major release.' );
        Required.didWarn = true;
    }

    return (
        <Css
            cssMap   = { cssMap }
            cssProps = { { required: isRequired } }>
            <span className = { className }>
                { children || text }
            </span>
        </Css>
    );
}
Required.propTypes =
{
    /**
    *  Text to show
    */
    text       : PropTypes.string,
    /**
    *  Show as required
    */
    isRequired : PropTypes.bool
};

Required.defaultProps =
{
    isRequired : true,
    cssMap     : require( './required.css' )
};

export default Required;
