#!/bin/zsh
# Publish the built pages to the GitLab mockups site (side-projects/mockups,
# branch v9bet-login-guideline). Usage: scripts/publish-mockups.sh "commit message"
#
# Browsers keep GitLab Pages files for 10 minutes, so a fresh deploy could still
# show old pages, or a new page with an old tailwind.config.js. Each publish
# therefore stamps a build id: the shared files are loaded as file.js?v=<build>,
# and every page checks version.js on open and reloads itself once if a newer
# build is out. Only the published copies are stamped; the kit's files are not.
set -e
SRC=~/Desktop/v9bet
DST=~/Documents/v9bet/sp-mockups
MSG=${1:?commit message}

PAGES=(auth-flow-tailwind.html setup-flow-tailwind.html settings-tailwind.html signup-flow-tailwind.html login-flow-tailwind.html ui-kit.html ui-guideline.html profile-settings-flow-wireframe.html)
SHARED=(variables.css theme.js tailwind.config.js test-panel.js)
for f in $PAGES $SHARED; do cp "$SRC/$f" "$DST/$f"; done
rsync -a "$SRC/assets/" "$DST/assets/"

BUILD=$(date +%Y%m%d%H%M%S)
print -r -- "$BUILD" > "$DST/version.js"   # a bare number: valid JS, so the Pages job (*.js) copies it

python3 - "$DST" "$BUILD" $PAGES <<'PY'
import re, sys
dst, build, pages = sys.argv[1], sys.argv[2], sys.argv[3:]
check = ('<script>/* build ' + build + ' — reload once if a newer build is published */'
         "fetch('version.js?'+Date.now(),{cache:'no-store'}).then(function(r){return r.text()}).then(function(v){v=v.trim();"
         "if(v&&v!=='" + build + "'){try{if(sessionStorage.getItem('build-reload')===v)return;sessionStorage.setItem('build-reload',v)}catch(e){}location.reload()}}).catch(function(){});</script>")
for p in pages:
    path = f'{dst}/{p}'
    s = open(path, encoding='utf-8').read()
    s = re.sub(r'(src|href)="(variables\.css|theme\.js|tailwind\.config\.js|test-panel\.js)(\?v=\d+)?"', lambda m: f'{m.group(1)}="{m.group(2)}?v={build}"', s)
    s = re.sub(r'<script>/\* build \d+ .*?</script>', '', s, flags=re.S)
    s = re.sub(r'(<meta charset="utf-8">)', lambda m: m.group(1) + '\n' + check, s, count=1)
    open(path, 'w', encoding='utf-8').write(s)
PY

cd "$DST"
git add -A
git commit -qm "$MSG

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push -q 2>&1 | grep -v '^remote:' || true
git log --oneline -1
print "build $BUILD"
