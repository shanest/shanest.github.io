---
layout: layouts/base.njk
eleventyNavigation:
  key: Trip Reports
  order: 4
---

The more I've done various outdoor activities---especially larger ones like big ski tours and alpine climbs---the more I've come to appreciate the trip report.  Aside from providing valuable beta, the story-telling paints a picture of what one may come to find.  Over time, I've found myself reading lots of reports from [Steph Abegg](https://stephabegg.com/), [Kyle McCrohan](https://climberkyle.com/), and [Kyle Miller](https://www.whereiskylemiller.com/), among others.

While I have no pretension of climbing and riding at their level, I put these reports up (i) in case they do provide any information that may be helpful to anyone and (ii) to help me record my own memories for the future and partially "consolidate" each experience.  Note: there's also a long backlog of reports that I plan to write post hoc now.

# Trip Reports

{% set postslist = (collections[ "trip-reports" ] | reverse) %}
{% include "postslist.njk" %}