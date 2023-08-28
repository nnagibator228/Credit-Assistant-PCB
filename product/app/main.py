from typing import Optional, List
import yaml
import logging
from fastapi import FastAPI, Response
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.requests import Request
from fastapi.responses import JSONResponse
from starlette import status
from .schema import Product
from .storage import InMemoryStorage, Filter

logger = logging.getLogger('my_logger') 
logger.setLevel(logging.DEBUG)
app = FastAPI()

storage = InMemoryStorage('mock_data.json')


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content=jsonable_encoder(
            {"detail": exc.errors(), "Error": "Name field is missing"}),
    )

@app.get("/")
def inspect():
    return 'wokring... '

@app.get("/api/products", response_model=List[Product])
def get_products(
        type: Optional[str] = None,
        min_percent: Optional[float] = None,
        max_percent: Optional[float] = None,
        scoring: Optional[int] = None,
        max_sum: Optional[float] = None,
        max_months: Optional[int] = None
):

    filter = Filter(
        type=type,
        min_percent=min_percent,
        max_percent=max_percent,
        scoring=scoring,
        max_sum=max_sum,
        max_months=max_months
    )
    logger.debug(storage.GetAllProducts(filter))
    return storage.GetAllProducts(filter)


@app.get("/openapi.yaml", tags=["docs"], summary="Retrieve OpenAPI schema in YAML format")
async def get_openapi_yaml():
    openapi_schema = app.openapi()
    openapi_yaml = yaml.dump(openapi_schema)
    return Response(content=openapi_yaml, media_type="application/x-yaml")