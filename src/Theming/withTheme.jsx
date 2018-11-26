/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';

import ThemeContext         from './ThemeContext';
import { buildDisplayName } from '../utils';

/* interpolates component’s props into the theme */
const evalTheme = ( theme = {}, props = {} ) =>
    Object.entries( theme ).reduce(
        ( result,  [ key, value ] ) =>
        {
            result[ key ] = typeof value === 'function' ?
                value( props ) : value;
            return result;
        },
        {},
    );

/* creates a new component with theme applied to it */
const withTheme = Component =>
{
    const ComponentWithTheme = props =>
        <ThemeContext.Consumer>
            { ( theme = {} ) =>
            {
                const cssMap =
                    evalTheme( theme[ Component.displayName ], props );

                return <Component cssMap = { cssMap } { ...props } />;
            }
            }
        </ThemeContext.Consumer>;

    ComponentWithTheme.displayName =
        buildDisplayName( ComponentWithTheme, Component );

    ComponentWithTheme.propTypes = Component.propTypes;
    ComponentWithTheme.defaultProps = Component.defaultProps;

    return ComponentWithTheme;
};

export { evalTheme };
export default withTheme;
