
### Using this template set

Add this to your `tsconfig.json`
```json
{
	"include": [ "path/to/this/folder/types.d.ts" ],
	"compilerOptions": {
		"paths": {
			"@template/*": ["path/to/this/folder/*"]
		},
		// Or this maybe??
		"files": ["path/to/this/folder/types.d.ts"]
	}
}
```

### Useful Documentation

* [Content Collections](https://docs.astro.build/en/guides/content-collections/)  
* [Astro Components](https://docs.astro.build/en/basics/astro-components/)  

### Using the Base Layout

```astro
---
import Layout from "@template/layouts/Base.astro";
import type { Frontmatter, Config } from "@template/types";

const config: Config = {}

interface Props { frontmatter: Frontmatter }
const { frontmatter } = Astro.props;
---

<Layout frontmatter={frontmatter} config={config}>
	<Fragment slot="header">
		<!-- Whatever -->
	</Fragment>

	<!-- Your main body contents -->
	<!-- Or a <slot /> if this is also a layout -->
	<!-- BUT: If you are using this as a layout, you want to define the header & footer here, instead of passing them through from whatever page calls this guy -->

	<Fragment slot="footer">
		<!-- Whatever -->
	</Fragment>
</Layout>
```

### Useful Friends

* [PicoCSS](https://picocss.com/)  

