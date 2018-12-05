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

const PageFooter = ( {
    children,
    cssMap,
    className,
} ) =>

    <footer className = { buildClassName( className, cssMap ) }>
        <div className = { cssMap.content }>
            { children }
        </div>
    </footer>;

PageFooter.propTypes =
{
    /**
     *  PageFooter content
     */
    children : PropTypes.node,
};

PageFooter.defaultProps =
{
    cssMap : require( './pageFooter.css' ),
};

export default PageFooter;
