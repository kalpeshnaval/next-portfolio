import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import AuthButton from "@/components/AuthButton"
import CommentForm from "@/components/CommentForm"
import CommentList from "@/components/CommentList"


const CommentsPage = async() => {
    const comments = await prisma.comment?.findMany({
        include: {user : true},
        orderBy: {createdAt : "desc"}
    })
  return (
    <main className="min-h-screen">
        <div className="max-w-2xl mx-auto">
            <Button variant={"ghost"} asChild className="mb-8">
                <Link href={"/"}>
                <ArrowLeft className="w-4 h-2 mr-2" />
                Back to Home
                </Link>
            </Button>
            <h1 className="text-exl font-bold mb-2">Comments</h1>
            <p className="text-muted-foreground mb-8">
                Sign in with Google to leave a comment or message.
            </p>
            <div className="mb-8">
                <AuthButton />
            </div>
            <CommentForm />
            <div className="mt-12">
                <h2 className="text-xl font-semibold mb-4">
                    All comments ({comments?.length})
                </h2>
                <CommentList comments={comments} />
            </div>
        </div>
    </main>
  )
}

export default CommentsPage