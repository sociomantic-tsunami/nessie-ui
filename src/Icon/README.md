Component Description
---------------------

A Nessie Icon contains a `<svg>` that can display different icons in different forms using this combinations of options:

Theme:
	- light: used for icons within a module [default]
	- control: used for icons in the control panel, only theme with disabled state
	- button: used for icons contained in buttons, always white, no hover (exception: Icon is grey by default and white on hover when rendered in a .Button with role: 'subtle')
	- navigation: used in paginator and carousel. maybe used in top navigation eventually
	- dark: a theme for light color icons on a dark background. not yet in use.

Size:
	- S: 16 [default]
	- M: 24
	- L: 32
	- XL: 40
	- XXL: 48

Type:
	- account.
	- add.
	- calendar.
	- close.
	- delete.
	- down.
	- download.
	- duplicate.
	- edit.
	- info.
	- inspect.
	- left.
	- link.
	- preview.
	- reset.
	- right.
	- search.
	- up.
	- upload.
	- validation.
	- alert.
	- approved.
	- declined.
	- ended.
	- error.
	- pending.
	- show.
	- hide.


Example Usage
-------------

Basic Icon:

		    <Icon type="add">Add</Icon>


Status Icon:

		    <Icon type="alert"/>


Status Icon with stroke:

		    <Icon type="alert" variant="stroke"/>
