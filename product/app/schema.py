from pydantic import BaseModel
from typing import Optional

class Product(BaseModel):
    id: Optional[int]  # Опционально, так как это первичный ключ и может быть автоматически генерируемым значением
    bank_name: str
    credit_name: Optional[str]
    min_percent: float
    max_precent: float
    min_scoring: int = 0
    max_sum: float
    max_months: Optional[int]
    type: str
    adiitional_params: Optional[str]
