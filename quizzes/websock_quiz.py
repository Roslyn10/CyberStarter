#!/usr/bin/python3
"""An exmple of the quizzes that will be displayed on the client side"""
import asyncio
import websockets

# Questions, options, and answers for the quiz
questions = (
    "How many elements are in the periodic table?:",
    "Which animal lays the largest eggs?:",
    "What is the most abundant gas in Earth's atmosphere?:",
    "How many bones are in the human body?:",
    "Which planet in the solar system is the hottest?:"
)

options = (
    ("A. 116", "B. 117", "C. 118", "D. 119"),
    ("A. Whale", "B. Crocodile", "C. Elephant", "D. Ostrich"),
    ("A. Nitrogen", "B. Oxygen", "C. Carbon-Dioxide", "D. Hydrogen"),
    ("A. 206", "B. 207", "C. 208", "D. 209"),
    ("A. Mercury", "B. Venus", "C. Earth", "D. Mars")
)

answers = ("C", "D", "A", "A", "B")

async def quiz(websocket, path):
    score = 0
    guesses = []

    # Loop through each question
    for question_num in range(len(questions)):
        await websocket.send(questions[question_num])
        await websocket.send("Options: " + ", ".join(options[question_num]))

        guess = await websocket.recv()
        guess = guess.upper()
        guesses.append(guess)

        if guess == answers[question_num]:
            score += 1
            await websocket.send("CORRECT!! :)")
        else:
            await websocket.send(f"INCORRECT!! :(\n{answers[question_num]} is the correct answer")

    # Print final score
    await websocket.send(f"Your final score is {score}/{len(questions)}")

# Start the server
start_server = websockets.serve(quiz, "localhost", 8765)

# Run the server
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
