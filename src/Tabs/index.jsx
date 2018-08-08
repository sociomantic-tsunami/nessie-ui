import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import styles             from './tabs.css';
import TabButton          from '../TabButton';


const Tabs = ( {
    activeTabIndex,
    children,
    className,
    cssMap,
    onChange,
    onClickTab,
    secondaryControls,
} ) =>
{
    if ( !Tabs.didWarn && onChange )
    {
        console.warn( 'Tabs: ‘onChange’ prop is deprecated and will be removed \
in the next major release. Please use ‘onClickTab’ instead.' );
        Tabs.didWarn = true;
    }

    const clickHandler = onClickTab || onChange;

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
                onClick    = { e => clickHandler && clickHandler( e,
                    { activeTabIndex: tabIndex } ) }
                tabIndex = { tabIndex } />
        );
    } );

    return (
        <div className = { buildClassName( className, cssMap ) }>
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
                { tabs[ activeTabIndex ] }
            </div>
        </div>
    );
};

Tabs.propTypes =
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

Tabs.defaultProps =
{
    activeTabIndex    : 0,
    children          : undefined,
    className         : undefined,
    cssMap            : styles,
    onClickTab        : undefined,
    secondaryControls : undefined,
};

export default Tabs;
