/**
 * @file Allowing <textarea> and <input> elements to expand to fill space (horizontally and vertically respectively) as needed/allowed
 *
 * 1. Import the default function
 * 2. Call the function with a classname to target, or it will target `.expanding` by default
 */

/**
 * @param class_name string? The class name to target for expanding (defaults to `expanding`)
 */
export default function expanding_textareas( class_name?: string, props?: {
	debug?: boolean
} )
{
	// Set default value
	class_name = class_name || "expanding";
	
	props?.debug && console.log(`[Expanding Textareas] Creating event listener`);

	// Create our event listener
	document.addEventListener("input", e =>
	{
		if ( e.target != null ) { handle_elm(e.target as HTMLElement, class_name) }
	});

	// Run once for good measure (elements may be auto-filled by the browser or have pre-entered values from the server)
	props?.debug && console.log(`[Expanding Textareas] Running once on any existing elements`);

	let elms = Object.values( document.getElementsByClassName( class_name ) ) as HTMLElement[];
	for ( const elm of elms )
	{
		handle_elm(elm, class_name);
	}
}

function handle_elm( elm: HTMLElement, class_name: string )
{
	let tag_name = ( elm )?.tagName;
	// Make sure thelm is actually someone we care about
	if ( tag_name != "TEXTAREA" && tag_name != "INPUT" ) { return }

	if ( ! ( elm ).classList.contains( class_name ) ) { return }

	switch ( tag_name )
	{
		case "TEXTAREA": handle_textarea( elm as HTMLTextAreaElement ); break;
		case "INPUT": handle_input( elm as HTMLInputElement ); break;
	}
	
}

// TODO: Both of these functions have issues when there is padding/margins that affect the element's size.  so... fix please
function handle_textarea( elm: HTMLTextAreaElement )
{
	// Reset the height
	elm.style.height = "";
	// Expand (if needed)
	if ( elm.scrollHeight > elm.clientHeight )
	{
		elm.style.height = elm.scrollHeight + "px";
	}
}
function handle_input( elm: HTMLInputElement )
{
	elm.style.width = "";
	if ( elm.scrollWidth > (elm.offsetWidth - 10) )
	{
		elm.style.width = (elm.scrollWidth + 5) + "px";
	}
}
