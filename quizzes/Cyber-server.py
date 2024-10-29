#!/usr/bin/env python3
"""The server that runs the quiz questions for the website module"""

import asyncio
import websockets
import json
from Cyberbullying import quiz_question

async def quiz_server(websocket, path):
    """The server that contains the quiz questions for the cyberbullying module

    Args:
        websocket:
        path:

    Return:
    """

    score = 0 # Keeps track of the score/ answers given by the student

    for question in quiz_question:
        await websocket.send(json.dumps(question))
        respose = await websocket.recv()
        print(f"Student's answer: {response}")

        # Checks if the answer is correct
        if response == question["answer"]:
            score += 1

    # Sends the score to the student
    await websocket.send(json.dumps({"score": score, "total": len(quiz_question)}))
    await websocket.close

# Initialises the server that the website will run on
async def main():
    async with websockets.serve(quiz_server, "localhost", 1234):
        print("Server started at ws://localhost: 1234")
        await asyncio.Future() # Ensures that the server can be run forever

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Server stopped by user")
