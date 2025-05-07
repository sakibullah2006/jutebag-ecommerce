
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { NextRequest, NextResponse } from 'next/server';

const wooCommerce = new WooCommerceRestApi({
    url: "https://axessories.store/headless",
    consumerKey: process.env.WC_CONSUMER_KEY! as string,
    consumerSecret: process.env.WC_CONSUMER_SECRET! as string,
    version: "wc/v3",
    queryStringAuth: true 
});

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  const { path } = await params;
  const endpoint = path.join('/');
  const url = new URL(req.url);
  const queryParams = Object.fromEntries(url.searchParams);

  try {
    const response = await wooCommerce.get(endpoint, queryParams);
    return NextResponse.json(response.data, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`GET API Error [${endpoint}]:`, error.message);
    return NextResponse.json(
      { error: error.message, code: error.response?.data?.code || 'unknown' },
      { status: error.response?.status || 500 }
    );
  }
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  const { path } = await params;
  const endpoint = path.join('/');
  const body = await req.json();

  try {
    const response = await wooCommerce.post(endpoint, body);
    return NextResponse.json(response.data, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`POST API Error [${endpoint}]:`, error.message);
    return NextResponse.json(
      { error: error.message, code: error.response?.data?.code || 'unknown' },
      { status: error.response?.status || 500 }
    );
  }
}
