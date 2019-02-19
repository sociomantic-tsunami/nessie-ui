/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React            from 'react';
import PropTypes        from 'prop-types';

import { useTheme }     from '../Theming';

const componentName = 'ProgressBar';

const ProgressBar = ( props ) =>
{
    const { percentage } = props;

    const cssMap = useTheme( componentName, props );

    return (
        <div className = { cssMap.default }>
            { percentage > 0 &&
            <div
                style = { { width: `${percentage}%` } }
                className = { cssMap.fill } />
            }
        </div>
    );
};

ProgressBar.propTypes =
{
    /**
     *  Current percentage value
     */
    percentage : PropTypes.number,
};

ProgressBar.defaultProps =
{
    percentage : 0,
};

export default ProgressBar;
