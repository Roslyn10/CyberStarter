#!/usr/bin/env python3
"""
The main client server that will be used by the students
"""

import asyncio
import websockets
import json

async def quiz_client():
    """
    The main client server
    """

    async with websockets.connect("ws://localhost:1234") as websocket:
        while True:
            question_data = await websocket.recv()

            # Attempts to parse the received data as JSON
            try:
                question = json.loads(question_data)

                if "score" in question:
                    print(f"Your score: {question['score']} out of {question['total']}")
                    break  # Exits the loop after displaying the score

                print(question["question"])
                for idx, option in enumerate(question["options"], start=1):
                    print(f"{idx}. {option}")

                # Gets the student's answer after displaying all options
                while True:
                    answer = input("Your answer (number): ")
                    if answer.isdigit() and 1 <= int(answer) <= len(question["options"]):
                        await websocket.send(answer)
                        break  # Exit the input loop if valid input
                    else:
                        print("Please enter a valid option number.")

            except json.JSONDecodeError:
                print("Error: Could not decode the message from the server")
                break

if __name__ == "__main__":
    asyncio.run(quiz_client())
