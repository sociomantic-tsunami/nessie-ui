import React          from 'react';
import PropTypes      from 'prop-types';

import spriteHtml     from '../Icon/sprite.html';
import { generateId } from '../utils';


const SpriteMap = ( {
    id = generateId( 'SpriteMap' ),
    spriteTemplate = { __html: spriteHtml },
} ) => (
    <div id = { id } dangerouslySetInnerHTML = { spriteTemplate } />
);

SpriteMap.propTypes =
{
    /**
     * HTML id attribute
     */
    id             : PropTypes.string,
    /**
     * Custom SVG sprite
     */
    spriteTemplate : PropTypes.shape( { __html: PropTypes.string } ),
};

SpriteMap.defaultProps =
{
    id : undefined,
};

export default SpriteMap;
