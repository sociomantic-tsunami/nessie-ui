import React                from 'react';
import PropTypes            from 'prop-types';

                  

const Spinner = ( { cssMap, className, size } ) =>
    <Css
        cssMap   = { cssMap }
        cssProps = { { size } }>
        <div className = { className } />
    </Css>;

Spinner.propTypes =
{
    /**
     *  Size of the Spinner
     */
    size : PropTypes.oneOf( [ 'small',
        'big'
    ] )
};

Spinner.defaultProps =
{
    cssMap : require( './spinner.css' ),
    size   : 'small'
};

export default Spinner;
