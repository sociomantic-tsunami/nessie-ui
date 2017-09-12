Component Description
---------------------

A Nessie Switch is a single Switch button. It consists of a (hidden) native `<input type="checkbox">` and a `<label>` styled to replace the native input. The width of the element is determined by the width of the 'off' text. Usually Off or Deactivated. The positioning of the 'on' text is then slight more left oriented to center it within the label.


Example Usage
-------------

    <Switch onLabel   = "activated"
    	    offLabel  = "deactivated"
            isChecked = { false }
            isDisabled= { false } />