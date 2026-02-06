import pluginRss from '@11ty/eleventy-plugin-rss'

export default function (eleventyConfig) {
  // Allow missing file extensions (like Jekyll)
  eleventyConfig.configureErrorReporting({ allowMissingExtensions: true })

  // Add RSS plugin
  eleventyConfig.addPlugin(pluginRss)

  // Add global site data
  eleventyConfig.addGlobalData('site', {
    title: 'Lords of the Pit',
    description:
      "The Lords of the Pit are the United States' premiere Old School Magic: the Gathering club based out of Chicago, IL. Members of this group include current club members ('Lords') as well as prospective new members ('Thrulls').",
    baseurl: '/',
    url: 'https://lordsofthepit.com',
    s3BucketPrefix: 'https://lordsofthepit.s3.us-east-2.amazonaws.com',
    lang: 'en',
  })

  // Copy static assets
  eleventyConfig.addPassthroughCopy('src/assets')
  eleventyConfig.addPassthroughCopy('src/*.png')
  eleventyConfig.addPassthroughCopy('src/*.jpg')
  eleventyConfig.addPassthroughCopy('src/*.ico')
  eleventyConfig.addPassthroughCopy('src/*.svg')
  eleventyConfig.addPassthroughCopy('src/*.webmanifest')

  // Create posts collection
  eleventyConfig.addCollection('posts', function (collectionApi) {
    return collectionApi.getFilteredByGlob('src/posts/*.md').sort((a, b) => {
      return b.date - a.date // Sort by date descending (newest first)
    })
  })

  // Date filters to match Jekyll behavior
  eleventyConfig.addFilter('date', function (date, format) {
    const d = new Date(date)
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    // Handle format strings
    if (format === '%Y') {
      return d.getFullYear().toString()
    } else if (format === '%b %-d, %Y' || format === '%b %-d') {
      const day = d.getDate()
      const month = monthNames[d.getMonth()]
      return format === '%b %-d, %Y'
        ? `${month} ${day}, ${d.getFullYear()}`
        : `${month} ${day}`
    }

    // Default format
    return `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
  })

  eleventyConfig.addFilter('date_to_xmlschema', function (date) {
    return new Date(date).toISOString()
  })

  // Add relative_url filter (Jekyll compatibility)
  eleventyConfig.addFilter('relative_url', function (url) {
    return url
  })

  // Add escape filter for HTML escaping
  eleventyConfig.addFilter('escape', function (text) {
    if (!text) return ''
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  })

  // Add strip_html filter
  eleventyConfig.addFilter('strip_html', function (text) {
    if (!text) return ''
    return text.replace(/<[^>]+>/g, '')
  })

  // Add limit filter for arrays
  eleventyConfig.addFilter('limit', function (array, limit) {
    return array.slice(0, limit)
  })

  // Add where filter
  eleventyConfig.addFilter('where', function (array, key, value) {
    return array.filter((item) => item.data[key] === value)
  })

  // Ignore template files and documentation
  eleventyConfig.ignores.add('_editors/**')
  eleventyConfig.ignores.add('README.md')
  eleventyConfig.ignores.add('MIGRATION.md')
  eleventyConfig.ignores.add('CLAUDE.md')

  // Watch for changes
  eleventyConfig.addWatchTarget('./src/assets/stylesheets/')

  // Configure browsersync
  eleventyConfig.setBrowserSyncConfig({
    files: './dist/assets/stylesheets/**/*.css',
  })

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'includes',
      layouts: 'layouts',
      data: 'data',
    },
    templateFormats: ['md', 'html', 'liquid', 'njk', 'xml'],
    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'liquid',
    dataTemplateEngine: 'liquid',
    pathPrefix: '/',
  }
}
