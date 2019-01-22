/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                    from 'react';
import PropTypes                from 'prop-types';

import { ScrollBox, TabButton } from '..';

import ThemeContext             from '../Theming/ThemeContext';
import { createCssMap }         from '../Theming';


export default class Tabs extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  The active tab index
         */
        activeTabIndex : PropTypes.number,
        /**
         *  A set of <Tab> components
         */
        children       : PropTypes.node,
        /**
         *  Extra CSS class name
         */
        className      : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap         : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Tab button click callback function: ( e, newProps ) => { ... }
         */
        onClickTab     : PropTypes.func,
        /**
        *   Tab padding
        */
        padding        : PropTypes.oneOfType( [
            PropTypes.oneOf( [ 'none', 'S', 'M', 'L', 'XL', 'XXL' ] ),
            PropTypes.arrayOf( PropTypes.oneOf( [
                'none',
                'S',
                'M',
                'L',
                'XL',
                'XXL',
            ] ) ),
        ] ),
        /**
         *  Secondary controls to add to tabs header
         */
        secondaryControls : PropTypes.node,
    };

    static defaultProps =
    {
        activeTabIndex    : undefined,
        children          : undefined,
        className         : undefined,
        cssMap            : undefined,
        onClickTab        : undefined,
        padding           : [ 'none', 'M' ],
        secondaryControls : undefined,
    };

    static displayName = 'Tabs';


    constructor()
    {
        super();

        this.state = { activeTabIndex: 0 };
        this.handleClickTab = this.handleClickTab.bind( this );
    }

    handleClickTab( { value : tabIndex }, e )
    {
        const { onClickTab } = this.props;
        if ( onClickTab )
        {
            onClickTab( { tabIndex }, e );
        }

        this.setState( { activeTabIndex: tabIndex } );
    }

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.Tabs, this.props ),
            secondaryControls,
        } = this.props;

        const activeTabIndex =
            this.props.activeTabIndex || this.state.activeTabIndex;

        const tabs = React.Children.toArray( children );

        const tabButtons = tabs.map( ( tab, tabIndex ) =>
        {
            const { isDisabled, label } = tab.props;
            const isActive = ( activeTabIndex === tabIndex );

            return (
                <TabButton
                    isActive   = { isActive }
                    isDisabled = { isDisabled || isActive }
                    key        = { label || tabIndex }
                    label      = { label }
                    onClick    = { this.handleClickTab }
                    tabIndex   = { tabIndex }
                    value      = { tabIndex } />
            );
        } );

        return (
            <div className = { cssMap.main }>
                <div className = { cssMap.header }>
                    <ScrollBox
                        className = { cssMap.tabsContainer }
                        scroll    = "horizontal">
                        <div className = { cssMap.tabs }>
                            { tabButtons }
                        </div>
                    </ScrollBox>
                    { secondaryControls &&
                        <div className = { cssMap.secondaryControls }>
                            { secondaryControls }
                        </div>
                    }
                </div>
                <div className = { cssMap.content }>
                    { tabs[ activeTabIndex ] }
                </div>
            </div>
        );
    }
}
