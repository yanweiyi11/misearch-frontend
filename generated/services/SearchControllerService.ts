/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_Page_ } from '../models/BaseResponse_Page_';
import type { SearchRequest } from '../models/SearchRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SearchControllerService {
    /**
     * doSearch
     * @param category category
     * @param searchRequest searchRequest
     * @returns BaseResponse_Page_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doSearchUsingPost(
        category: string,
        searchRequest: SearchRequest,
    ): CancelablePromise<BaseResponse_Page_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/search/{category}',
            path: {
                'category': category,
            },
            body: searchRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
