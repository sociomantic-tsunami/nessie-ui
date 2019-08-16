/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import cx from "classnames/bind";

import buttonClasses from "./Button/button.css";
import cardClasses from "./Card/card.css";
import checkboxClasses from "./Checkbox/checkbox.css";
import comboBoxClasses from "./ComboBox/comboBox.css";
import datePickerClasses from "./DatePicker/datePicker.css";
import datePickerHeaderClasses from "./DatePicker/datePickerHeader.css";
import datePickerItemClasses from "./DatePicker/datePickerItem.css";
import gridClasses from "./Grid/grid.css";
import iconButtonClasses from "./IconButton/iconButton.css";
import iconClasses from "./Icon/icon.css";
import listBoxClasses from "./ListBox/listBox.css";
import listBoxOptionClasses from "./ListBox/listBoxOption.css";
import listBoxOptionGroupClasses from "./ListBox/listBoxOptionGroup.css";
import modalClasses from "./Modal/modal.css";
import popupClasses from "./Popup/popup.css";
import progressBarClasses from "./ProgressBar/progressBar.css";
import radioClasses from "./Radio/radio.css";
import scrollBarClasses from "./ScrollBar/scrollBar.css";
import scrollBoxClasses from "./ScrollBox/scrollBox.css";
import spinnerClasses from "./Spinner/spinner.css";
import switchClasses from "./Switch/switch.css";
import tabButtonClasses from "./TabButton/tabButton.css";
import tabClasses from "./Tab/tab.css";
import tabsClasses from "./Tabs/tabs.css";
import tagClasses from "./Tag/tag.css";
import tagInputClasses from "./TagInput/tagInput.css";
import textClasses from "./Text/text.css";
import textAreaClasses from "./TextArea/textArea.css";
import textInputClasses from "./TextInput/textInput.css";
import textInputWithIconClasses from "./TextInputWithIcon/textInputWithIcon.css";
import timeInputClasses from "./DatePicker/timeInput.css";
import tooltipClasses from "./Tooltip/tooltip.css";
import unitInputClasses from "./UnitInput/unitInput.css";

import { icons } from "feather-icons";

