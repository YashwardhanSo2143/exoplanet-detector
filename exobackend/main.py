# project/exobackend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
import database
from routes import auth
from routes import predict  # predict.router is an APIRouter

# Create all tables at startup
models.Base.metadata.create_all(bind=database.engine)  # SQLAlchemy setup [web:40][web:51]

app = FastAPI(title="Exoplanet API")
app.include_router(auth.router, prefix="/api/auth")
app.include_router(predict.router, prefix="/api")

# CORS: in dev you can use "*", but note credentials + "*" is not allowed together
# If you need cookies/Authorization headers, list explicit origins instead.
origins = ["http://localhost:3000", "http://127.0.0.1:3000"]  # prefer explicit origins [web:47][web:44]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/api/health")
def health():
    return {"ok": True}
