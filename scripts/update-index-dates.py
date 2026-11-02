#!/usr/bin/env python3
"""Stamp each document row in index.html with the date of its last commit.
Run from the repo root after committing the documents, before pushing."""
import re, subprocess

def last_commit_date(path):
    return subprocess.check_output(['git', 'log', '-1', '--format=%cs', '--', path], text=True).strip()

def stamp(match):
    date = last_commit_date(match.group(2))
    if not date:
        raise SystemExit(f'No commit found for {match.group(2)}')
    return f'{match.group(1)}<time datetime="{date}">{date}</time>'

with open('index.html', encoding='utf-8') as f:
    page = f.read()
page = re.sub(r'(<a class="doc" href="((?!http)[^"]+)".*?<span class="when"><span class="w">Updated </span>)<time[^>]*>[^<]*</time>', stamp, page)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(page)
