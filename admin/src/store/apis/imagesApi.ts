import { apiSlice } from "./apiSlice";
import {
    upload,
    ImageKitAbortError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
} from "@imagekit/react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface UploadResponse {
    fileId: string;
    url: string;
}

export const imagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadImage: builder.mutation<UploadResponse, File>({
            async queryFn(file, { signal }, _extra, baseQuery) {
                const auth = await baseQuery({
                    url: "/images/auth",
                    method: "GET",
                });
                if ("error" in auth) {
                    return { error: auth.error as FetchBaseQueryError };
                }
                const { signature, expire, token, publicKey } = auth.data as {
                    signature: string;
                    expire: string;
                    token: string;
                    publicKey: string;
                };

                try {
                    const res = await upload({
                        file,
                        fileName: file.name,
                        signature,
                        expire: Number(expire),
                        token,
                        publicKey,
                        abortSignal: signal,
                    });

                    return {
                        data: {
                            fileId: res.fileId!,
                            url: res.url!,
                        },
                    };
                } catch (err: any) {
                    const isNetwork =
                        err instanceof ImageKitUploadNetworkError ||
                        err.name === "AbortError";
                    const statusKey = isNetwork
                        ? "FETCH_ERROR"
                        : "CUSTOM_ERROR";
                    const errorPayload: FetchBaseQueryError = {
                        status: statusKey,
                        error: err.message,
                    };
                    return { error: errorPayload };
                }
            },
        }),
    }),
});

export const { useUploadImageMutation } = imagesApi;
