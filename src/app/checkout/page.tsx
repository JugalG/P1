import Link from "next/link";

export default function CheckoutPage() {
    return (
        <main className="thank-you-container govuk-!-padding-6">
            <div className="govuk-panel govuk-panel--confirmation">
                <h1 className="govuk-panel__title">
                    Thank You for Your Purchase!
                </h1>
                <div className="govuk-panel__body">
                    We have received your order. You will get a confirmation shortly.
                </div>
            </div>

            <p className="govuk-body-l govuk-!-margin-top-6">
                If you have any questions, contact our support team at <strong>support@zodiac.com</strong>.
            </p>

            <Link href="/" className="govuk-button govuk-!-margin-top-4">
                Continue Shopping
            </Link>
        </main>
    );
}