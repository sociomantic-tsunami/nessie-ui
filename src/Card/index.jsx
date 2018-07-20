import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';
import styles               from './card.css';

const Card = ( {
    cssMap,
    className,
    children,
    padding
} ) => (
    <div
        className = { buildClassName( className, cssMap, {
            paddingX : typeof padding === 'string' ? padding : padding[ 0 ],
            paddingY : typeof padding === 'string' ? padding : padding[ 1 ]
        } ) }>
        { children }
    </div>
);

Card.propTypes =
{
    /**
     *  Module content
     */
    children : PropTypes.node,
    /**
     *  CSS class map
     */
    cssMap   : PropTypes.objectOf( PropTypes.string ),
    /**
    *   Card padding
    */
    padding  : PropTypes.oneOfType( [
        PropTypes.oneOf( [ 'none', 'S', 'M', 'L', 'XL', 'XXL' ] ),
        PropTypes.arrayOf( PropTypes.oneOf( [
            'none',
            'S',
            'M',
            'L',
            'XL',
            'XXL'
        ] ) )
    ] ),
};

Card.defaultProps =
{
    cssMap  : styles,
    padding : 'none'
};

export default Card;
