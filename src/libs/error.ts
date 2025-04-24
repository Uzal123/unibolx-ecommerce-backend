// Enum to define the various HTTP error types.
enum HTTP_ERRORS {
  INTERNAL_SERVER = 'INTERNAL_SERVER', // Internal Server Error (500)
  UNAUTHORIZED = 'UNAUTHORIZED', // Unauthorized access (401)
  BAD_REQUEST = 'BAD_REQUEST', // Bad Request (422)
  NOT_FOUND = 'NOT_FOUND', // Not Found (404)
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE', // Service Unavailable (503)
}

// Type that allows values from the HTTP_ERRORS enum, representing different HTTP error types.
type HttpErrors = `${HTTP_ERRORS}`;

// Common structure for all HTTP error payloads. Contains essential error information.
interface HttpErrorPayloadCommon {
  code: number; // The HTTP status code (e.g., 400, 404, 500)
  type: HttpErrors; // The type of error from the HTTP_ERRORS enum
  message?: string; // An optional error message providing more context about the error
}

// Interface for a Bad Request error (HTTP status 422), extending the common error payload.
interface HttpErrorPayloadBadRequest extends HttpErrorPayloadCommon {
  code: 422; // Overrides the code to 422 for Bad Request errors.
  type: HTTP_ERRORS.BAD_REQUEST; // Enforces the error type to 'BAD_REQUEST'.

  // Indicates whether the missing parameter is expected in the request body or query string.
  requiredIn: 'body' | 'query';
}

// Union type for different types of HTTP error payloads. It can either be a general error or a specific Bad Request error.
export type HttpErrorPayload =
  | HttpErrorPayloadCommon // General error payload structure
  | HttpErrorPayloadBadRequest; // Specific structure for Bad Request errors
