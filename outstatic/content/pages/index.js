// pages/index.js
import { Outstatic } from 'outstatic';
import Link from 'next/link';
// Import Markdown/MDX rendering library if you're rendering full content
// Example: import { MDXRemote } from 'next-mdx-remote' if you use MDX

export default function HomePage({ posts, aboutContent }) {
  return (
    <div>
      {/* Existing Posts Section */}
      <h1>Recent Blog Posts</h1>
      {posts && posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <small>{new Date(post.publishedAt).toLocaleDateString()}</small>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No blog posts found yet.</p>
      )}

      <hr style={{ margin: '40px 0' }} />

      {/* New About Section */}
      {aboutContent ? (
        <div id="about-section">
          <h2>{aboutContent.title}</h2>
          {/*
            If 'aboutContent.content' contains Markdown/MDX, you'll need a
            rendering component here (e.g., react-markdown, MDXRemote).
            For simplicity, I'm assuming you fetch a 'description' or similar text field.
            If 'content' is raw HTML, you can use dangerouslySetInnerHTML, but be cautious.
          */}
          <p>{aboutContent.description}</p> {/* Example: display a description field */}
          {/* Or if you want to link to a dedicated 'about' page */}
          <Link href={`/about/${aboutContent.slug}`}>Read More About Me</Link>
        </div>
      ) : (
        <p>About content coming soon!</p>
      )}

      {/* Potentially other sections */}
    </div>
  );
}

// This function runs at build time (and revalidates if ISR is enabled)
export async function getStaticProps() {
  // Fetch blog posts (existing logic)
  const { allPosts } = await Outstatic().getDocuments('posts', [
    'title',
    'slug',
    'description',
    'publishedAt',
    // Add other fields you need for posts
  ]);

  // Fetch content for the 'About' collection
  // Assuming 'About' is a singular page, we might fetch the first document
  const { allDocuments: aboutDocs } = await Outstatic().getDocuments('about', [
    'title',
    'slug',
    'description', // Example field, add others like 'content', 'image', etc.
    // Ensure you request the fields you defined in your 'About' collection schema
  ]);

  // Get the first (or only) document from the 'About' collection
  const aboutContent = aboutDocs.length > 0 ? aboutDocs[0] : null;

  return {
    props: {
      posts: allPosts,
      aboutContent: aboutContent, // Pass the about content to the HomePage component
    },
    revalidate: 60, // Incremental Static Regeneration: re-generate page every 60 seconds
  };
}
