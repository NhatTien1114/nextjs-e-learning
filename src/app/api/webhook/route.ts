import { createUser } from "@/lib/action/user.action";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

// const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

export async function POST(req: Request) {
    const svix_id = (await headers()).get("svix-id") ?? "";
    const svix_timestamp = (await headers()).get("svix-timestamp") ?? "";
    const svix_signature = (await headers()).get("svix-signature") ?? "";

    if (!process.env.WEBHOOK_SECRET) {
        throw new Error("MISSING WEBHOOK SECRET");
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const sivx = new Webhook(process.env.WEBHOOK_SECRET);

    let msg: WebhookEvent;

    try {
        msg = sivx.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        return new Response("Bad Request", { status: 400 });
    }

    const eventType = msg.type;
    if (eventType === "user.created") {
        // create user
        const { id, email_addresses, username, image_url } = msg.data;
        const user = await createUser({
            clerkId: id,
            username: username!,
            email: email_addresses[0].email_address,
            avatar: image_url,
            name: username!,
        });

        return NextResponse.json({
            message: "User created successfully",
            user,
        })
    }
    console.log(eventType);

    // Rest

    return new Response("OK", { status: 200 });
}