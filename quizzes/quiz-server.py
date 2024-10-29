#!/usr/bin/env python3
"""The server that will run multiple quiz modules."""

import asyncio
import websockets
import json
from Intro_internet import quiz_questions as intro_quiz_questions
from Internet_safety import quiz_question as safety_quiz_questions
from Websites import quiz_questions as websites_quiz_questions
from Cyberbullying import quiz_question as cyberbullying_quiz_questions
from Email_basics import quiz_questions as email_quiz_questions

# Dictionary to store all quiz modules
quiz_modules = {
    "intro": intro_quiz_questions,
    "safety": safety_quiz_questions,
    "websites": websites_quiz_questions,
    "cyberbullying": cyberbullying_quiz_questions,
    "email": email_quiz_questions
}

async def quiz_server(websocket, path):
    """
    The main server function for the quiz modules.

    Args:
        websocket: The WebSocket connection.
        path: the path (not used here).

    Returns:
    """
    # Receive the requested module name from the client
    module_request = await websocket.recv()
    module_name = json.loads(module_request).get("module")

    # Validate and select quiz questions based on the requested module
    if module_name in quiz_modules:
        questions = quiz_modules[module_name]
        score = 0  # Track the student's score

        for question in questions:
            await websocket.send(json.dumps(question))
            response = await websocket.recv()
            print(f"Student's answer: {response}")

            # Check if the answer is correct
            if response == question["answer"]:
                score += 1

        # Send the final score to the student
        await websocket.send(json.dumps({"score": score, "total": len(questions)}))
    else:
        # Send an error message if the module is invalid
        await websocket.send(json.dumps({"error": "Invalid module requested"}))

    await websocket.close()

# Initialize and run the server
async def main():
    async with websockets.serve(quiz_server, "localhost", 1234):
        print("Server started at ws://localhost:1234")
        await asyncio.Future()  # Run the server forever

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Server stopped by user")
