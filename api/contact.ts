import { Resend } from 'resend';
import clientPromise from '../src/lib/mongodb';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    message: z.string().min(1, "Message is required").max(2000, "Message too long"),
});

// Since this project is using Vite, this handler follows a standard Node.js 
// serverless function format used by platforms like Vercel/Netlify.
export default async function handler(req: any, res: any) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const body = req.body;

        // 1. Validation
        const validated = contactSchema.parse(body);

        // 2. Database Insertion
        const client = await clientPromise;
        const db = client.db(); // uses default db from connection string
        const collection = db.collection("messages");

        await collection.insertOne({
            ...validated,
            createdAt: new Date(),
        });

        // 3. Email Notification (Optional)
        if (process.env.RESEND_API_KEY) {
            try {
                await resend.emails.send({
                    from: 'Portfolio Contact <onboarding@resend.dev>',
                    to: 'varshakotegar26@gmail.com',
                    subject: `New Message from ${validated.name}`,
                    text: `Name: ${validated.name}\nEmail: ${validated.email}\n\nMessage:\n${validated.message}`,
                });
            } catch (emailError) {
                console.error('Email sending failed:', emailError);
                // We continue as database record was already successful
            }
        }

        return res.status(200).json({
            success: true,
            message: "Message stored successfully"
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                message: error.issues[0].message
            });
        }

        console.error('API Error:', error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}
