/**
 * Actions: [ "show", "hide", "searchparam" ]
 * Expectations:
 * 		show, hide, toggle -> has aria-controls
 *		searchparam -> has data-value and data-param
 */

// Button actions
document.addEventListener( "click", event =>
{
	if ( (event.target as HTMLElement)?.tagName != "BUTTON" ) { return }
	if ( (event.target as HTMLElement)?.getAttribute("data-action") == null ) { return }
	
	let target = event.target as HTMLElement;
	let action = target.getAttribute("data-action");

	// Search params
	switch ( action )
	{
		case "searchparam": {
			let param = target.getAttribute("data-param");
			if ( param == null ) { throw new Error( "data-action='searchparam' expects the element to have a data-param and optionally a data-value" ); }
			let value = target.getAttribute("data-value");

			const urlParams = new URLSearchParams(window.location.search);
			if ( value == null ) { urlParams.delete( param ); }
			else { urlParams.set( param, value ); }
			// @ts-ignore
			window.location.search = urlParams;
			return true;
		}
	}

	// For dialogs
	if ( action_elmtype_controls<HTMLDialogElement>( target, "show", "DIALOG",
		e => { e.showModal(); return true; }
	) ) { return true }

	if ( action_elmtype_controls<HTMLDialogElement>( target, ["hide", "close"], "DIALOG",
		e => { close_dialog( e ); return true; }
	) ) { return true }

	if ( action_elmtype_controls<HTMLDialogElement>( target, "toggle", "DIALOG",
		e => { if (e.open) { close_dialog( e ) } else { e.showModal() }; return true; }
	) ) { return true }

	return false
});


function action_elmtype_controls<T>( target: HTMLElement, action: string | string[], controlled_tagname: string, callback: ( elm: T ) => boolean | void )
{
	let data_action = target.getAttribute("data-action");
	// Null or string & not match
	if ( data_action == null || ( typeof action == "string" && action != data_action ) ) { return }
	// Array & not match
	if ( Array.isArray( action ) && action.findIndex( a => a == data_action ) == -1 ) { return }	

	let success = false;
	for ( const controlled of Object.values( target.ariaControlsElements || [] ) )
	{
		if ( controlled.tagName != controlled_tagname ) { continue }
		success = success || (callback( controlled as T ) || false);
	}
	return success
}

function close_dialog( elm: HTMLDialogElement )
{
	// https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/requestClose
	if ( typeof elm.requestClose == "function" ) { elm.requestClose(); }
	else { elm.close(); }
}
