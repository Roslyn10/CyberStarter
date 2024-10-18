#!/usr/bin/env python3
"""Example quiz"""

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
# guesses = []
# score = 0

# Loop through each question
"""for question_num in range(len(questions)):
    print("----------------")
    print(questions[question_num])
    for option in options[question_num]:
        print(option)

    guess = input("Enter (A, B, C, D): ").upper()
    guesses.append(guess)

    if guess == answers[question_num]:
        score += 1
        print("CORRECT!! :)")
    else:
        print("INCORRECT!! :(")
        print(f"{answers[question_num]} is the correct answer")

# Print final score
print(f"Your final score is {score}/{len(questions)}")"""
