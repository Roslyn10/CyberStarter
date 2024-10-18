#!/usr/bin/python3
"""An example of a quizz section that uses websocket to deliver the questions to the client"""


import asyncio
import websockets

async def quiz_client():
    uri = "ws://localhost:8765"  # Ensure the URI is defined here
    async with websockets.connect(uri) as websocket:
        while True:
            question = await websocket.recv()
            if "Your final score" in question:
                print(question)
                break
            print(question)
            answer = input("Enter (A, B, C, D): ")
            await websocket.send(answer)

# Run the client
asyncio.get_event_loop().run_until_complete(quiz_client())
