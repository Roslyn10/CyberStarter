#!/usr/bin/env python3
"""The main server that will run the quiz"""

import asyncio
import websockets
import json
from Intro_internet import quiz_questions

async def quiz_server(websocket, path):
    """
    The main server function

    Args:
        websocket: The module used to
        path: the path

    Returns:
    """
    score = 0  # Keeps track of the score/ answers given by the student

    for question in quiz_questions:
        await websocket.send(json.dumps(question))
        response = await websocket.recv()
        print(f"Student's answer: {response}")

        # Checks if the answer is correct
        if response == question["answer"]:
            score += 1

    # Sends the score to the student
    await websocket.send(json.dumps({"score": score, "total": len(quiz_questions)}))
    await websocket.close()


# Initialises the server that the website will run on
async def main():
    async with websockets.serve(quiz_server, "localhost", 1234):
        print("Server started at ws://localhost: 1234")
        await asyncio.Future() # Ensures  that the server can be run forever

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Server stopped by user")