const classNames = {
  Button: props => ({
    main: cx.bind(buttonClasses)(
      "default",
      {
        disabled: props.isDisabled,
        loading: props.isLoading && !props.isDisabled
      },
      `iconPosition__${props.iconPosition}`,
      `role__${props.role}`,
      props.className
    ),
    ...buttonClasses
  }),
  Card: props => ({
    main: cx.bind(cardClasses)(
      "default",
      `paddingX__${
        Array.isArray(props.padding) ? props.padding[0] : props.padding
      }`,
      `paddingY__${
        Array.isArray(props.padding) ? props.padding[1] : props.padding
      }`,
      props.className
    ),
    ...cardClasses
  }),
  Checkbox: props => ({
    main: cx.bind(checkboxClasses)(
      "default",
      {
        disabled: props.isDisabled,
        error: !props.isDisabled && props.hasError
      },
      props.className
    ),
    ...checkboxClasses
  }),
  ComboBox: props => ({
    main: cx.bind(comboBoxClasses)(
      "default",
      {
        disabled: !props.isMultiselect && props.isDisabled,
        error: props.hasError
      },
      props.className
    ),
    ...comboBoxClasses
  }),
  DatePicker: {
    main: cx.bind(datePickerClasses)("default"),
    ...datePickerClasses
  },
  DatePickerHeader: {
    main: cx.bind(datePickerHeaderClasses)("default"),
    ...datePickerHeaderClasses
  },
  DatePickerItem: props => ({
    main: cx.bind(datePickerItemClasses)(
      "default",
      {
        disabled: props.isDisabled,
        selected: props.isSelected,
        selectedWeek: props.isSelectedWeek
      },
      `type__${props.type}`,
      props.className
    ),
    ...datePickerItemClasses
  }),
  Grid: props => ({
    main: cx.bind(gridClasses)("default", props.className),
    ...gridClasses
  }),
  Icon: props => ({
    main: cx.bind(iconClasses)(
      "default",
      `role__${props.role}`,
      `size__${props.size}`,
      props.className
    ),
    ...iconClasses
  }),
  IconButton: props => ({
    main: cx.bind(iconButtonClasses)(
      "default",
      {
        background: props.hasBackground,
        disabled: props.isDisabled
      },
      `role__${props.role}`,
      `size__${props.size}`,
      props.className
    ),
    ...iconButtonClasses
  }),
  ListBox: {
    main: cx.bind(listBoxClasses)("default"),
    ...listBoxClasses
  },
  ListBoxOption: props => ({
    main: cx.bind(listBoxOptionClasses)(
      "default",
      {
        active: props.isActive,
        disabled: props.isDisabled,
        selected: props.isSelected,
        withDescription: props.description
      },
      props.className
    ),
    ...listBoxOptionClasses
  }),
  ListBoxOptionGroup: {
    main: cx.bind(listBoxOptionGroupClasses)("default"),
    ...listBoxOptionGroupClasses
  },
  Modal: props => ({
    main: cx.bind(modalClasses)("default", props.className),
    ...modalClasses
  }),
  Popup: props => ({
    main: cx.bind(popupClasses)(
      "default",
      { error: props.hasError },
      `padding__${props.padding}`,
      props.className
    ),
    ...popupClasses
  }),
  ProgressBar: props => ({
    main: cx.bind(progressBarClasses)("default", props.className),
    ...progressBarClasses
  }),
  Radio: props => ({
    main: cx.bind(radioClasses)(
      "default",
      {
        error: props.hasError,
        disabled: props.isDisabled
      },
      props.className
    ),
    ...radioClasses
  }),
  ScrollBar: props => ({
    main: cx.bind(scrollBarClasses)(
      "default",
      `orientation__${props.orientation}`,
      props.className
    ),
    ...scrollBarClasses
  }),
  ScrollBox: props => ({
    main: cx.bind(scrollBoxClasses)(
      "default",
      { scrollBarsAreVisible: props.scrollBarsAreVisible },
      `paddingX__${
        Array.isArray(props.padding) ? props.padding[0] : props.padding
      }`,
      `paddingY__${
        Array.isArray(props.padding) ? props.padding[1] : props.padding
      }`,
      `scroll__${props.scroll}`,
      `scrollIndicatorVariant__${props.scrollIndicatorVariant}`,
      props.className
    ),
    ...scrollBoxClasses
  }),
  Spinner: {
    main: cx.bind(spinnerClasses)("default"),
    ...spinnerClasses
  },
  Switch: props => ({
    main: cx.bind(switchClasses)("default", { disabled: props.isDisabled }),
    ...switchClasses
  }),
  Tab: {
    main: cx.bind(tabClasses)("default"),
    ...tabClasses
  },
  TabButton: props => ({
    main: cx.bind(tabButtonClasses)(
      "default",
      { active: props.isActive },
      props.className
    ),
    ...tabButtonClasses
  }),
  Tabs: props => ({
    main: cx.bind(tabsClasses)(
      "default",
      `paddingX__${
        Array.isArray(props.padding) ? props.padding[0] : props.padding
      }`,
      `paddingY__${
        Array.isArray(props.padding) ? props.padding[1] : props.padding
      }`,
      props.className
    ),
    ...tabsClasses
  }),
  Tag: props => ({
    main: cx.bind(tagClasses)(
      "default",
      { disabled: props.isDisabled },
      props.className
    ),
    ...tagClasses
  }),
  TagInput: props => ({
    main: cx.bind(tagInputClasses)(
      "default",
      {
        disabled: props.isDisabled,
        error: !props.isDisabled && props.hasError,
        resizable: props.isResizable
      },
      props.className
    ),
    ...tagInputClasses
  }),
  Text: props => ({
    main: cx.bind(textClasses)(
      "default",
      {
        allCaps: props.allCaps,
        noWrap: props.noWrap,
        overflowHidden: props.overflowIsHidden
      },
      `role__${props.role}`,
      `size__${props.size}`,
      `textAlign__${props.textAlign}`,
      `variant__${props.variant}`,
      props.className
    ),
    ...textClasses
  }),
  TextArea: props => ({
    main: cx.bind(textAreaClasses)(
      "default",
      {
        disabled: props.isDisabled,
        error: !props.isDisabled && props.hasError
      },
      `align__${props.textAlign}`,
      `resize__${props.resize}`,
      props.className
    ),
    ...textAreaClasses
  }),
  TextInput: props => ({
    main: cx.bind(textInputClasses)(
      "default",
      {
        disabled: props.isDisabled,
        error: !props.isDisabled && props.hasError
      },
      `align__${props.textAlign}`,
      props.className
    ),
    ...textInputClasses
  }),
  TextInputWithIcon: props => ({
    main: cx.bind(textInputWithIconClasses)(
      "default",
      {
        disabled: props.isDisabled,
        error: props.hasError
      },
      `position__${props.iconPosition}`,
      props.className
    ),
    ...textInputWithIconClasses
  }),
  TimeInput: props => ({
    main: cx.bind(timeInputClasses)("default", props.className),
    ...timeInputClasses
  }),
  Tooltip: props => ({
    main: cx.bind(tooltipClasses)(
      "default",
      { dismissible: props.isDismissible },
      `arrowPosition__${props.arrowPosition}`,
      `role__${props.role}`,
      props.className
    ),
    ...tooltipClasses
  }),
  UnitInput: props => ({
    main: cx.bind(unitInputClasses)(
      "default",
      {
        fakeHovered: props.forceHover,
        disabled: props.isDisabled,
        error: props.hasError
      },
      `position__${props.valueLabelPosition}`,
      props.className
    ),
    ...unitInputClasses
  })
};

