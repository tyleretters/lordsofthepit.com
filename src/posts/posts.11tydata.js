export default {
  layout: 'post.html',
  eleventyComputed: {
    previous: (data) => {
      const posts = data.collections.posts || []
      const currentIndex = posts.findIndex((post) => post.url === data.page.url)
      if (currentIndex === -1 || currentIndex === 0) return null
      return posts[currentIndex - 1]
    },
    next: (data) => {
      const posts = data.collections.posts || []
      const currentIndex = posts.findIndex((post) => post.url === data.page.url)
      if (currentIndex === -1 || currentIndex === posts.length - 1) return null
      return posts[currentIndex + 1]
    },
  },
}
