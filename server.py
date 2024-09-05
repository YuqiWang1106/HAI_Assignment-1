from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

# set Middleware to allow all communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    message: str

@app.get("/")
def read_root():
    try:
        return FileResponse('static/index.html')
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found")


@app.post("/message")
async def reply_message(message: Message):
    return {"reply": "I'm a simple robot. I don't have real responses yet!"}

