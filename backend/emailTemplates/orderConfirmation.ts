import { processShipments } from "../utils/processFunctions";
import type { Product } from "../types/Product";
import type { Order, Shipment } from "../types/Order";
import type { User } from "../types/User";

export const orderConfirmation = (order: Order) => {
    const user = order._user as User;
    const { shipmentCount } = processShipments(order.shipments as Shipment[]);

    const priceData = {
        total: order.total.toFixed(2) || "",
        subTotal: order.subTotal.toFixed(2) || "",
        discount: order.discount.toFixed(2) || "",
        delivery: shipmentCount.toFixed(2) || "",
    };

    return `
    <!DOCTYPE html>
    <html>
        <head>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                }
            </style>
        </head>
        <body
            style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;"
        >
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px 0">
                <tr>
                    <td align="center">
                        <table width="600px" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; padding: 20px;">
                            <!-- Header -->
                            <tr>
                                <td align="center" style="padding: 20px 0">
                                    <h1 style="margin: 0; color: #333">Ecommerce</h1>
                                    <p style="margin: 5px 0; color: #555">Order Confirmation</p>
                                </td>
                            </tr>

                            <!-- Order Details -->
                            <tr>
                                <td style="padding: 20px">
                                    <p style="font-size: 16px; margin: 0">Hi <strong>${
                                        user.firstName + " " + user.lastName
                                    }</strong>,</p>
                                    <p style="font-size: 14px; color: #555">Thank you for your purchase! Below are your order details:</p>
                                    
                                    <!-- Product Details (Table-Based Layout) -->
                                    ${order.items
                                        .map((item: any) => {
                                            const product =
                                                item._product as Product;
                                            return `
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px; padding-bottom: 16px;">
                                            <tr>
                                                <td style="width: 80px; padding-right: 16px;">
                                                    <img src="${product.imageUrl[0]}" alt="${product.title}" style="width: 80px; height: 96px; object-fit: cover; object-position: top; border-radius: 4px;" />
                                                </td>
                                                <td>
                                                    <p style="font-weight: 600; margin: 0">${product.brand}</p>
                                                    <p style="margin: 0">${product.title}</p>
                                                    <p style="font-size: 14px; color: #555; margin: 0">Color: ${item.color}</p>
                                                    <p style="font-size: 14px; color: #555; margin: 0">Size: ${item.size}</p>
                                                    <p style="font-size: 14px; color: #555; margin: 0">SKU: ${product.sku}</p>
                                                </td>
                                                <td align="right" style="font-weight: 600;">
                                                    $${item.unitPrice}
                                                </td>
                                            </tr>
                                        </table>
                                        `;
                                        })
                                        .join("")}

                                    <!-- Total Cost Section (Table-Based Layout) -->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 24px; border-top: 1px solid #ddd; padding-top: 16px;">
                                        <tr>
                                            <td style="font-size: 24px; font-weight: 600; padding-bottom: 16px;">Total Cost</td>
                                        </tr>
                                        <tr>
                                            <td style="font-size: 14px;">
                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                    <tr>
                                                        <td style="padding: 4px 0;">Subtotal:</td>
                                                        <td style="text-align: right;">$${
                                                            priceData.subTotal
                                                        }</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 4px 0;">Delivery:</td>
                                                        <td style="text-align: right;">$${
                                                            priceData.delivery
                                                        }</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 4px 0;">Discount:</td>
                                                        <td style="text-align: right;">$${
                                                            priceData.discount
                                                        }</td>
                                                    </tr>
                                                    <tr style="font-weight: bold;">
                                                        <td style="padding: 12px 0;">Total:</td>
                                                        <td style="text-align: right;">$${
                                                            priceData.total
                                                        }</td>
                                                    </tr>
                                                </table>
                                                <p style="font-size: 12px; color: #666; margin-top: 8px;">(Total cost includes VAT)</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td align="center" style="padding: 20px; border-top: 1px solid #ddd;">
                                    <p style="font-size: 12px; color: #999; margin: 0;">
                                        If you have any questions, contact us at <a href="mailto:support@ecommerce.com" style="color: #0066cc">support@ecommerce.com</a>.
                                    </p>
                                    <p style="font-size: 12px; color: #999; margin: 5px 0;">© ${new Date().getFullYear()} Ecommerce. All rights reserved.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    </html>
    `;
};
