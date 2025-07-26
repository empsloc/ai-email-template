import { generateEmailTemplate } from "@/config/AIModel"
import { NextResponse } from "next/server"

export async function POST(req:any) {
    const {prompt} = await req.json()
    try {
        const result = await generateEmailTemplate(prompt)
        const aiResp = result
        console.log(aiResp)
        return NextResponse.json(JSON.parse(aiResp))
    } catch (e) {
        return NextResponse.json({error:e})
    }
    
    
}