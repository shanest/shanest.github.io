---
layout: layouts/base.njk
eleventyNavigation:
  key: Trip Reports
  order: 4
---

{% set postslist = (collections[ "trip-reports" ] | reverse) %}
{% include "postslist.njk" %}