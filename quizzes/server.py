#!/usr/bin/env python3
"""Example server"""

import asyncio
import websockets
import json
from quiz_data import quiz_questions

async def quiz_server(websocket, path):
    score = 0  # Initialize score

    for question in quiz_questions:
        await websocket.send(json.dumps(question))
        response = await websocket.recv()
        print(f"Client's answer: {response}")

        # Check if the response is correct
        if response == question["answer"]:
            score += 1  # Increment score if the answer is correct

    # Send the final score to the client
    await websocket.send(json.dumps({"score": score, "total": len(quiz_questions)}))
    await websocket.close()

async def main():
    async with websockets.serve(quiz_server, "localhost", 6789):
        print("Server started at ws://localhost:6789")
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())

