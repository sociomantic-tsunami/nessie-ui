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

const PageHeader = ( { children, cssMap, className } ) =>

    <header className = { buildClassName( className, cssMap ) }>
        { children }
    </header>;

PageHeader.propTypes =
{
    /**
     *  PageHeader content
     */
    children : PropTypes.node,
};

PageHeader.defaultProps =
{
    cssMap : require( './pageHeader.css' ),
};

export default PageHeader;
