#!/bin/bash

set -e  # Exit on error

# pack @adguard/ecss-tree
curr_path="test/smoke/cjs"
ecss_tree="ecsstree.tgz"
nm_path="node_modules"

# Define cleanup function
cleanup() {
    echo "Cleaning up..."
    rm -f $ecss_tree && rm -rf $nm_path
    echo "Cleanup complete"
}

# Set trap to execute the cleanup function on script exit
trap cleanup EXIT

(cd ../../.. && pnpm pack --out $ecss_tree && mv $ecss_tree "$curr_path/$ecss_tree")

# unzip to @adguard/tsurlfilter to node_modules
ecss_tree_node_modules=$nm_path"/@adguard/ecss-tree"
mkdir -p $ecss_tree_node_modules
tar -xzf $ecss_tree --strip-components=1 -C $ecss_tree_node_modules

pnpm start
echo "Test successfully built."
