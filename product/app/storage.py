from typing import List
import json
from .schema import Product
from pydantic import BaseModel
from typing import Optional
import os

working_directory = os.path.dirname(os.path.abspath(__file__))

class Filter(BaseModel):
    type: Optional[str]
    min_percent: Optional[float]
    max_percent: Optional[float]
    scoring: Optional[int]
    max_sum: Optional[float]
    max_months: Optional[int]
    
class InMemoryStorage:
    def __init__(self, file_name: str):
        self.products: List[Product] = self._load_products(file_name)

    def GetAllProducts(self, filter: Optional[Filter] = None) -> List[Product]:
        if filter:
            filtered_products = self.products
            if filter.type:
                filtered_products = [p for p in filtered_products if p.type == filter.type]
            if filter.min_percent is not None:
                filtered_products = [p for p in filtered_products if p.min_percent >= filter.min_percent]
            if filter.max_percent is not None:
                filtered_products = [p for p in filtered_products if p.max_precent <= filter.max_percent]
            if filter.scoring is not None:
                filtered_products = [p for p in filtered_products if p.min_scoring <= filter.scoring]
            if filter.max_sum is not None:
                filtered_products = [p for p in filtered_products if p.max_sum <= filter.max_sum]
            if filter.max_months is not None:
                filtered_products = [p for p in filtered_products if p.max_months and p.max_months <= filter.max_months]
            
            return filtered_products
        else:
            return self.products

                

    def _load_products(self, file_name) -> List[Product]:
        try:
            with open(os.path.join(working_directory,file_name), 'r') as file:
                product_dicts = json.load(file)
                return [Product(**product_dict) for product_dict in product_dicts]
        except FileNotFoundError:
            return []
