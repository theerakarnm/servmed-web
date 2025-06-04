import HttpClient from "~/lib/http_client";
import { UrlBuilder } from "~/lib/url_builder";

export type ConfigResponse = {
  key: string;
  value: {
    image: string;
  };
};

export const getConfigByKey = async (
  key: string,
): Promise<ConfigResponse | null> => {
  try {
    const url = new UrlBuilder({ path: 'CONFIG_V1_GET' })
      .param('configKey', key)
      .build();
    const response = await new HttpClient(url).get<{ data: ConfigResponse }>('');
    return response.data;
  } catch (error) {
    console.error('Error fetching config:', error);
    return null;
  }
};
