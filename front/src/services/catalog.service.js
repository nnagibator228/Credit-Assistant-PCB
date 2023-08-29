import axios from 'axios'

export const CatalogService = {
    async getCatalog(params){
        const response = await axios.get("https://d5d1p7k8v7pttgf3dp83.apigw.yandexcloud.net/data", {params: params})
        return response
    }
}