const variables = {
  color: {
    white: "#ffffff",
    grey: "#597494",
    blue: "#19a2e2",
    red: "#ff5460",
    orange: "#ff965a",
    yellow: "#ffd46b",
    lime: "#b1dc68",
    green: "#1bbab0",
    navy: "#0074a5",

    grey_D85: "#181e28",
    grey_D75: "#202835",
    grey_D65: "#273241",
    grey_D55: "#2f3c4e",
    grey_D45: "#36465a",
    grey_D35: "#394b60",
    grey_D25: "#42566e",
    grey_D15: "#4b627d",
    grey_D5: "#546e8c",

    grey_L10: "#69829e",
    grey_L25: "#8296ae",
    grey_L40: "#98a8bc",
    grey_L55: "#afbccb",
    grey_L70: "#c7d0db",
    grey_L75: "#cfd7e0",
    grey_L80: "#d7dde5",
    grey_L85: "#dfe4ea",
    grey_L90: "#eef1f4",
    grey_L95: "#f6f7f9",

    /* bluescale colors */
    blue_D85: "#0e2533",
    blue_D75: "#103348",
    blue_D65: "#10425c",
    blue_D55: "#125171",
    blue_D45: "#135f85",
    blue_D35: "#106993",
    blue_D25: "#1279a9",
    blue_D15: "#1589c0",
    blue_D5: "#1799d6",

    blue_L10: "#30abe4",
    blue_L25: "#52b9e9",
    blue_L40: "#75c7ed",
    blue_L55: "#97d5f1",
    blue_L70: "#bae3f6",
    blue_L90: "#e8f5fc",
    blue_L95: "#f3fafd",

    /* redscale colors */
    red_D85: "#311920",
    red_D75: "#4a2028",
    red_D65: "#61272f",
    red_D55: "#7a2d37",
    red_D45: "#92353d",
    red_D35: "#a6363e",
    red_D25: "#bf3e47",
    red_D15: "#d94751",
    red_D5: "#f24f5b",

    red_L10: "#ff6d77",
    red_L25: "#ff8790",
    red_L40: "#ff959c",
    red_L55: "#ffadb2",
    red_L70: "#ffcccf",
    red_L90: "#ffeeef",
    red_L95: "#fff7f7",

    /* orangescale colors */
    orange_D85: "#31231f",
    orange_D75: "#4a3026",
    orange_D65: "#613e2d",
    orange_D55: "#7a4b34",
    orange_D45: "#92593a",
    orange_D35: "#a6613a",
    orange_D25: "#bf7043",
    orange_D15: "#d97f4c",
    orange_D5: "#f28e55",

    orange_L10: "#ffa06a",
    orange_L25: "#ffb083",
    orange_L40: "#ffc09c",
    orange_L55: "#ffccb0",
    orange_L70: "#ffdfcd",
    orange_L90: "#fff4ee",
    orange_L95: "#fff9f6",

    /* yellowscale colors */
    yellow_D85: "#261f0f",
    yellow_D75: "#40351a",
    yellow_D65: "#594925",
    yellow_D55: "#735f30",
    yellow_D45: "#907940",
    yellow_D35: "#a68a45",
    yellow_D25: "#bf9e50",
    yellow_D15: "#d9b45b",
    yellow_D5: "#f2c965",

    yellow_L10: "#ffd87a",
    yellow_L25: "#ffde90",
    yellow_L40: "#ffe5a6",
    yellow_L55: "#ffeab8",
    yellow_L70: "#fff2d2",
    yellow_L90: "#fffaf0",
    yellow_L95: "#fffcf7",

    /* limescale colors */
    lime_D85: "#252d21",
    lime_D75: "#36422a",
    lime_D65: "#455632",
    lime_D55: "#566b3a",
    lime_D45: "#677f42",
    lime_D35: "#738f43",
    lime_D25: "#84a44d",
    lime_D15: "#96bb58",
    lime_D5: "#a7d062",

    lime_L10: "#b8df77",
    lime_L25: "#c8e695",
    lime_L40: "#cee9a1",
    lime_L55: "#d9eeb6",
    lime_L70: "#e7f4d1",
    lime_L90: "#f7fbf0",
    lime_L95: "#fbfdf7",

    /* greenscale colors */
    green_D85: "#0f282c",
    green_D75: "#10393c",
    green_D65: "#114a4b",
    green_D55: "#135b5b",
    green_D45: "#146d69",
    green_D35: "#117972",
    green_D25: "#148b83",
    green_D15: "#169e95",
    green_D5: "#19b0a7",

    green_L10: "#32c1b8",
    green_L25: "#5fcec7",
    green_L40: "#71d4ce",
    green_L55: "#91ddd9",
    green_L70: "#bbeae7",
    green_L90: "#e8f8f7",
    green_L95: "#f3fbfa",

    /* navyscale colors */
    navy_D85: "#001118",
    navy_D75: "#001d29",
    navy_D65: "#002839",
    navy_D55: "#00344a",
    navy_D45: "#003f5a",
    navy_D35: "#004b6b",
    navy_D25: "#00567b",
    navy_D15: "#00628c",
    navy_D5: "#006e9c",

    navy_L10: "#1a82ae",
    navy_L25: "#4096bb",
    navy_L40: "#66abc9",
    navy_L55: "#85bcd3",
    navy_L70: "#b3d5e4",
    navy_L90: "#e6f1f6",
    navy_L95: "#f2f7fa"
  },
  fontSize: {
    xxs: "10px",
    xs: "12px",
    s: "14px",
    m: "15px",
    l: "18px",
    xl: "20px",
    xxl: "24px"
  },
  lineHeight: {
    s: "16px",
    m: "24px",
    l: "32px",
    xl: "40px",
    xxl: "48px"
  },
  spacing: {
    s: "16px",
    m: "24px",
    l: "32px",
    xl: "40px",
    xxl: "48px"
  }
};

export default { classNames, variables, icons };
