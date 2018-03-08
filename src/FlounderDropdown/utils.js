import styles               from './flounderDropdown.css';

const mapCssToFlounder = ( cssMap = {} ) =>
    /* commented classes are currently unused */
    ( {
        ARROW                 : cssMap.arrow,
        ARROW_INNER           : cssMap.arrowInner,
        DESCRIPTION           : cssMap.description,
        DISABLED              : cssMap.disabled,
        HEADER                : cssMap.header,
        HIDDEN                : cssMap.hidden,
        HIDDEN_IOS            : cssMap.hiddenIos,
        // HOVER                   : cssMap.hover,
        LIST                  : cssMap.list,
        LOADING               : cssMap.loading,
        LOADING_FAILED        : cssMap.loadingFailed,
        MAIN                  : cssMap.main,
        MAIN_WRAPPER          : cssMap.mainWrapper,
        MULTIPLE_TAG_FLOUNDER : cssMap.multipleTag,
        MULTI_TAG_LIST        : cssMap.multiTagList,
        MULTIPLE_SELECT_TAG   : cssMap.multipleSelectTag,
        MULTIPLE_TAG_CLOSE    : cssMap.multipleTagClose,
        NO_RESULTS            : cssMap.noResults,
        OPEN                  : cssMap.open,
        OPTION                : cssMap.option,
        // OPTION_TAG              : cssMap.optionTag,
        OPTIONS_WRAPPER       : cssMap.optionsWrapper,
        PLACEHOLDER           : cssMap.placeholder,
        // PLUG                    : cssMap.plug,
        SECTION               : cssMap.section,
        SELECTED              : cssMap.selected,
        SELECTED_HIDDEN       : cssMap.selectedHidden,
        SELECTED_DISPLAYED    : cssMap.selectedDisplayed,
        SEARCH                : cssMap.search,
        SEARCH_HIDDEN         : cssMap.searchHidden,
        // SELECT_TAG              : cssMap.selectTag
    } );

const mapIconClassesToFlounder = ( data = [], cssMap = {} ) =>
    data.map( datum =>
    {
        if ( typeof datum !== 'object' )
        {
            return datum;
        }

        let extraClass  = datum.extraClass;
        const iconClass = cssMap[ `optionIcon__${datum.icon}` ];

        if ( iconClass )
        {
            extraClass = datum.extraClass ?
                `${datum.extraClass}  ${iconClass}` : iconClass;
        }

        return {
            ...datum,
            data : mapIconClassesToFlounder( datum.data, cssMap ),
            extraClass,
        };
    } );

const addExtraClasses = ( data = [] ) => (
    data.map( datum =>
    {
        if ( typeof datum !== 'object' )
        {
            return datum;
        }

        if ( datum.description )
        {
            const descClass = styles.optionWithDescription;

            const extraClass = datum.extraClass ?
                `${datum.extraClass}  ${descClass}` : descClass;

            return { ...datum, extraClass };
        }

        return { ...datum, data: datum.data && addExtraClasses( datum.data ) };
    } )
);


const stringifyArr = ( arr = [] ) => JSON.stringify( [ ...arr ].sort() );

const stringifyObj = ( obj = {} ) =>
    JSON.stringify( obj, ( key, val ) =>
        ( typeof val === 'function' ? val.toString() : val ) );


export {
    addExtraClasses,
    mapCssToFlounder,
    mapIconClassesToFlounder,
    stringifyArr,
    stringifyObj,
};
