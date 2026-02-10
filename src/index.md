---
title: Home
layout: home
pagination:
  data: collections.posts
  size: 10
  alias: posts
permalink: "{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber | plus: 1 }}/{% else %}/{% endif %}"
---
