
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, MessageCircle, Mail } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";


type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};



export default async function Home() {
  
  const posts = await prisma.blogPost.findMany({
    orderBy : {createdAt : "desc"},
    take : 2
  })

  // const posts = []

  return (
    <main 
    className="min-h-screen"
    >

      {/* Header section */}

      <section className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Hi, I&apos;m Kalpesh Naval</h1>
        <p className="text-muted-foreground text-lg max-w-md mb-6">Full-Stack Developer building modern, fast & scalable web apps with <span className="font-semibold">Next.js & TypeScript</span></p>
        
        <div className="sm:flex sm:gap-4 space-x-2 space-y-2 grid">
          <Button asChild>
            <Link href={"/blog"}>Read Blog</Link>
          </Button>
          <Button variant={"outline"} asChild>
            <Link href={"/comments"}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Leave a Comment
            </Link>
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 transition-colors" asChild>
            <Link href={"mailto:kalpeshnaval@outlook.com"}>              
              <Mail className="w-4 h-4 mr-2" /> Contact Me
            </Link>
          </Button>
        </div>
      </section>

      {/* Tech Stack I work with */}

      <section className="pb-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Tech Stack I Work With</h2>
        <div className="space-x-2 space-y-2">
          <Button variant={"secondary"}>Next.js</Button>
          <Button variant={"secondary"}>React</Button>
          <Button variant={"secondary"}>Tailwind</Button>
          <Button variant={"secondary"}>shadcn/ui</Button>
          <Button variant={"secondary"}>Node.js</Button>
          <Button variant={"secondary"}>Prisma</Button>
          <Button variant={"secondary"}>PostgreSQL</Button>
          <Button variant={"secondary"}>MongoDB</Button>
          <Button variant={"secondary"}>Git & GitHub</Button>
        </div>
      </section>

      {/* About me section */}

      <section className="pb-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="text-muted-foreground mb-4">
          I&apos;m a full-stack developer specializing in building real-world web applications using Next.js and TypeScript. I enjoy turning complex problems into clean, scalable solutions, and I&apos;m always eager to learn new technologies.
        </p>
        <p className="text-muted-foreground">
          Currently, I&apos;m focused on building production-ready full-stack projects. When i&apos;m not coding, I enjoy <span className="text-semibold">cooking</span> and sharing my secreat recepies.
        </p>

      </section>

      {/* Reace posts section*/}

      <section className="pb-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>

          {posts.length > 0? (<div>
            {posts.map((post : Post) => <Card 
            className="hover:bg-accent transition-colors mb-2"
              key={post.id}>
                <Link href={`/blog/${post.slug}`}>
              <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                {new Date(post.createdAt).toLocaleDateString()}
              </CardDescription>
              </CardHeader>
              </Link>
            </Card>)}
          </div>) : (<p className="text-muted-foreground">
          No posts yet.
        </p>)}
        <Button variant={"link"} asChild className="mt-4 px-0">
          <Link href={"/blog"}>
          View all posts <ArrowRight className="w-4 h-4 ml-1"/>
          </Link>
        </Button>
      </section>
    </main>
  );
}
