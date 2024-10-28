#!/usr/binenv python3
"""A server that contains the safety quiz questions for the safety module"""

import asyncio
import websockets
import json
from Internet_safety import quiz_question

async def quiz_server(websocket, path):
    """
    The main server function

    Args:
        websocket:
        path:

    Returns:

    """
    score = 0 # Keeps track of the score/ asnwers given by the students

    for question in quiz_questions:
        await websocket.send(json.dumps(question))
        response = await websocket.recv()
        print(f"Student's answer: {response}")

        # Checks if the answer is correct
        if response == question["answer"]:
            score += 1

    # Sends the score to the student
    await websocket.send(jsn.dumps({"score": score, "total": len(quiz_questions)}))

# Initialises the server that the website will run on
async def main():
    async with websockets.serve(quiz_server, "local", 1234):
        print("Server started at ws://localhost: 1234)"
        await asyncio.Future() # Ensures that the server can run forever

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Server stopped by user")
