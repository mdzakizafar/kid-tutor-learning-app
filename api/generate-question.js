export default async function handler(request, response) {

    // Only POST requests are allowed
    if (request.method !== "POST") {
        return response.status(405).json({
            error: "Only POST requests are allowed."
        });
    }

    try {

        const {
            topic,
            difficulty = "easy",
            previousQuestions = []
        } = request.body || {};


        // Validate topic
        if (
            typeof topic !== "string"
            ||
            topic.trim().length < 2
        ) {
            return response.status(400).json({
                error: "Please provide a valid quiz topic."
            });
        }


        // Read API key safely from Vercel
        const apiKey = process.env.GEMINI_API_KEY;


        if (!apiKey) {

            console.error(
                "GEMINI_API_KEY is missing."
            );

            return response.status(500).json({
                error:
                    "The AI service is not configured."
            });

        }


        // Clean user input
        const cleanTopic = topic
            .trim()
            .slice(0, 100);


        const allowedDifficulties = [
            "easy",
            "medium",
            "hard"
        ];


        const cleanDifficulty =
            allowedDifficulties.includes(
                String(difficulty).toLowerCase()
            )
                ? String(difficulty).toLowerCase()
                : "easy";


        // Limit old questions
        // Prevents the prompt from becoming too large
        const recentQuestions =
            Array.isArray(previousQuestions)
                ? previousQuestions
                    .slice(-10)
                    .map(question =>
                        String(question).slice(0, 300)
                    )
                : [];


        const oldQuestionsText =
            recentQuestions.length > 0

                ? recentQuestions
                    .map(
                        (question, index) =>
                            `${index + 1}. ${question}`
                    )
                    .join("\n")

                : "None";


        const prompt = `
You are an educational quiz generator.

Create exactly ONE multiple-choice question.

TOPIC:
${cleanTopic}

DIFFICULTY:
${cleanDifficulty}

DIFFICULTY RULES:

Easy:
Use basic facts, definitions, syntax, or beginner concepts.

Medium:
Test understanding, application, and moderately challenging concepts.

Hard:
Use advanced concepts, reasoning, debugging, or difficult applications.

PREVIOUS QUESTIONS:
${oldQuestionsText}

Do not repeat or closely rephrase any previous question.

Return exactly one valid JSON object.

Use this structure:

{
  "question": "Question text",
  "options": [
    "First option",
    "Second option",
    "Third option",
    "Fourth option"
  ],
  "correctAnswer": 0,
  "explanation": "A short educational explanation"
}

Rules:

1. Include exactly four answer options.
2. Include only one correct answer.
3. correctAnswer must be an integer from 0 to 3.
4. The question must be factually accurate.
5. Keep the explanation concise.
6. Do not use Markdown.
7. Do not include code fences.
8. Return JSON only.
`;


        /*
        Primary model:
        Gemini 3.1 Flash Lite

        Fallback:
        Gemini 3.5 Flash
        */

        const models = [

            "gemini-3.1-flash-lite",

            "gemini-3.5-flash"

        ];


        let lastError =
            "AI could not generate a question.";


        // Try primary model first.
        // If unavailable, try fallback model.

        for (const model of models) {

            try {

                const controller =
                    new AbortController();


                // Stop waiting after 25 seconds

                const timeout = setTimeout(

                    () => controller.abort(),

                    25000

                );


                const geminiResponse =
                    await fetch(

                        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,

                        {

                            method: "POST",


                            headers: {

                                "Content-Type":
                                    "application/json",

                                "X-goog-api-key":
                                    apiKey

                            },


                            signal:
                                controller.signal,


                            body: JSON.stringify({

                                contents: [

                                    {

                                        role: "user",

                                        parts: [

                                            {

                                                text:
                                                    prompt

                                            }

                                        ]

                                    }

                                ],


                                generationConfig: {

                                    temperature:
                                        0.7,

                                    responseMimeType:
                                        "application/json"

                                }

                            })

                        }

                    );


                clearTimeout(timeout);


                const geminiData =
                    await geminiResponse.json();


                // Try next model if this one fails

                if (!geminiResponse.ok) {

                    lastError =

                        geminiData
                            ?.error
                            ?.message

                        ||

                        `The ${model} model failed.`;


                    console.error(

                        `${model} error:`,

                        geminiData

                    );


                    continue;

                }


                const generatedText =

                    geminiData
                        ?.candidates
                        ?.[0]
                        ?.content
                        ?.parts
                        ?.[0]
                        ?.text;


                if (!generatedText) {

                    lastError =

                        `${model} returned an empty response.`;

                    continue;

                }


                // Convert AI response to JavaScript

                let questionData;


                try {

                    questionData =

                        JSON.parse(

                            generatedText

                        );

                }

                catch (jsonError) {

                    console.error(

                        "Invalid AI JSON:",

                        generatedText

                    );


                    lastError =

                        "AI returned an invalid response.";


                    continue;

                }


                // Validate AI output

                const isValid =

                    typeof questionData.question
                    ===
                    "string"

                    &&

                    questionData.question
                        .trim()
                        .length > 0

                    &&

                    Array.isArray(
                        questionData.options
                    )

                    &&

                    questionData.options.length
                    ===
                    4

                    &&

                    questionData.options.every(

                        option =>

                            typeof option
                            ===
                            "string"

                            &&

                            option.trim().length
                            >
                            0

                    )

                    &&

                    Number.isInteger(

                        questionData.correctAnswer

                    )

                    &&

                    questionData.correctAnswer
                    >=
                    0

                    &&

                    questionData.correctAnswer
                    <=
                    3;


                if (!isValid) {

                    lastError =

                        "AI generated an invalid question.";

                    continue;

                }


                // Successful response

                return response
                    .status(200)
                    .json({

                        question:

                            questionData
                                .question
                                .trim(),


                        options:

                            questionData
                                .options
                                .map(

                                    option =>

                                        option.trim()

                                ),


                        correctAnswer:

                            questionData
                                .correctAnswer,


                        explanation:

                            typeof questionData
                                .explanation
                            ===
                            "string"

                                ?

                                questionData
                                    .explanation
                                    .trim()

                                :

                                "Review the correct answer and continue learning.",


                        modelUsed:

                            model

                    });

            }


            catch (modelError) {

                console.error(

                    `${model} request failed:`,

                    modelError

                );


                if (

                    modelError.name

                    ===

                    "AbortError"

                ) {

                    lastError =

                        "The AI request took too long.";

                }

                else {

                    lastError =

                        "Unable to connect to the AI service.";

                }

            }

        }


        // Every model failed

        return response.status(503).json({

            error:

                "The AI quiz service is temporarily unavailable. Please try again.",


            details:

                lastError

        });

    }


    catch (error) {

        console.error(

            "Question generation error:",

            error

        );


        return response.status(500).json({

            error:

                "Unable to generate a question."

        });

    }

}