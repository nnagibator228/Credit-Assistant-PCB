import axios from 'axios'

const gw_id = process.env.GATEWAY_ID;

export const CatalogService = {
    async getCatalog(params){
        const response = await axios.get(`https://${gw_id}.apigw.yandexcloud.net/data`, {params: params})
        return response
    }
}
