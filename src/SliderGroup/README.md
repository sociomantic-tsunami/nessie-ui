Component Description
---------------------

A Nessie SliderGroup builds a slider group from an array of objects, each object containing the props for each individual slider:

	[
		{"value":50,"label":"All"},
		{"value":50,"label":"Adult","isDisabled":true},
		{"value":50,"label":"Alcohol","isDisabled":true},
		{"value":50,"label":"Hate of speech","isDisabled":true}
	]

**This is not the preferred method of building a radio group.** .Consider building your own layout with <Row> and <Column> components if you need to use an arrangement with several sliders.

Example Usage
-------------

	<SliderGroup    
		sliders = "[ {"value":50,"label":"All"},
	                 {"value":50,"label":"Adult","isDisabled":true},
	                 {"value":50,"label":"Alcohol","isDisabled":true},
	                 {"value":50,"label":"Hate of speech","isDisabled":true} ]"
	/>

Individual Sliders can be independently configured to be read-only, disabled, or
in error state, which are `OR`'d with the corresponding props in the Slider group.
