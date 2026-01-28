import Markdown from "@/components/Markdown/Markdown"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const BlogPostPage = async({params} : {params : Promise<{slug : string}>}) => {
    const {slug} = await params

    const post = await prisma.blogPost.findUnique({
        where : {slug}
    })

    if(!post) {
        return "Not found"
    }

  return (
    <main className="min-h-screen py-16 px-4">
        <article className="max-w-3xl mx-auto">
            <Button variant={"ghost"} asChild className="mb-8">
            <Link href={"/blog"}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
            </Link>
            </Button>

            <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
            <p className="text-muted-foreground mb-8">{new Date(post?.createdAt).toLocaleDateString()}</p>
            <div className="prose dark:prose-inver max-w-none prose-neutral">
               <Markdown content={post.content} />
            </div>
        </article>
    </main>
  )
}

export default BlogPostPage