import type { Stripe } from "stripe";
import { getPayload } from "payload";
import { NextResponse } from "next/server";

import config from "@payload-config";

import { stripe } from "@/lib/stripe";
import { ExpandedLineItem } from "@/modules/checkout/types";

/**
 * Handles incoming Stripe webhook POST requests for permitted event types.
 *
 * Verifies the Stripe webhook signature, processes supported events (currently only "checkout.session.completed"), and creates order records in Payload CMS based on the checkout session data. Returns appropriate HTTP responses for verification failures, processing errors, or successful receipt.
 *
 * @param req - The incoming HTTP request containing the Stripe webhook payload.
 *
 * @returns A JSON response indicating the result of webhook processing.
 *
 * @throws {Error} If the event type is permitted but required data is missing, the user is not found, or line items are absent in the checkout session.
 * @remark Only the "checkout.session.completed" event type is currently handled; all others will result in an error.
 */
export async function POST(req: Request) {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";

    if (error! instanceof Error) {
      console.log(error);
    }

    console.log(`❌ Error Message: ${errorMessage}`);

    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  console.log("✅ Success: ", event.id);

  const permittedEvents: string[] = ["checkout.session.completed"];

  const payload = await getPayload({ config });

  if (permittedEvents.includes(event.type)) {
    let data;

    try {
      switch (event.type) {
        case "checkout.session.completed":
          data = event.data.object as Stripe.Checkout.Session;

          if (!data.metadata?.userId) {
            throw new Error("User ID is required");
          }

          const user = await payload.findByID({
            collection: "users",
            id: data.metadata.userId,
          });

          if (!user) {
            throw new Error("User not found");
          }

          const expandedSession = await stripe.checkout.sessions.retrieve(
            data.id,
            {
              expand: ["line_items.data.price.product"],
            }
          );

          if (
            !expandedSession.line_items?.data ||
            !expandedSession.line_items.data.length
          ) {
            throw new Error("No line items found");
          }

          const lineItems = expandedSession.line_items
            .data as ExpandedLineItem[];

          for (const item of lineItems) {
            await payload.create({
              collection: "orders",
              data: {
                stripeCheckoutSessionId: data.id,
                user: user.id,
                product: item.price.product.metadata.id,
                name: item.price.product.name,
              },
            });
          }
          break;

        default:
          throw new Error(`Unhandled Event: ${event.type}`);
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Webhook handler failed" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Received" }, { status: 200 });
}
