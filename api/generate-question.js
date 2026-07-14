export default async function handler(request, response) {

    // Only allow POST requests

    if (request.method !== "POST") {

        return response.status(405).json({

            error: "Only POST requests are allowed."

        });

    }


    try {

        // Get data sent by frontend

        const {

            topic,

            difficulty,

            previousQuestions = []

        } = request.body;


        // Validate topic

        if (

            !topic

            ||

            topic.trim().length < 2

        ) {

            return response.status(400).json({

                error: "Please provide a valid topic."

            });

        }


        // Get API key from Vercel

        const apiKey =

        process.env.GEMINI_API_KEY;


        if (

            !apiKey

        ) {

            return response.status(500).json({

                error:

                "Gemini API key is not configured."

            });

        }


        // Prevent repeated questions

        const oldQuestions =

        previousQuestions.length > 0

        ?

        `Do not repeat these previous questions:

        ${previousQuestions.join("\n")}`

        :

        "There are no previous questions.";


        // Prompt sent to Gemini

        const prompt = `

You are an educational quiz generator for students.

Create exactly ONE multiple-choice question.

Topic:
${topic}

Difficulty:
${difficulty}

Difficulty rules:

Easy:
Use basic facts, definitions and beginner concepts.

Medium:
Use understanding, application and moderately challenging concepts.

Hard:
Use advanced concepts, reasoning and difficult applications.

Requirements:

1. Create exactly four answer options.

2. Only one answer must be correct.

3. The question must be educational and factually accurate.

4. Keep the language clear.

5. Do not repeat previous questions.

6. Return only valid JSON.

7. Do not use markdown.

${oldQuestions}

Return exactly this JSON structure:

{
    "question":
    "Question text",

    "options":
    [
        "First option",
        "Second option",
        "Third option",
        "Fourth option"
    ],

    "correctAnswer":
    0,

    "explanation":
    "Short explanation"
}

correctAnswer must be:

0 for the first option

1 for the second option

2 for the third option

3 for the fourth option

`;


        // Call Gemini API

        const geminiResponse =

        await fetch(

            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",

            {

                method: "POST",

                headers: {

                    "Content-Type":

                    "application/json",

                    "X-goog-api-key":

                    apiKey

                },

                body: JSON.stringify({

                    contents: [

                        {

                            parts: [

                                {

                                    text: prompt

                                }

                            ]

                        }

                    ],

                    generationConfig: {

                        temperature: 0.8,

                        responseMimeType:

                        "application/json"

                    }

                })

            }

        );


        // Convert Gemini response

        const geminiData =

        await geminiResponse.json();


        // Check Gemini error

        if (

            !geminiResponse.ok

        ) {

            console.error(

                "Gemini API error:",

                geminiData

            );


            return response.status(500).json({

                error:

                geminiData.error?.message

                ||

                "Gemini could not generate the question."

            });

        }


        // Get generated text

        const generatedText =

        geminiData

        .candidates?.[0]

        ?.content

        ?.parts?.[0]

        ?.text;


        if (

            !generatedText

        ) {

            return response.status(500).json({

                error:

                "Gemini returned an empty response."

            });

        }


        // Convert JSON text to JavaScript

        const questionData =

        JSON.parse(

            generatedText

        );


        // Validate generated question

        if (

            !questionData.question

            ||

            !Array.isArray(

                questionData.options

            )

            ||

            questionData.options.length !== 4

            ||

            !Number.isInteger(

                questionData.correctAnswer

            )

            ||

            questionData.correctAnswer < 0

            ||

            questionData.correctAnswer > 3

        ) {

            return response.status(500).json({

                error:

                "AI returned an invalid question."

            });

        }


        // Send question to frontend

        return response.status(200).json({

            question:

            questionData.question,


            options:

            questionData.options,


            correctAnswer:

            questionData.correctAnswer,


            explanation:

            questionData.explanation

            ||

            "Review the correct answer and continue learning."

        });


    }


    catch (

        error

    ) {


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