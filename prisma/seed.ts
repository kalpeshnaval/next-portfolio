import prisma from "@/lib/prisma";

async function main() {
  const userPosts = [
    {
    slug: "nextjs-16-future-of-fullstack-react",
    title: "Next.js 16: The Future of Full-Stack React Development",
    content:
      "Next.js has consistently pushed the boundaries of modern web development, and Next.js 16 takes this evolution even further. Built on top of React’s latest advancements, it focuses on performance, scalability, developer experience, and full-stack power while remaining simple and production-ready. Next.js 16 introduces a more mature App Router that improves file-based routing, nested layouts, and error handling, making large applications easier to manage. Server Components are a core feature, allowing developers to fetch data on the server, reduce client-side JavaScript, improve SEO, and keep sensitive logic secure. Server Actions remove the need for traditional API routes by enabling secure server-side mutations directly from the frontend, resulting in cleaner and more maintainable code. Performance is further enhanced through streaming, React Suspense, partial rendering, and smarter caching strategies, ensuring faster load times even on slow networks. With built-in support for databases, authentication, edge runtimes, and modern deployment platforms, Next.js 16 enables developers to build complete full-stack applications using a single framework. It is an ideal choice for React developers, startups, and teams looking to build fast, scalable, and future-ready web applications.",
  }
  ];
  for(const post of userPosts) {
    await prisma.blogPost.create({
        data: post
    })
  }
  console.log("seed data sent")
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })

  .finally(async () => {
    // await prisma.$disconnect();
  });
