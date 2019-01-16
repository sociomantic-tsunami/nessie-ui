/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

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
    id             : undefined,
    spriteTemplate : undefined,
};

SpriteMap.displayName = 'SpriteMap';

export default SpriteMap;
