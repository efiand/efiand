import cssnano from "cssnano";
import postcssImport from "postcss-import";
// @ts-expect-error
import sortMediaQueries from "postcss-sort-media-queries";

export default {
	plugins: [postcssImport(), sortMediaQueries(), cssnano()],
};
