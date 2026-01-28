"use client"

import { useState } from "react"
import { Textarea } from "./ui/textarea"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Loader2, Send } from "lucide-react"
import { useSession } from "@/lib/auth-client"
import { Card, CardContent } from "./ui/card"


const CommentForm = () => {
    const {data: session} = useSession()
    const [content, setContent] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    async function handleSubmitForm(e: React.FormEvent) {
        e.preventDefault()
        if(!content) return

        setIsSubmitting(true)
        try {
            const res = await fetch("api/comments", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({content}),
            })

            if(res.ok) {
                setContent("");
                router.refresh()
            }

        } catch (error) {
            console.error(error)
            
        } finally {
            setIsSubmitting(false)
        }
    }

    if(!session?.user) {
        return <Card className="bg-muted/50">
            <CardContent className="p-4">
                <p className="text-muted-foreground text-center">
                    Please Sign in with Google to leave a comment.
                </p>
            </CardContent>
        </Card>
    }

  return (
    <form onSubmit={handleSubmitForm} className="flex flex-col gap-3">     
        <Textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment"
        rows={3}
        />
        <Button
        type="submit"
        disabled={isSubmitting || !content.trim()}
        className="self-end"
      >
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Send className="w-4 h-4 mr-2" />
        )}
        {isSubmitting ? "Posting..." : "Post Comment"}
      </Button>
        </form>
  )
}

export default CommentForm