#!/usr/bin/env python3
import asyncio
import websockets
import json

# Import your quiz questions
from Intro_internet import quiz_questions as intro_questions
from Internet_safety import quiz_question as safety_questions

# Store all quiz questions in a dictionary
quizzes = {
    'intro_internet': intro_questions,
    'internet_safety': safety_questions,
}

async def quiz_server(websocket, path):
    # Receive the quiz ID from the client
    quiz_id = await websocket.recv()
    
    # Get questions for the specified quiz
    questions = quizzes.get(quiz_id)

    if questions is None:
        await websocket.send(json.dumps({"error": "Quiz not found"}))
        await websocket.close()
        return

    score = 0  # Keep track of the score

    for question in questions:
        await websocket.send(json.dumps(question))
        response = await websocket.recv()
        print(f"Student's answer: {response}")

        # Check if the answer is correct
        if response == question["answer"]:
            score += 1

    # Send the score to the student
    await websocket.send(json.dumps({"score": score, "total": len(questions)}))
    await websocket.close()

# Initialize the server
async def main():
    async with websockets.serve(quiz_server, "localhost", 1234):
        print("Server started at ws://localhost:1234")
        await asyncio.Future()  # Run the server forever

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Server stopped by user")
