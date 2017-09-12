Component Description
---------------------

A Nessie TextInputWithDropdown consist of a Nessie InputContainer wrapping a FlounderDropdown.

FlounderDropdown is the React wrapper component for Flounder, an open source style-able dropdown replacement for native dropdowns:
https://github.com/sociomantic-tsunami/flounder

Example Usage
-------------

 <TextInputWithDropdown label            = "Enter a URL"
                        dropdownPosition = "left"
                        textAlign        = "left"
                        dropdownData     = { [ "http://", "ftp://"] }/>
