#!/usr/bin/env python3
"""An example on how to use asyncio and websockets"""

import asyncio
import websockets


async def greeting():
    uri = "ws://localhost:8765"
    async with websockets.connect(uri) as websocket:
        name = input("What is your name? ")

        await websocket.send(name)
        print(f"Client sent: {name}")

        welcome = await websocket.recv()
        print(f"Client recieved: {welcome}")

if __name__ == "__main__":
    asyncio.run(greeting())
