import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import IconButton           from '../IconButton';
import Text                 from '../Text';

export default class Paginator extends Component
{
    static propTypes =
    {
        /**
         *  Page range to show
         */
        shownPages       : PropTypes.arrayOf( PropTypes.number ),
        /**
         *  Currently active page
         */
        currentPage      : PropTypes.number,
        /**
         *  Startpage
         */
        startPage        : PropTypes.number,
        /**
         *  Show “Previous” button
         */
        endPage          : PropTypes.number,
        /**
         *  Show “Next” button
         */
        showNext         : PropTypes.bool,
        /**
         *  Show “Previous” button
         */
        showPrev         : PropTypes.bool,
        /**
         *  “Next” button text
         */
        nextLabel        : PropTypes.string,
        /**
         *  “Previous” button text
         */
        prevLabel        : PropTypes.string,
        /**
         *  Display ellipsis after first page
         */
        showPrevEllipsis : PropTypes.bool,
        /**
         *  Display ellipsis before last page
         */
        showNextEllipsis : PropTypes.bool,
        /**
         *  Ellipsis text to display
         */
        ellipsisText     : PropTypes.string,
        /**
         *  Function to call on page button click: ( e ) => { ... }
         */
        onClickPage      : PropTypes.func,
        /**
         *  Function to call on “Previous” button click: ( e ) => { ... }
         */
        onClickPrev      : PropTypes.func,
        /**
         *  Function to call on “Next” button click: ( e ) => { ... }
         */
        onClickNext      : PropTypes.func
    };


    static defaultProps =
    {
        showNext         : false,
        showPrev         : false,
        nextLabel        : 'Next',
        prevLabel        : 'Previous',
        showPrevEllipsis : true,
        showNextEllipsis : true,
        ellipsisText     : '…',
        cssMap           : require( './paginator.css' )
    };

    render()
    {
        const { className,
                cssMap,
                currentPage,
                ellipsisText,
                endPage,
                nextLabel,
                onClickNext,
                onClickPage,
                onClickPrev,
                prevLabel,
                startPage,
                showPrevEllipsis,
                showNextEllipsis,
                showNext,
                shownPages = [], showPrev } = this.props;


        const pageButtons = shownPages.map( ( pageNum ) =>
        (
            <button
                className = { cssMap.pageButton }
                disabled  = { pageNum === currentPage }
                key       = { pageNum }
                onClick   = { onClickPage }
                type      = "button"
                value     = { String( pageNum ) }>
                { String( pageNum ) }
            </button>
            ) );

        const showStartPage = typeof startPage === 'number';
        const showEndPage   = typeof endPage   === 'number';

        const ellipsis = (
            <div className = { cssMap.ellipsis }>
                { ellipsisText }
            </div>
        );

        return (
            <Css cssMap = { cssMap }>
                <div
                    className  = { className }
                    role       = "navigation"
                    aria-label = "Pagination">
                    { showPrev &&
                        <IconButton
                            className   = { cssMap.arrows }
                            iconTheme   = "navigation"
                            iconSize    = "S"
                            iconType    = "left"
                            onClick     = { onClickPrev }>
                            { prevLabel }
                        </IconButton>
                    }

                    { showStartPage &&
                        <button
                            className   = { cssMap.pageButton }
                            disabled    = { currentPage === startPage }
                            onClick     = { onClickPage }
                            type        = "button"
                            value       = { String( startPage ) }>
                            <Text
                                role = { null }>
                                { startPage }
                            </Text>
                        </button>

                    }

                    { showStartPage && showPrevEllipsis && ellipsis }

                    { pageButtons && pageButtons.length > 0 &&
                        <div className = { cssMap.pageButtons }>
                            <Text>{ pageButtons }</Text>
                        </div>
                    }

                    { showEndPage && showNextEllipsis && ellipsis }

                    { showEndPage &&
                        <button
                            className   = { cssMap.pageButton }
                            disabled    = { currentPage === endPage }
                            onClick     = { onClickPage }
                            type        = "button"
                            value       = { String( endPage ) }>
                            <Text
                                role = { null }>
                                { endPage }
                            </Text>
                        </button>
                    }

                    { showNext &&
                        <IconButton
                            className   = { cssMap.arrows }
                            iconTheme   = "navigation"
                            iconSize    = "S"
                            iconType    = "right"
                            onClick     = { onClickNext }>
                            { nextLabel }
                        </IconButton>
                    }
                </div>
            </Css>
        );
    }
}
