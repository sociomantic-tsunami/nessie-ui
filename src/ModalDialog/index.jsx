import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import IconButton           from '../IconButton';

export default class ModalDialog extends Component
{
    static propTypes =
    {
        /**
         *  Dialog Content
         */
        children : PropTypes.node,
        /**
         *  Message type
         */
        type     : PropTypes.oneOf( [
            'default',
            'neutral',
            'crucial',
            'promoted',
            'carousel'
        ] ),
        /**
         *  Display the dialog
         */
        isVisible      : PropTypes.bool,
        /**
         *  Display a wider dialog (doesn’t apply to carousel)
         */
        isWide         : PropTypes.bool,
        /**
         *  Title displayed on carousel modal
         */
        title          : PropTypes.string,
        /**
         *  Show navigation buttons (only applies to carousel)
         */
        hasNavigation  : PropTypes.bool,
        /**
         *  Overlay onClick callback function
         */
        onClickOverlay : PropTypes.func,
        /**
         *  Function to call on “Previous” button click: ( e ) => { ... }
         */
        onClickPrev    : PropTypes.func,
        /**
         *  Function to call on “Next” button click: ( e ) => { ... }
         */
        onClickNext    : PropTypes.func,
        /**
         *  Function to call on “Close” button click: ( e ) => { ... }
         */
        onClickClose   : PropTypes.func,
    };

    static defaultProps =
    {
        type          : 'default',
        isVisible     : false,
        hasNavigation : true,
        cssMap        : require( './modalDialog.css' )
    };

    render()
    {
        const { children, className, cssMap, hasNavigation, isVisible, isWide,
            onClickOverlay, type, title, onClickPrev, onClickNext,
            onClickClose } = this.props;

        if ( !isVisible )
        {
            return <div className = "modalContainer" />;
        }

        const isCarousel = type === 'carousel';
        let modalUI      = null;

        if ( isCarousel )
        {
            modalUI = (
                <div className = "modalContainer">
                    <div className = { cssMap.header }>
                        <span className = { cssMap.title }>{ title }</span>
                        <IconButton
                            iconType     = "close"
                            onClickClose = { onClickClose }
                            iconTheme    = "navigation"
                            iconSize     = "L"
                        />
                    </div>
                    <div className = { cssMap.navigation }>
                        <IconButton
                            iconType  = "left"
                            onClick   = { onClickPrev }
                            iconTheme = "navigation"
                            iconSize  = "XXL"
                        />

                        <IconButton
                            iconType  = "right"
                            onClick   = { onClickNext }
                            iconTheme = "navigation"
                            iconSize  = "XXL"
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className = "modalContainer">
                <Css
                    cssMap = { cssMap }
                    cssProps = { {
                        type,
                        wide    : isWide,
                        showNav : hasNavigation
                    } }
                >
                    <div
                        className = { className }
                        onClick   = { onClickOverlay }
                    >
                        { modalUI }
                        <div className = { cssMap.content }>
                            { children }
                        </div>
                    </div>
                </Css>
            </div>
        );
    }
}
