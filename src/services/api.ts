import { generateXAuthValue } from '@/helpers'
import {
    TFilterRequest,
    TFilterResponse,
    TGetFieldsRequest,
    TGetFieldsResponse,
    TGetFieldsParams,
    TGetIdsRequest,
    TGetIdsResponse,
    TGetIdsParams,
    TGetItemsRequest,
    TGetItemsResponse,
    TGetItemsParams,
    TFieldsProps
} from '@/types/services.types'
import axios, { AxiosResponse } from 'axios'

const API_URL = 'https://api.valantis.store:41000'

export const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-Auth': generateXAuthValue()
    }
})

export const valantisApi = {
    async getIds(idsParams: TGetIdsParams) {
        return instance
            .post<
                TGetIdsResponse,
                AxiosResponse<TGetIdsResponse>,
                TGetIdsRequest
            >('', {
                action: 'get_ids',
                params: idsParams
            })
            .then(res => res.data.result)
    },
    async getItems(itemsParams: TGetItemsParams) {
        return instance
            .post<
                TGetItemsResponse,
                AxiosResponse<TGetItemsResponse>,
                TGetItemsRequest
            >('', {
                action: 'get_items',
                params: itemsParams
            })
            .then(res => res.data.result)
    },
    async getFields(fieldsParams?: TGetFieldsParams) {
        return instance
            .post<
                TGetFieldsResponse,
                AxiosResponse<TGetFieldsResponse>,
                TGetFieldsRequest
            >('', {
                action: 'get_fields',
                params: fieldsParams
            })
            .then(res => res.data)
    },
    async filter(filterParams: TFieldsProps) {
        return instance
            .post<
                TFilterResponse,
                AxiosResponse<TFilterResponse>,
                TFilterRequest
            >('', {
                action: 'filter',
                params: filterParams
            })
            .then(res => res.data)
    }
}
