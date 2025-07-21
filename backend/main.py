from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import subprocess
import uuid
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Servidor de descarga de TikTok activo"}

@app.get("/descargar")
def descargar_video(url: str = Query(...)):
    video_id = str(uuid.uuid4())
    output_file = f"{video_id}.mp4"

    try:
        subprocess.run([
            "yt-dlp",
            "-f", "best",
            "-o", output_file,
            url
        ], check=True)

        if os.path.exists(output_file):
            return FileResponse(path=output_file, media_type="video/mp4", filename="video.mp4")
        else:
            return {"error": "No se pudo generar el archivo"}
    except Exception as e:
        return {"error": str(e)}
