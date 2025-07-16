// src/app/(web)/page.tsx

// Assuming Outstatic is configured correctly in your project (e.g., in a lib/outstatic.ts)
import { Outstatic } from 'outstatic';
import Link from 'next/link';
// If you use Next.js Image component, make sure it's imported
import Image from 'next/image';

// This is a React Server Component, so you can use `async/await` directly.
export default async function HomePage() {
  // Fetch ALL published posts
  const { allPosts } = await Outstatic().getDocuments('posts', [
    'title',
    'slug',
    'coverImage', // If your posts have a cover image
    'description',
    'publishedAt',
  ]);

  // Fetch ALL published projects
  const { allDocuments: projects } = await Outstatic().getDocuments('projects', [
    'title',
    'slug',
    'coverImage', // If your projects have a cover image
  ]);

  // Fetch content for the 'About' collection
  // Assuming 'About' is a singular page (e.g., 'about-me'), you might fetch one document.
  // Make sure 'about' is the exact slug of your collection in Outstatic.
  const { allDocuments: aboutDocs } = await Outstatic().getDocuments('about', [
    'title',
    'slug',
    'content', // Fetch the main content field for the About page
    'description', // If you have a short description field
  ]);

  // If you expect only one 'About' document, take the first one
  const aboutContent = aboutDocs.length > 0 ? aboutDocs[0] : null;

  return (
    <div className="min-h-screen">
      <main>
        <div className="max-w-6xl mx-auto px-5">

          {/* Existing Introduction Section */}
          <section className="mt-16 mb-16 md:mb-12">
            <div className="prose lg:prose-2xl home-intro">
              <h2>Hello!</h2>
              <h1>I'm Tomas, nice to meet you.</h1>
              <p>
                {/* Ensure your image path is correct, or fetch it from Outstatic if it's dynamic */}
                <Image src="/images/screenshot-2025-07-12-at-11.41.24-kwNj.png" alt="" width={500} height={300} />
              </p>
              <p>I am a surfer + musician + software developer + designer. I have done some cool projects I want to share here</p>
            </div>
          </section>

          {/* New About Section (if content exists) */}
          {aboutContent && (
            <section id="about-me" className="mt-16 mb-16 md:mb-12">
              <h2 className="mb-8 text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
                {aboutContent.title || 'About Me'}
              </h2>
              <div className="prose lg:prose-xl">
                {/* Render the 'content' field from your About document.
                    If 'content' is Markdown/MDX, you'll need a markdown renderer library
                    like 'react-markdown' or 'next-mdx-remote' here.
                    For a simple text field: */}
                <p>{aboutContent.description}</p>
                {/* Or if you want a link to a dedicated about page: */}
                {aboutContent.slug && (
                  <Link href={`/about/${aboutContent.slug}`} className="underline">
                    Read More
                  </Link>
                )}
                {/* If aboutContent.content is raw HTML (less common/recommended): */}
                {/* <div dangerouslySetInnerHTML={{ __html: aboutContent.content }} /> */}
              </div>
            </section>
          )}

          {/* Existing Posts Section */}
          <section id="posts">
            <h2 className="mb-8 text-5xl md:text-6xl font-bold tracking-tighter leading-tight">Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-6 lg:gap-x-8 gap-y-5 sm:gap-y-6 lg:gap-y-8 mb-8">
              {allPosts.length === 0 ? (
                <p>No blog posts found yet. Create some in the Outstatic dashboard!</p>
              ) : (
                allPosts.map((post) => (
                  <Link href={`/posts/${post.slug}`} key={post.slug}>
                    <div className="cursor-pointer border project-card rounded-md md:w-full scale-100 hover:scale-[1.02] active:scale-[0.97] motion-safe:transform-gpu transition duration-100 motion-reduce:hover:scale-100 hover:shadow-xs overflow-hidden">
                      {post.coverImage && (
                        <div className="sm:mx-0">
                          <Image
                            alt={`Cover Image for ${post.title}`}
                            src={post.coverImage}
                            width={3840} // Or appropriate dimensions
                            height={2160} // Or appropriate dimensions
                            className="object-cover object-center w-full h-auto"
                            priority // Consider lazy loading if many images
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="text-xl mb-2 leading-snug font-bold hover:underline">{post.title}</h3>
                        <div className="text-md mb-4 text-slate-700">
                          {/* Display tags if applicable */}
                          {/* {post.tags && post.tags.map(tag => <span key={tag}>{tag}</span>)} */}
                        </div>
                        <p className="text-lg leading-relaxed mb-4">{post.description}</p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>

          {/* Existing Projects Section */}
          <section id="projects">
            <h2 className="mb-8 text-5xl md:text-6xl font-bold tracking-tighter leading-tight">Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-6 lg:gap-x-8 gap-y-5 sm:gap-y-6 lg:gap-y-8 mb-8">
              {projects.length === 0 ? (
                <p>No projects found yet.</p>
              ) : (
                projects.map((project) => (
                  <Link href={`/projects/${project.slug}`} key={project.slug}>
                    <div className="cursor-pointer border project-card rounded-md md:w-full scale-100 hover:scale-[1.02] active:scale-[0.97] motion-safe:transform-gpu transition duration-100 motion-reduce:hover:scale-100 hover:shadow-xs overflow-hidden">
                      {project.coverImage && (
                        <div className="sm:mx-0">
                          <Image
                            alt={`Cover Image for ${project.title}`}
                            src={project.coverImage}
                            width={3840}
                            height={2160}
                            className="object-cover object-center w-full h-auto"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <h2 className="p-2 bg-opacity-80 bg-white text-center whitespace-nowrap font-bold text-3xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 shadow-lg rounded-lg">
                        {project.title}
                      </h2>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
      <footer className="bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-5 p-10">
          <h3 className="font-semibold text-2xl mb-10 lg:mb-0 lg:pr-4">
            Sample website built with{' '}
            <a className="underline" href="https://outstatic.com/">
              Outstatic
            </a>{' '}
            and{' '}
            <a className="underline" href="https://nextjs.org/">
              Next.js
            </a>
          </h3>
        </div>
      </footer>
    </div>
  );
}

// Next.js App Router's data fetching (using fetch API) automatically caches and revalidates.
// For Outstatic, ensure your build process fetches the latest from Git.
// You might want to consider `revalidatePath` or `revalidateTag` if you want
// more explicit control over revalidation without a full rebuild on content changes.
// Learn more: https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating
