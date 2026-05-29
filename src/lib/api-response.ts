import { NextResponse } from "next/server";

export type ApiSuccess<T> = {
  data: T;
  error: null;
};

export type ApiFailure = {
  data: null;
  error: {
    code: string;
    message: string;
    details?: any;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

/**
 * Returns a standardized success API response.
 */
export function successResponse<T>(data: T, status = 200) {
  const responseBody: ApiSuccess<T> = {
    data,
    error: null,
  };
  return NextResponse.json(responseBody, { status });
}

/**
 * Returns a standardized error API response.
 */
export function errorResponse(
  code: "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "VALIDATION_ERROR" | "RATE_LIMITED" | "SERVER_ERROR" | string,
  message: string,
  status = 400,
  details?: any
) {
  const responseBody: ApiFailure = {
    data: null,
    error: {
      code,
      message,
      details,
    },
  };
  return NextResponse.json(responseBody, { status });
}
