
JS_PACKAGE_MANAGER="bun"
JS_RUNTIME_RUNNER="bunx --bun"

if [[ -f "yarn.lock" ]]; then
	JS_PACKAGE_MANAGER="yarn"
	JS_RUNTIME_RUNNER="yarn"
fi
if [[ -f "bun.lock" ]]; then
	JS_PACKAGE_MANAGER="bun"
	JS_RUNTIME_RUNNER="bunx --bun"
fi

FOLDERS_TO_MAKE=('src/components' 'src/layouts' 'src/pages' 'src/styles' 'src/utils')

# The aliases to add to tsconfig.json
PATH_ALIASES=("@components/*" "@layouts/*" "@pages/*" "@styles/*" "@utils/*" "@data/*" "@lib/*" "@scripts/*" "@template/*")
REAL_PATHS=("src/components/*" "src/layouts/*" "src/pages/*" "src/styles/*" "src/utils/*" "src/data/*" "src/lib/*" "src/scripts/*" "src/utils/astro_basic_template/*")

ASTRO_INTEGRATIONS=('preact' 'sitemap')

DEV_PACKAGES=('sass-embedded' 'sass' '@astrojs/ts-plugin')

# TODO: Can we make this optional?
PACKAGES=('lucide-preact')

ADDED=()
SKIPPED=()

# $1 who are we checking if exists
# Who are we adding our value to?
# The value we're adding
function jq_add_if
{
	# If no tsconfig.json - give up
	conf_file="tsconfig.json"
	if [[ ! -f $conf_file ]]; then return; fi
	# If what we're looking for is already there - then skip
	if [[ "$(jq $1 $conf_file)" != "null" ]]; then return; fi
	printf "$(jq "$2 += $3" $conf_file)" > $conf_file
}

# Parses as true if $1 is NOT in package.json
function not_in_package_json
{
	# If $1 is null, return false for safety
	if [[ "$1" == "" ]]; then return 1; fi
	if [[ "$(grep "$1" package.json)" == "" ]]; then
		return 0 # Zero is true
	fi
	return 1 # One is false
}

# If bun, add types/bun
if [[ "$JS_PACKAGE_MANAGER" == "bun" ]]; then
	DEV_PACKAGES+=("@types/bun")
fi

# Make sure we're in an astro project
if [[ -f "astro.config.mjs" ]]; then

	# Make some folders :)
	for item in "${FOLDERS_TO_MAKE[@]}"; do
		mkdir -p $item &> /dev/null
	done

	# Add our dev packages
	for item in "${DEV_PACKAGES[@]}"; do
		if not_in_package_json "$item"; then
			$JS_PACKAGE_MANAGER add -D "$item";
			ADDED+=("$item");
		else
			SKIPPED+=("$item");
		fi
	done

	# Add our regular packages
	for item in "${PACKAGES[@]}"; do
		if not_in_package_json "$item"; then
			$JS_PACKAGE_MANAGER add "$item";
			ADDED+=("$item");
		else
			SKIPPED+=("$item");
		fi
	done

	# Add the astro integrations
	for item in "${ASTRO_INTEGRATIONS[@]}"; do
		if not_in_package_json "@astrojs/$item"; then
			$JS_RUNTIME_RUNNER astro add "$item" --yes;
			ADDED+=("$item");
		else
			SKIPPED+=("$item");
		fi
	done
	
	# TODO: bun add @astrojs/rss
	# TODO: astro add cloudflare ?
	# TODO: astro add markdoc ??

	# Add the base URL
	jq_add_if \
		".compilerOptions.baseUrl" \
		".compilerOptions" \
		'{"baseUrl": "."}'

	# Add an empty paths friend
	jq_add_if \
		".compilerOptions.paths" \
		".compilerOptions" \
		'{"paths": {}}'

	# Looping from i in 0 to array length
	for ((i=0; i<${#PATH_ALIASES[@]}; i++)); do
		jq_add_if \
			".compilerOptions.paths.\"${PATH_ALIASES[$i]}\"" \
			".compilerOptions.paths" \
			"{\"${PATH_ALIASES[$i]}\": [ \"${REAL_PATHS[$i]}\" ] }"
	done

	if [[ ${#ADDED[@]} > 0 ]]; then
		printf "\nAdded to package.json:\n";
		for item in "${ADDED[@]}"; do
			printf "\t$item\n";
		done
	fi

	if [[ ${#SKIPPED[@]} > 0 ]]; then
		printf "\nPackage.json already had:\n";
		for item in "${SKIPPED[@]}"; do
			printf "\t$item\n";
		done
	fi
else
	printf "Did not find ./astro.config.mjs\nAre you sure you're in an existing astro project's root directory?\n";
fi
