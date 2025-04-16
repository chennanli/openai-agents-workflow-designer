from agents import Agent, Runner
import asyncio

assistant = Agent(
    name="assistant",
    instructions="You are a helpful assistant.",
)

async def main():
    result = await Runner.run(assistant, input="用Python实现斐波那契数列")
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
