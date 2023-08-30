import axios from 'axios'

export const CatalogService = {
    async getCatalog(params){
        const response = await axios.get(`https://${process.env.REACT_APP_GATEWAY_ID}.apigw.yandexcloud.net/data`, {params: params})
        return response
    }
}
