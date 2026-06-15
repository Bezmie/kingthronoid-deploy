#!/bin/sh
# Install git hooks from .husky/ into .git/hooks/
# Run after cloning CORE: sh .husky/install.sh

HOOKS_DIR=".husky"
GIT_HOOKS_DIR=".git/hooks"

for hook in "$HOOKS_DIR"/*; do
  if [ -f "$hook" ] && [ "$(basename "$hook")" != "install.sh" ]; then
    cp "$hook" "$GIT_HOOKS_DIR/$(basename "$hook")"
    chmod +x "$GIT_HOOKS_DIR/$(basename "$hook")"
    echo "Installed: $(basename "$hook")"
  fi
done
