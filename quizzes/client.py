#!/usr/bin/env python3

"""Example client"""
import asyncio
import websockets
import json

async def quiz_client():
    async with websockets.connect("ws://localhost:6789") as websocket:
        while True:
            question_data = await websocket.recv()
            
            # Attempt to parse the received data as JSON
            try:
                question = json.loads(question_data)
                
                # Check if it's a score message
                if "score" in question:
                    print(f"Your score: {question['score']} out of {question['total']}")
                    break  # Exit the loop after displaying the score
                
                # Display the question and options
                print(question["question"])
                for idx, option in enumerate(question["options"], start=1):
                    print(f"{idx}. {option}")

                # Get the user's answer
                answer = input("Your answer: ")
                await websocket.send(answer)

            except json.JSONDecodeError:
                print("Error: Could not decode the message from the server.")
                break

if __name__ == "__main__":
    asyncio.run(quiz_client())

