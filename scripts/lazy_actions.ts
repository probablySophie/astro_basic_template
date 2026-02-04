/**
 * Actions: [ "show", "hide", "searchparam" ]
 * Expectations:
 * 		show -> has aria-controls
 * 		hide -> has aria-controls
 *		searchparam -> has data-value and data-param
 */

// Button actions
document.addEventListener( "click", event =>
{
	if ( (event.target as HTMLElement)?.tagName != "BUTTON" ) { return }
	if ( (event.target as HTMLElement)?.getAttribute("data-action") == null ) { return }
	
	let target = event.target as HTMLElement;
	let action = target.getAttribute("data-action");
	let return_val = false;

	// Search params
	switch ( action )
	{
		case "searchparam": {
			let param = target.getAttribute("data-param");
			if ( param == null ) { throw new Error( "data-action='searchparam' expects to have a data-param and optionally a data-value" ); }
			let value = target.getAttribute("data-value");

			const urlParams = new URLSearchParams(window.location.search);
			if ( value == null ) { urlParams.delete( param ) }
			else { urlParams.set( param, value ); }
			// @ts-ignore
			window.location.search = urlParams;
			return true;
		}
	}

	// For dialogs
	action_elmtype_controls<HTMLDialogElement>( target, "show", "DIALOG",
		e => { e.showModal(); return_val = true; }
	);
	action_elmtype_controls<HTMLDialogElement>( target, "hide", "DIALOG",
		e => { e.close(); return_val = true; }
	);
	action_elmtype_controls<HTMLDialogElement>( target, "close", "DIALOG",
		e => { e.close(); return_val = true; }
	);

	return return_val
});

function action_elmtype_controls<T>( target: HTMLElement, action: string, controlled_tagname: string, callback: ( elm: T ) => void )
{
	if ( target.getAttribute("data-action") != action ) { return false }
	for ( const controlled of Object.values( target.ariaControlsElements || [] ) )
	{
		if ( controlled.tagName != controlled_tagname ) { continue }
		callback( controlled as T );
	}
}
