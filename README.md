
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

### My Favourites

```bash
# Swap bunx & bun out for your preferred package manager
bunx --bun astro add preact
bun add -D @astrojs/ts-plugin
bun add -D sass-embedded sass
bun add @picocss/pico
```

And I use this in my base layout
```html
<style lang="scss" is:global>
@use "pico"
</style>
```
