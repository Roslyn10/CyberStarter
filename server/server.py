#!/usr/bin/env python3
"""An example of the server using websocket"""

import asyncio
import websockets


async def greeting(websocket):
    name = await websocket.recv()
    print(f"Server Recieved: {name}")
    welcome = f'Welcome {name}!'

    await websocket.send(welcome)
    print(f'Server sent: {welcome}')


async def main():
    async with websockets.serve(greeting, "localhost", 8765):
        await asyncio.Future()  # Ensures that the code can run forever

if __name__ == "__main__":
    asyncio.run(main())
