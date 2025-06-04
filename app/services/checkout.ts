import HttpClient from "~/lib/http_client";
import { UrlBuilder } from "~/lib/url_builder";

export const checkoutOrder = async (order: unknown) => {
  try {
    const url = new UrlBuilder({ path: 'CHECKOUT_V1_POST' }).build();
    const response = await new HttpClient(url).post<{ data: unknown }>("", order);
    return response.data;
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};