import HttpClient from "~/lib/http_client";
import { UrlBuilder } from "~/lib/url_builder";
import type { Address } from "~/components/features/checkout/address-form";

export const createAddress = async (address: Address) => {
  try {
    const url = new UrlBuilder({ path: 'ADDRESS_V1_CREATE' }).build();
    const response = await new HttpClient(url).post<{ data: Address }>('' , address);
    return response.data;
  } catch (error) {
    console.error('Error creating address:', error);
    throw error;
  }
};
