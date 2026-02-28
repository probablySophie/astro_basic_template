/**
 * @file Toggling forms 
 * 
 * The form should have either the class `show-inputs` or `hide-inputs` and should have a button inside with the class `toggle-inputs`.
 *
 * Elements can be hidden alongside inputs with the class `show-if-input-shown`
 * Elements can be hidden when inputs are SHOWN with the class `hide-if-input-shown`
 */

/* INFO: You also want the css:
form.hide-inputs input,
form.hide-inputs select,
form.hide-inputs textarea { display: none; }

form.hide-inputs.hide-labels label { display: none; }

form.hide-inputs .show-if-input-shown,
form.show-inputs .hide-if-input-shown { display: none; }
*/

/* e.g.
	<form class="hide-inputs">
		<label class="show-if-input-shown">Please enter your name</label><input type="text" name="name" />
		<p class="hide-if-input-shown">Click this button if you want to enter your name!</p>
		<button class="toggle-inputs">Toggle Entering Name</button>
		<button class="show-if-input-shown">Submit</button>
	</form>
 */

document.addEventListener( "click", e => {
	// Did we click a button?
	if ( (e.target as HTMLElement)?.tagName != "BUTTON" ) { return }
	// Does the button have the class `toggle-inputs`?
	if ( (e.target as HTMLElement)?.classList.contains("toggle-inputs") != true ) { return }

	// Are we a form's child?
	let f = (e.target as HTMLElement)?.parentElement as HTMLElement;
	if ( f == null ) { return }
	while ( f.tagName != "FORM" ) {
		if ( f.parentElement == null ) { return }
		f = f.parentElement;
	}
	
	e.preventDefault();
	// let b = (e.target as HTMLElement) as HTMLButtonElement;

	if ( f.classList.contains( "hide-inputs" ) ) {
		f.classList.remove( "hide-inputs" );
		f.classList.add( "show-inputs" );
	} else {
		f.classList.remove( "show-inputs" );
		f.classList.add( "hide-inputs" );
	}
	return true
} )
