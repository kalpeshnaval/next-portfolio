import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

const BlogPage = async () => {
  const posts : Post[] = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    take: 2,
  });
  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Button variant={"ghost"} asChild className="mb-8">
          <Link href={"/"}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-8">Blog</h1>
        {posts.length > 0? (<div>
            {posts.map((post : Post) => <Card 
            className="hover:bg-accent transition-colors mb-2"
              key={post.id}>
                <Link href={`/blog/${post.slug}`}>
              <CardHeader className="mb-3">
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
      </div>
    </main>
  );
};

export default BlogPage;
