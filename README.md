
### Using this template set

Add this to your `tsconfig.json`
```json
{
	"include": [ "path/to/this/folder/types.d.ts" ],
	"compilerOptions": {
		"paths": {
			"@template/*": ["path/to/this/folder/*"]
		}
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
		<!-- Your header here! -->
	</Fragment>

	<!-- You can replace <slot /> with contents if you don't want to use this as a layout -->
	<!-- You may want an <article></article> if its a text-content article friend (you can have multiple in a page) or <nav> or <section> -->
	<slot />

	<Fragment slot="footer">
		<!-- Your footer here! -->
	</Fragment>
</Layout>
```

#### A single boring page

```astro
---
import Layout from "@layouts/Base.astro"
import type { Frontmatter } from "@template/types"

const frontmatter: Frontmatter = {}
---
<Layout frontmatter={frontmatter} >
	<!-- Your content here -->	
</Layout>
```

### Useful Friends

* [PicoCSS](https://picocss.com/)  

### My Favourites

```bash
# Swap bunx & bun out for your preferred package manager
bunx create-astro@latest $YOUR_DIR --template minimal
bunx --bun astro add preact
bun add -D @astrojs/ts-plugin
bun add -D sass-embedded sass
bun add @picocss/pico
```

And I use this in my base layout
```html
<style lang="scss" is:global>
	/* Reference the actual `.scss` file so we can use `with`
	 * See for more customisation: https://picocss.com/docs/sass
	 */
	@use "@picocss/pico/scss/pico";
</style>
```
