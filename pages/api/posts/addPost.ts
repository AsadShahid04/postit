import type {NextApiRequest, NextApiResponse} from 'next'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
 ) {
    if(req.method === "POST"){
        const session = await getServerSession(req, res, authOptions)
        if(!session)
            return res.status(401).json({message: "Please sign in to make a post"})
        
        // console.log(req.body)
        const title: string = req.body.title

        //Get User
        const prismaUser = await prisma.user.findUnique({
            where: { email: session?.user?.email}
        })

        //Check title 
        if (title.length > 300) {
            return res.status(403).json({message: "Woah, please write a shorter post."})
        }
        if (!title.length) {
            return res.status(403).json({message: "Hmm, please write a longer post."})
        } 

        //Create Post
        try {
        const result = await prisma.post.create({
            data: {
            title,
            userId: prismaUser.id,
            },
        })
        res.status(200).json(result)
        } catch (err) {
            res.status(403).json({ err: "Error has occured while making a post" })
        }
  }
}