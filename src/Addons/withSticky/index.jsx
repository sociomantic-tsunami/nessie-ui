/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import { buildDisplayName } from '../../utils';
import ThemeContext         from '../../Theming/ThemeContext';
import { createCssMap }     from '../../Theming';


const withSticky = Component =>
{
    class StickyComponent extends React.Component
    {
        static contextType = ThemeContext;

        static propTypes = {
            ...Component.propTypes,
            /**
             *  Makes the component sticky
             */
            isSticky : PropTypes.bool,
            /**
            *  Sticky component position
            */
            position : PropTypes.oneOf( [ 'left', 'right', 'top', 'bottom' ] ),
        };

        static defaultProps = {
            ...Component.defaultProps,
            isSticky       : false,
            stickyPosition : 'top',
        };

        render()
        {
            const {
                cssMap = createCssMap( this.context.withSticky, this.props ),
                isSticky,
                stickyPosition,
                ...componentProps
            } = this.props;

            return (
                <Component { ...componentProps } className = { cssMap.main } />
            );
        }
    }

    StickyComponent.displayName =
        buildDisplayName( StickyComponent, Component );

    return StickyComponent;
};

export default withSticky;
