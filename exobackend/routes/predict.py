# project/exobackend/routes/predict.py
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.responses import JSONResponse
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import io, base64, pickle, os

router = APIRouter(prefix="/predict", tags=["predict"])

# Load model once at import
MODEL_PATH = os.getenv("MODEL_PATH", os.path.join(os.path.dirname(__file__), "..", "exoplanet_model.pkl"))
with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)  # must support predict and predict_proba [web:24]

EXPECTED_FEATURES = 3197

def require_user():
    # Placeholder dependency for auth integration—replace with your real auth/session check
    return True

@router.post("")
async def predict(file: UploadFile = File(...), user=Depends(require_user)):
    if file.content_type not in ("text/csv", "application/vnd.ms-excel", "application/csv"):
        raise HTTPException(status_code=400, detail="Please upload a CSV file")
    try:
        # Read CSV to DataFrame
        content = await file.read()
        if not content:
            raise HTTPException(status_code=400, detail="CSV file is empty")
        df = pd.read_csv(io.BytesIO(content), header=None)
        if df.shape[0] == 0:
            raise HTTPException(status_code=400, detail="CSV file is empty")

        flux_data = df.iloc[0].values.astype(float)  # first row features [web:32]
        if flux_data.size != EXPECTED_FEATURES:
            return JSONResponse(
                status_code=400,
                content={"success": False, "error": f"Wrong number of features. Expected {EXPECTED_FEATURES}, got {flux_data.size}"}
            )

        X = flux_data.reshape(1, -1)

        pred = int(model.predict(X)[0])  # 1 = exoplanet? align with your training [web:24]
        proba = model.predict_proba(X)[0]

        if pred == 1:
            confidence = float(proba[1] * 100.0)
            result_text = "EXOPLANET"
            color = "#7D20BE"
        else:
            confidence = float(proba[0] * 100.0)
            result_text = "No Exoplanet Found"
            color = "#888"

        # Plot to base64
        plt.figure(figsize=(12, 4))
        plt.plot(X[0], linewidth=0.8,  color = "#C5B0D3")
        plt.title(f"Light Curve Analysis - {result_text}", color="white")
        plt.xlabel("Time", color="white")
        plt.ylabel("Flux", color="white")
        plt.grid(True, alpha=0.2, color="white")
        ax = plt.gca()
        ax.set_facecolor("#1a1a1a")
        plt.gcf().patch.set_facecolor("#1a1a1a")
        plt.tick_params(colors="white")
        buf = io.BytesIO()
        plt.savefig(buf, format="png", bbox_inches="tight", facecolor="#1a1a1a")
        plt.close()
        plot_b64 = base64.b64encode(buf.getvalue()).decode("utf-8")

        return {
            "success": True,
            "prediction": result_text,
            "confidence": f"{confidence:.2f}%",
            "plot": plot_b64,
            "color": color,
            "features": int(EXPECTED_FEATURES),
            "model": getattr(model, "__class__", type("x",(object,),{})) .__name__,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
