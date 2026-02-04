
// Button actions
document.addEventListener( "click", event =>
{
	if ( (event.target as HTMLElement)?.tagName != "BUTTON" ) { return }
	if ( (event.target as HTMLElement)?.getAttribute("data-action") == null ) { return }
	
	let target = event.target as HTMLElement;
	let return_val = false;

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
