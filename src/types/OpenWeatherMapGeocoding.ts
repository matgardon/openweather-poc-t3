export type GeoCodingAPIResponse = {
  name: string;
  local_names: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state: string;
};

export type GeoCodingAPIResponseList = GeoCodingAPIResponse[];

export type GeoCodingAPIErrorResponse = {
  cod: string;
  message: string;
};

export type GeoCodingAPIResponseData =
  | GeoCodingAPIResponseList
  | GeoCodingAPIErrorResponse;

export type GeoCodingAPIRequestParams = {
  q: string;
  limit?: number;
  lang?: string;
  units?: string;
};

export type GeoCodingAPIRequestOptions = {
  method: "GET";
  params: GeoCodingAPIRequestParams;
};
