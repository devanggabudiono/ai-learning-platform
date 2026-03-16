import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, context, module } = await req.json();

    if (!message || !module) {
      return NextResponse.json(
        { error: 'Message and Module context are required.' },
        { status: 400 }
      );
    }

    // TODO: Connect this to the actual backend AI Model specialized for specific NIBIT modules.
    console.log(`[AI Advisor Triggered] Routing query to ${module} AI Expert. Context: ${JSON.stringify(context)}`);

    let aiResponse = "";

    // Route the logic based on the module querying the AI
    switch (module) {
        case 'finance':
            aiResponse = `Here is some financial advice regarding "${message}". Based on your goal of $5,000, consider reducing dining expenses by 15%.`;
            break;
        case 'health':
            aiResponse = `Regarding "${message}": as a student, it's vital to pair 7.5 hrs of sleep with light cardio to enhance cognitive retention for your exams.`;
            break;
        case 'tutor':
            aiResponse = `Let's break down "${message}" step-by-step. Fact: Did you know this concept is heavily tested in final exams?`;
            break;
        default:
            aiResponse = `I am your NIBIT AI. How can I assist you with "${message}" today?`;
    }

    // Simulate network delay for streaming effect realism
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({ success: true, answer: aiResponse });

  } catch (error) {
    console.error('Error with AI Advisor:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
