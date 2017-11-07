import React                 from 'react';
import PropTypes             from 'prop-types';

import Css                   from '../hoc/Css';

const H1 = ( { cssMap, className, children, title, role } ) =>
    <Css
        cssMap   = { cssMap }
        cssProps = { { role } }>
        <h1 className = { className }>
            { children || title }
        </h1>
    </Css>;

H1.propTypes =
{
    /**
    *  Title text
    */
    title : PropTypes.string,
    /**
    *  Role (style) to apply to heading
    */
    role  : PropTypes.oneOf( [
        'default',
        'subtle',
        'promoted',
        'critical'
    ] )
};

H1.defaultProps =
{
    role   : 'default',
    cssMap : require( './h1.css' )
};

export default H1;
