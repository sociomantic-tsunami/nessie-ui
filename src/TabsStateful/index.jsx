/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React        from 'react';
import PropTypes    from 'prop-types';

import { Tabs }     from '../index';

export default class TabsStateful extends React.Component
{
    static propTypes =
    {
        /**
         *  A set of <Tab> components
         */
        children          : PropTypes.node,
        /**
         *  Extra CSS class name
         */
        className         : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap            : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Tab button click callback function: ( e, newProps ) => { ... }
         */
        onClickTab        : PropTypes.func,
        /**
         *  Secondary controls to add to tabs header
         */
        secondaryControls : PropTypes.node,
    };

    static defaultProps =
    {
        children          : undefined,
        className         : undefined,
        onClickTab        : undefined,
        secondaryControls : undefined,
    };

    constructor()
    {
        super();

        this.state = {
            activeTabIndex : 0,
        };

        this.handleClickTab = this.handleClickTab.bind( this );
    }

    handleClickTab( e, { activeTabIndex } )
    {
        const callback = this.props.onClickTab;

        if ( callback )
        {
            callback( e );
        }

        this.setState( { activeTabIndex } );
    }

    render()
    {
        const { props } = this;

        return (
            <Tabs
                { ...props }
                activeTabIndex = { this.state.activeTabIndex }
                onClickTab     = { this.handleClickTab }
            />
        );
    }
}
