"""Build index.html (a full page for GitHub Pages) from ballot.html (the page
body, which is also what the Claude artifact preview uses). Run after every
edit to ballot.html:  python make_index.py"""
import io
import re

body = io.open("ballot.html", encoding="utf-8").read()
title = re.search(r"<title>(.*?)</title>", body).group(1)
desc = ("Every dot is a voter. Hold an election with equal votes and with educated "
        "votes counting more, and see which picks the better candidate.")
page = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="{desc}">
<style>html{{color-scheme:light}} body{{margin:0}} [hidden]{{display:none!important}}</style>
{body.split("</style>", 1)[0].replace(f"<title>{title}</title>", f"<title>{title}</title>")}</style>
</head>
<body>
{body.split("</style>", 1)[1]}
</body>
</html>
"""
io.open("index.html", "w", encoding="utf-8").write(page)
print("index.html written,", len(page), "bytes")
