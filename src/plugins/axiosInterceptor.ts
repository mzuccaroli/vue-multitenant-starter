import axios, { InternalAxiosRequestConfig } from "axios";
import loggerService from "@/services/loggerService.ts";
import { useAppStore } from "@/stores/app.ts";

const _requestHandler = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const appStore = useAppStore();
  config.headers["tenant_code"] = appStore.tenant;
  config.headers["language_code"] = appStore.language;
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
