
JS_PACKAGE_MANAGER="bun"
JS_RUNTIME_RUNNER="bunx"

FOLDERS_TO_MAKE=('src' 'src/components' 'src/layouts' 'src/pages' 'src/styles' 'src/utils')

ASTRO_INTEGRATIONS=('preact' 'sitemap')

DEV_PACKAGES=('sass-embedded' 'sass' '@astrojs/ts-plugin')

# TODO: Can we make this optional?
PACKAGES=('lucide-preact')


if [[ -d ".astro" ]]; then

	for item in "${FOLDERS_TO_MAKE[@]}"; do
		mkdir $item &> /dev/null
	done

	for item in "${DEV_PACKAGES[@]}"; do
		"$JS_PACKAGE_MANAGER add -D $item";
	done

	for item in "${PACKAGES[@]}"; do
		"$JS_PACKAGE_MANAGER add $item";
	done

	for item in "${ASTRO_INTEGRATIONS[@]}"; do
		"$JS_RUNTIME_RUNNER astro add $item --yes";
	done

	if [[ "$JS_PACKAGE_MANAGER" == "bun" ]]; then
		bun add -D @types/bun
	fi

	# TODO: Update tsconfig.json as compileroptions.paths.*
	
	# TODO: bun add @astrojs/rss
	# TODO: astro add cloudflare ?
	# TODO: astro add markdoc ??

else
	printf "Did not find ./.astro folder, are you sure you're in an already created astro project?\n";
fi
