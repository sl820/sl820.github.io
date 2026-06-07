#!/usr/bin/env bash
# deploy-gh-pages.sh
# 1) pnpm build → dist/
# 2) 在 git worktree 里准备 gh-pages（保留 .nojekyll）
# 3) 推 gh-pages，触发 Pages 自动 build

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
GH_WORKTREE="${REPO_ROOT}/.gh-pages-worktree"
BRANCH="gh-pages"

cd "$REPO_ROOT"

# 当前必须在 main（或非 gh-pages 的任一分支）
current=$(git branch --show-current)
if [ "$current" = "$BRANCH" ]; then
  echo "ERROR: 不能在 $BRANCH 分支跑此脚本（会丢 untracked 源）" >&2
  exit 1
fi

# 1) build
echo "▶ pnpm install (frozen lockfile)"
pnpm install --frozen-lockfile

echo "▶ pnpm build"
pnpm build

# 2) 准备 worktree（如果已存在则 reuse）
if git worktree list | grep -q "$GH_WORKTREE"; then
  echo "▶ reuse worktree $GH_WORKTREE"
  cd "$GH_WORKTREE"
  git checkout "$BRANCH" 2>/dev/null || git checkout -b "$BRANCH" origin/"$BRANCH"
else
  echo "▶ create worktree $GH_WORKTREE"
  git worktree add "$GH_WORKTREE" "$BRANCH"
  cd "$GH_WORKTREE"
fi

# 3) 清空（除 .git 和 .nojekyll）
echo "▶ 清工作树（保留 .nojekyll）"
find . -mindepth 1 -maxdepth 1 \
  ! -name '.git' \
  ! -name '.nojekyll' \
  -exec rm -rf {} +

# 4) 拷新 dist
echo "▶ 拷 dist/ 到根"
cp -r "$REPO_ROOT/dist/." .

# 5) 兜底再放一个 .nojekyll（防止从没建过）
[ -f .nojekyll ] || touch .nojekyll

# 6) commit + push
git add -A
if git diff --cached --quiet; then
  echo "▶ 无变化，跳过 commit"
else
  git -c user.name="sl820" -c user.email="hbusl@email.com" \
    commit -m "Deploy: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "▶ push origin $BRANCH"
  git push origin "$BRANCH" --force
fi

echo "✓ 完成。Pages 会在 ~30s 内重建。"
echo "  https://github.com/sl820/sl820.github.io/deployments"
