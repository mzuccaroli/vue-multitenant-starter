import axios, { InternalAxiosRequestConfig } from "axios";
import loggerService from "@/services/loggerService.ts";
import tenantService from "@/services/tenantService.ts";

const _requestHandler = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  config.headers["tenant_code"] = tenantService.getTenant();
  //here you can handle auth headers ;)
  return config;
};

export default function start(): void {
  axios.interceptors.request.use(
    (request) => _requestHandler(request),
    (error) => {
      loggerService.error(error);
      return Promise.reject(error);
    }
  );
}
