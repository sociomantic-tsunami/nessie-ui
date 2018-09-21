/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';
import H1                   from '../H1';

const PageContentHeader = ( {
    children,
    cssMap,
    className,
    title
} ) =>
{
    let header = <H1 className = { buildClassName( className, cssMap, { header: !!children } ) }>{ title }</H1>;

    if ( children )
    {
        header = (
            <header className = { buildClassName( className, cssMap, { header: !!children } ) }>
                { children }
            </header>
        );
    }

    return header;
};

PageContentHeader.propTypes =
{
    /**
     *  Page content header text (h1)
     */
    title    : PropTypes.string,
    /**
     *  Page content header custom content; overrides title
     */
    children : PropTypes.node
};

PageContentHeader.defaultProps =
{
    cssMap : require( './pageContentHeader.css' )
};

export default PageContentHeader;
