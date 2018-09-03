/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                          from 'react';
import PropTypes                      from 'prop-types';

import { generateId, buildClassName } from '../utils';
import TabButton                      from '../TabButton';


export default class Tabs extends React.Component
{
    static propTypes =
    {
        /**
         *  The active tab index
         */
        activeTabIndex    : PropTypes.number,
        /**
         *  A set of <Tab> components
         */
        children          : PropTypes.node,
        /**
         * HTML id attribute
         */
        id                : PropTypes.string,
        /**
         *  onChange callback function: ( e, newProps ) => { ... }
         */
        onChange          : PropTypes.func,
        /**
         *  Secondary Control in Tabs Header
         */
        secondaryControls : PropTypes.node,
    };


    static defaultProps =
    {
        activeTabIndex    : 0,
        cssMap            : require( './tabs.css' ),
        id                : undefined,
        secondaryControls : undefined,
    };

    constructor( props )
    {
        super( props );

        this.handleChange = this.handleChange.bind( this );
    }


    handleChange( e )
    {
        const { onChange } = this.props;

        if ( onChange )
        {
            const newProps = e.currentTarget ?
                { activeTabIndex: parseInt( e.currentTarget.value, 10 ) } : {};
            onChange( e, newProps );
        }
    }

    renderHeader( tabs = [] )
    {
        let tabsArray = tabs;

        if ( !Array.isArray( tabs ) )
        {
            tabsArray = [ tabs ];
        }

        const { activeTabIndex } = this.props;

        return tabsArray.map( ( child, index ) =>
        {
            const { isDisabled, label } = child.props;

            const isActive = ( activeTabIndex === index );

            return (
                <TabButton
                    tabIndex   = { index }
                    key        = { index } // eslint-disable-line react/no-array-index-key, max-len
                    label      = { label }
                    isActive   = { isActive }
                    isDisabled = { isDisabled || isActive }
                    onClick    = { this.handleChange } />
            );
        } );
    }


    render()
    {
        const {
            activeTabIndex,
            className,
            children,
            cssMap,
            id = generateId( 'Tabs' ),
            secondaryControls,
        } = this.props;

        const tabButtons = this.renderHeader( children );

        const content = Array.isArray( children ) ?
            children[ activeTabIndex ] : children;

        return (
            <div
                className = { buildClassName( className, cssMap ) }
                id = { id } >
                <div className = { cssMap.header }>
                    <div className = { cssMap.tabs }>
                        { tabButtons }
                    </div>
                    { secondaryControls &&
                        <div className = { cssMap.secondaryControls }>
                            { secondaryControls }
                        </div>
                    }
                </div>
                <div className = { cssMap.content }>
                    { content }
                </div>
            </div>
        );
    }
}
