import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
  <div className="privacy-policy-page">
    <div className="privacy-policy-container">
      <header className="privacy-header">
        <h1 className="privacy-title">Terms &amp; Conditions</h1>
        <p className="privacy-subtitle">Inkpot India Pvt. Ltd.</p>
        <div className="privacy-dates">
          <span><strong>Effective Date:</strong> August 27, 2026</span>
          <span><strong>Last Updated:</strong> August 27, 2026</span>
        </div>
      </header>

      <div className="privacy-content">
        <section className="privacy-section">
          <p>Welcome to Songs of the Stone.</p>
          <p>
            These Terms &amp; Conditions (“Terms”) govern your access to and use of the Songs of the Stone website, platform and related services (collectively, the “Platform”), including browsing the Platform, creating an account, purchasing tickets, making payments and accessing other services made available through the Platform.
          </p>
          <p>
            The Platform is operated by Inkpot India Pvt. Ltd. (“Inkpot”, “we”, “us” or “our”).
          </p>
          <p>
            By accessing the Platform or using any service available through it, you agree to be legally bound by these Terms. If you do not agree with these Terms, please do not use the Platform.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">1. Using Songs of the Stone</h2>
          <p>
            Songs of the Stone is a cultural platform created to bring together music, culture, artists and audiences.
          </p>
          <p>
            Through the Platform, we may provide information about Songs of the Stone, its programmes and participating artists, and may offer tickets, registrations and other related services.
          </p>
          <p>
            We may add, modify, suspend or discontinue any part of the Platform or its services from time to time.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">2. Who Can Use the Platform</h2>
          <p>
            You must be legally competent to enter into a contract under applicable law to use the Platform and purchase tickets.
          </p>
          <p>
            If you are below 18 years of age, you may use the Platform only with the involvement and consent of your parent or legal guardian, wherever required by law.
          </p>
          <p>
            If you use the Platform on behalf of another person or entity, you confirm that you have the authority to accept these Terms on their behalf.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">3. Your Information</h2>
          <p>
            You are responsible for providing accurate, complete and current information while using the Platform. This may include your:
          </p>
          <ul>
            <li>name;</li>
            <li>mobile number;</li>
            <li>email address;</li>
            <li>billing details;</li>
            <li>payment information; and</li>
            <li>other information required to complete a transaction.</li>
          </ul>
          <p>Please make sure that the details provided by you are correct.</p>
          <p>
            We will not be responsible for any issue arising because incorrect or incomplete information was provided by you.
          </p>
        </section>

        <p className="legal-group-heading">Ticketing</p>

        <section className="privacy-section">
          <h2 className="section-title">4. Tickets</h2>
          <p>
            Where tickets are made available through the Platform, you may purchase them subject to availability and the applicable ticketing conditions.
          </p>
          <p>
            Ticket availability, ticket categories, prices, offers and limits may vary from time to time.
          </p>
          <p>
            A ticket is considered successfully booked only after successful payment confirmation and generation of a valid ticket or Booking ID.
          </p>
          <p>
            Selecting a ticket, adding it to a cart, entering payment details or initiating a payment does not by itself create a confirmed booking.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">5. Ticket Prices</h2>
          <p>
            The ticket price payable by you will be the amount displayed on the Platform at the time you complete your booking.
          </p>
          <p>Depending on the transaction, the amount payable may include:</p>
          <ul>
            <li>ticket price;</li>
            <li>applicable taxes;</li>
            <li>booking charges;</li>
            <li>convenience/platform fees;</li>
            <li>payment processing charges; and/or</li>
            <li>any other charges specifically disclosed before payment.</li>
          </ul>
          <p>The final amount payable will be displayed before you complete the transaction.</p>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">6. Ticket Availability</h2>
          <p>Tickets are subject to availability.</p>
          <p>We may, at our discretion:</p>
          <ul>
            <li>limit the number of tickets that may be purchased;</li>
            <li>introduce different ticket categories;</li>
            <li>reserve tickets for particular purposes;</li>
            <li>change ticket availability; or</li>
            <li>stop ticket sales.</li>
          </ul>
          <p>
            Placing a ticket in your cart does not guarantee that the ticket will remain available until payment is completed.
          </p>
        </section>

        <p className="legal-group-heading">Payment</p>

        <section className="privacy-section">
          <h2 className="section-title">7. Payment Methods</h2>
          <p>
            Payments may be made through the payment methods displayed on the Platform at the time of purchase. These may include, depending on availability:
          </p>
          <ul>
            <li>credit cards;</li>
            <li>debit cards;</li>
            <li>UPI;</li>
            <li>net banking;</li>
            <li>wallets; and</li>
            <li>other payment methods supported by our payment partners.</li>
          </ul>
          <p>
            Payment transactions may be processed through third-party payment gateways, banks, payment aggregators, card networks and other payment service providers (“Payment Service Providers”).
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">8. Payment Gateways</h2>
          <p>
            When you make a payment through the Platform, the payment may be processed by a third-party Payment Service Provider.
          </p>
          <p>
            The processing of the payment may also be subject to the terms, conditions and security procedures of your bank, card issuer, payment network or Payment Service Provider.
          </p>
          <p>
            We do not control the banking or payment infrastructure used to process your transaction.
          </p>
          <p>
            Accordingly, we are not responsible for delays, declines, failures, reversals or interruptions caused by your bank, card issuer, payment gateway, payment aggregator or other financial institution, except to the extent such liability cannot legally be excluded.
          </p>
        </section>

        <p className="legal-group-heading">Important: Payment Debited but Ticket Not Received</p>

        <section className="privacy-section">
          <h2 className="section-title">9. When Is My Ticket Confirmed?</h2>
          <p>
            Your ticket is confirmed only when a valid ticket/Booking ID is generated by the Platform or authorised ticketing system.
          </p>
          <p>
            A successful debit from your bank account does not, by itself, mean that your ticket has been booked.
          </p>
          <div className="legal-notice-box">
            <p><strong>For example:</strong></p>
            <p>Payment initiated → Bank debited → Payment not confirmed → No ticket</p>
          </div>
          <p>
            In such a situation, the booking will not be treated as confirmed unless the payment is subsequently confirmed and a valid ticket is generated.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">10. Money Debited but No Ticket Generated</h2>
          <p>
            If money has been deducted from your bank account/card/UPI account but you have not received a ticket or Booking ID:
          </p>
          <p><strong>Please do not immediately make another payment.</strong></p>
          <p>First:</p>
          <ul>
            <li>Check your email, SMS, WhatsApp and/or account on the Platform.</li>
            <li>Check the transaction status with your bank or payment service provider.</li>
            <li>Keep your transaction/reference number safely.</li>
            <li>Contact our customer support team with the transaction details, if required.</li>
          </ul>
          <p>We may verify the transaction with the relevant Payment Service Provider.</p>
          <p>
            If the payment has not been successfully received or confirmed by us, no ticket will be generated against that transaction.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">11. Failed or Pending Payment</h2>
          <p>A payment may be treated as unsuccessful where:</p>
          <ul>
            <li>the payment is declined;</li>
            <li>authentication fails;</li>
            <li>the payment gateway times out;</li>
            <li>the transaction is interrupted;</li>
            <li>the payment remains pending;</li>
            <li>the amount is not received by us;</li>
            <li>the payment is reversed; or</li>
            <li>the Payment Service Provider does not provide successful confirmation.</li>
          </ul>
          <p>
            In such cases, the ticket will not be considered confirmed unless a valid ticket/Booking ID is generated.
          </p>
          <p>
            If the amount has been debited from your account, any reversal or refund will be subject to the applicable process and timelines of the bank, payment gateway or Payment Service Provider.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">12. Refund of Failed Transactions</h2>
          <p>
            Where a transaction has failed and the amount has been debited from your account but has not been received by us, the amount may be automatically reversed/refunded through the banking/payment system.
          </p>
          <p>
            The timing of such reversal or refund depends on the relevant bank, payment gateway, card issuer, UPI provider or other Payment Service Provider.
          </p>
          <p>
            We do not control the time taken by your bank or payment provider to credit the refunded amount to your account.
          </p>
          <p>
            If the amount remains unresolved beyond the applicable banking/payment timeline, you should contact your bank/payment service provider with the transaction reference number.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">13. Duplicate Payments</h2>
          <p>
            If you believe that you have been charged more than once for the same booking, please contact us with the relevant transaction details.
          </p>
          <p>We may verify the transactions with the Payment Service Provider.</p>
          <p>
            Any refund of a duplicate or unsuccessful transaction will be processed after verification of the transaction status.
          </p>
        </section>

        <p className="legal-group-heading">Booking Confirmation</p>

        <section className="privacy-section">
          <h2 className="section-title">14. Booking ID / Ticket</h2>
          <p>
            A Booking ID, ticket number, QR code, barcode or other confirmation generated by the Platform may be required to access the relevant service/event.
          </p>
          <p>Please keep your ticket and Booking ID secure.</p>
          <p>
            You may be required to present the ticket electronically or in another form specified at the time of booking.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">15. No Confirmation, No Confirmed Booking</h2>
          <p>
            If you do not receive a Booking ID, ticket or other confirmation after making a payment, do not assume that your booking has been confirmed merely because the amount appears as debited in your bank account.
          </p>
          <p>
            Please verify the transaction status with us and/or your bank/payment service provider.
          </p>
        </section>

        <p className="legal-group-heading">Cancellation &amp; Refunds</p>

        <section className="privacy-section">
          <h2 className="section-title">16. Cancellation Policy</h2>
          <p>
            Cancellation, modification and refund rights may vary depending on the particular ticket or service purchased.
          </p>
          <p>
            The applicable cancellation/refund conditions will be displayed on the relevant booking page, wherever applicable.
          </p>
          <p>
            Unless specifically stated otherwise, tickets once purchased may not be cancelled, exchanged or refunded.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">17. Refundable and Non-Refundable Charges</h2>
          <p>
            Where a refund is permitted, the refund may be limited to the eligible ticket amount.
          </p>
          <p>Unless specifically stated otherwise, the following may be non-refundable:</p>
          <ul>
            <li>convenience/platform fees;</li>
            <li>booking charges;</li>
            <li>payment processing charges;</li>
            <li>transaction charges; and</li>
            <li>other third-party charges.</li>
          </ul>
          <p>
            Any refund will be subject to the applicable cancellation policy displayed at the time of booking and applicable law.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">18. Event Cancellation or Postponement</h2>
          <p>
            If a programme/event for which you have purchased a ticket is cancelled or postponed, the applicable refund, rescheduling or replacement arrangement will be communicated to affected ticket holders.
          </p>
          <p>
            Where a refund is approved, it will generally be processed to the original payment method, subject to applicable payment processing timelines.
          </p>
          <p>
            We will not ordinarily be responsible for third-party expenses incurred by you in connection with the event, including travel, accommodation, transportation or other incidental expenses.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">19. Change in Programme</h2>
          <p>
            Programme details, artists, dates, timings, locations, ticket categories and other information may change.
          </p>
          <p>Where reasonably necessary, we may modify or update programme details.</p>
          <p>
            A change to a particular artist, performer, programme element or schedule does not automatically entitle you to a refund unless specifically stated otherwise or required by applicable law.
          </p>
        </section>

        <p className="legal-group-heading">Ticketing Rules</p>

        <section className="privacy-section">
          <h2 className="section-title">20. Ticket Transfer &amp; Resale</h2>
          <p>Tickets are intended for legitimate personal use unless otherwise specified.</p>
          <p>You must not:</p>
          <ul>
            <li>sell tickets through unauthorised channels;</li>
            <li>commercially resell tickets;</li>
            <li>duplicate tickets;</li>
            <li>alter tickets;</li>
            <li>create counterfeit tickets; or</li>
            <li>use tickets for fraudulent or unlawful purposes.</li>
          </ul>
          <p>
            Tickets obtained through unauthorised sources may be cancelled and refused at the point of access.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">21. Ticket Limits</h2>
          <p>
            We may impose limits on the number of tickets that can be purchased in a single transaction, by an individual, account, payment instrument or other criteria.
          </p>
          <p>
            We reserve the right to cancel bookings that appear to have been made in breach of such limits.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">22. Incorrect Pricing or Technical Error</h2>
          <p>
            We make reasonable efforts to ensure that prices and other information displayed on the Platform are accurate.
          </p>
          <p>
            However, if a ticket is sold due to a technical error, system malfunction, human error or incorrect pricing, we may, subject to applicable law:
          </p>
          <ul>
            <li>cancel the affected booking;</li>
            <li>correct the price; or</li>
            <li>provide an appropriate refund.</li>
          </ul>
          <p>
            Where a booking is cancelled for this reason, the amount actually received from you for the affected booking will be refunded in accordance with the applicable refund process.
          </p>
        </section>

        <p className="legal-group-heading">Using the Website</p>

        <section className="privacy-section">
          <h2 className="section-title">23. Acceptable Use</h2>
          <p>You agree to use the Platform only for lawful purposes.</p>
          <p>You must not:</p>
          <ul>
            <li>interfere with the operation of the Platform;</li>
            <li>attempt unauthorised access;</li>
            <li>introduce viruses or malicious code;</li>
            <li>use bots or automated systems to obtain tickets;</li>
            <li>bypass security or ticket limits;</li>
            <li>scrape or copy Platform content without permission;</li>
            <li>create fraudulent accounts;</li>
            <li>use another person&rsquo;s payment information without authorisation; or</li>
            <li>use the Platform for any unlawful or fraudulent purpose.</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">24. Fraud and Suspicious Transactions</h2>
          <p>We may cancel, suspend or hold a transaction where we reasonably suspect:</p>
          <ul>
            <li>fraud;</li>
            <li>unauthorised payment;</li>
            <li>misuse of the Platform;</li>
            <li>violation of ticket limits;</li>
            <li>resale or commercial exploitation;</li>
            <li>use of stolen payment credentials; or</li>
            <li>other unlawful activity.</li>
          </ul>
          <p>
            Where appropriate, we may share relevant information with payment providers, banks, law enforcement agencies or other competent authorities.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">25. Account Security</h2>
          <p>
            Where the Platform allows users to create an account, you are responsible for maintaining the confidentiality of your login credentials.
          </p>
          <p>
            You are responsible for activity carried out through your account unless you have promptly notified us of unauthorised access.
          </p>
        </section>

        <p className="legal-group-heading">Content &amp; Intellectual Property</p>

        <section className="privacy-section">
          <h2 className="section-title">26. Our Content</h2>
          <p>All content available on the Platform, including:</p>
          <ul>
            <li>Songs of the Stone name and branding;</li>
            <li>logos;</li>
            <li>photographs;</li>
            <li>artwork;</li>
            <li>graphics;</li>
            <li>videos;</li>
            <li>text;</li>
            <li>designs;</li>
            <li>music-related content;</li>
            <li>website design; and</li>
            <li>other materials</li>
          </ul>
          <p>
            is owned by, licensed to, or otherwise lawfully used by Inkpot and/or the relevant rights holders.
          </p>
          <p>
            You may access and use such content only for personal, non-commercial purposes unless expressly permitted otherwise.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">27. User Content</h2>
          <p>
            If you submit photographs, reviews, comments, feedback or other content through the Platform, you confirm that you have the necessary rights to submit such content.
          </p>
          <p>
            You must not submit content that is unlawful, defamatory, abusive, infringing, misleading or otherwise objectionable.
          </p>
          <p>
            Where you submit content to us, you grant us a non-exclusive, royalty-free right to use, reproduce, display and distribute such content for purposes connected with operating, promoting or improving Songs of the Stone, subject to applicable law.
          </p>
        </section>

        <p className="legal-group-heading">Third-Party Services</p>

        <section className="privacy-section">
          <h2 className="section-title">28. Third-Party Platforms</h2>
          <p>
            The Platform may contain or use services provided by third parties, including:
          </p>
          <ul>
            <li>payment gateways;</li>
            <li>banks;</li>
            <li>ticketing partners;</li>
            <li>communication providers;</li>
            <li>analytics providers;</li>
            <li>social media platforms; and</li>
            <li>other technology/service providers.</li>
          </ul>
          <p>
            Your use of those services may also be governed by their respective terms and policies.
          </p>
          <p>
            We are not responsible for the independent acts, omissions, policies or technical failures of third-party service providers.
          </p>
        </section>

        <p className="legal-group-heading">Website Availability</p>

        <section className="privacy-section">
          <h2 className="section-title">29. Platform Availability</h2>
          <p>
            We aim to keep the Platform available and functional, but we do not guarantee that it will always be:
          </p>
          <ul>
            <li>available;</li>
            <li>uninterrupted;</li>
            <li>error-free;</li>
            <li>completely secure; or</li>
            <li>free from technical issues.</li>
          </ul>
          <p>
            The Platform may occasionally be unavailable due to maintenance, upgrades, technical issues, network failures or circumstances beyond our reasonable control.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">30. Information on the Platform</h2>
          <p>
            We make reasonable efforts to ensure that information displayed on the Platform is accurate.
          </p>
          <p>
            However, we do not guarantee that every piece of information will always be complete, current or error-free.
          </p>
          <p>We reserve the right to correct errors and update information at any time.</p>
        </section>

        <p className="legal-group-heading">Privacy</p>

        <section className="privacy-section">
          <h2 className="section-title">31. Your Personal Information</h2>
          <p>
            We may collect and process information necessary to operate the Platform and provide our services, including information required for:
          </p>
          <ul>
            <li>account creation;</li>
            <li>ticket booking;</li>
            <li>payment processing;</li>
            <li>customer support;</li>
            <li>transaction verification;</li>
            <li>refunds;</li>
            <li>communication; and</li>
            <li>security and fraud prevention.</li>
          </ul>
          <p>
            Your personal information will be handled in accordance with our <Link to="/privacy-policy">Privacy Policy</Link>.
          </p>
        </section>

        <p className="legal-group-heading">Liability</p>

        <section className="privacy-section">
          <h2 className="section-title">32. Your Responsibility</h2>
          <p>You are responsible for:</p>
          <ul>
            <li>the information you provide;</li>
            <li>transactions made through your account;</li>
            <li>safeguarding your tickets and Booking IDs;</li>
            <li>complying with these Terms; and</li>
            <li>complying with applicable laws.</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">33. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, Inkpot shall not be liable for indirect, incidental, special, consequential or punitive losses arising from your use of the Platform or services.
          </p>
          <p>This includes losses arising from:</p>
          <ul>
            <li>bank/payment gateway failure;</li>
            <li>delayed payment or refund;</li>
            <li>technical interruption;</li>
            <li>loss of ticket credentials;</li>
            <li>unauthorised access caused by your failure to protect your account;</li>
            <li>third-party services; or</li>
            <li>circumstances beyond our reasonable control.</li>
          </ul>
          <p>
            Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="section-title">34. Indemnity</h2>
          <p>
            To the extent permitted by applicable law, you agree to indemnify and hold harmless Inkpot, its affiliates, directors, officers, employees and representatives from claims, losses, liabilities, damages, costs and expenses arising from:
          </p>
          <ul>
            <li>your breach of these Terms;</li>
            <li>your misuse of the Platform;</li>
            <li>fraudulent or unlawful activity;</li>
            <li>infringement of third-party rights; or</li>
            <li>information or content submitted by you.</li>
          </ul>
        </section>

        <p className="legal-group-heading">Suspension &amp; Termination</p>

        <section className="privacy-section">
          <h2 className="section-title">35. Suspension of Access</h2>
          <p>
            We may suspend, restrict or terminate your access to the Platform or cancel transactions where we reasonably believe that you have:
          </p>
          <ul>
            <li>breached these Terms;</li>
            <li>engaged in fraudulent activity;</li>
            <li>misused the Platform;</li>
            <li>violated applicable law; or</li>
            <li>created a security or operational risk.</li>
          </ul>
        </section>

        <p className="legal-group-heading">Events Beyond Our Control</p>

        <section className="privacy-section">
          <h2 className="section-title">36. Force Majeure</h2>
          <p>
            We will not be responsible for delay, failure, cancellation or interruption caused by circumstances beyond our reasonable control, including natural disasters, severe weather, government restrictions, public emergencies, technical failures, strikes, civil disturbances, security incidents, epidemics, pandemics or other events beyond our reasonable control.
          </p>
        </section>

        <p className="legal-group-heading">Changes to These Terms</p>

        <section className="privacy-section">
          <h2 className="section-title">37. Updates</h2>
          <p>We may update these Terms from time to time.</p>
          <p>
            The updated version will be published on the Platform with the revised “Last Updated” date.
          </p>
          <p>
            Your continued use of the Platform after such changes take effect constitutes acceptance of the updated Terms, to the extent permitted by law.
          </p>
        </section>

        <p className="legal-group-heading">Governing Law</p>

        <section className="privacy-section">
          <h2 className="section-title">38. Governing Law &amp; Jurisdiction</h2>
          <p>
            These Terms shall be governed by and interpreted in accordance with the laws of India.
          </p>
          <p>
            Subject to applicable law, courts at New Delhi, India shall have jurisdiction over disputes arising out of or relating to these Terms or your use of the Platform.
          </p>
        </section>

        <p className="legal-group-heading">Customer Support &amp; Grievance Redressal</p>

        <section className="privacy-section">
          <h2 className="section-title">39. Contact Us</h2>
          <p>If you have a question, complaint or concern relating to:</p>
          <ul>
            <li>a ticket;</li>
            <li>payment;</li>
            <li>refund;</li>
            <li>Booking ID;</li>
            <li>transaction failure;</li>
            <li>account; or</li>
            <li>use of the Platform,</li>
          </ul>
          <p>please contact us through the support details provided below.</p>

          <div className="legal-contact-box">
            <p><strong>Songs of the Stone / Inkpot India Pvt. Ltd.</strong></p>
            <p>Email: <a href="mailto:info@inkpotindia.com">info@inkpotindia.com</a></p>
            <p>Phone: <a href="tel:+919205304666">+91 92053 04666</a></p>
            <p>WhatsApp: <a href="https://wa.me/919205304666" target="_blank" rel="noopener noreferrer">+91 92053 04666</a></p>
          </div>

          <p>
            For payment transactions where your account has been debited but no ticket has been generated, please keep your transaction ID / UTR / payment reference number available when contacting us or your bank/payment service provider.
          </p>
        </section>

        <p className="legal-group-heading">Quick Payment Note</p>

        <section className="privacy-section">
          <div className="legal-notice-box">
            <p><strong>Paid but didn&rsquo;t get a ticket? Don&rsquo;t worry.</strong></p>
            <p>A bank debit does not automatically mean that your ticket is confirmed.</p>
            <p>Your booking is confirmed only when:</p>
            <p><strong>Payment successfully confirmed + Ticket/Booking ID generated = Confirmed Booking</strong></p>
            <p>If your account has been debited but you have not received a ticket:</p>
            <p>Check your booking → Check your bank/payment status → Contact us with your transaction ID if required.</p>
            <p>
              If the payment has not reached us, we cannot generate a ticket against that transaction. Any reversal/refund of the amount will be subject to the applicable bank/payment gateway process and timelines.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <p>
            By using the Songs of the Stone Platform or purchasing a ticket through it, you acknowledge that you have read, understood and agreed to these Terms &amp; Conditions.
          </p>
          <p>© Inkpot India Pvt. Ltd. All Rights Reserved.</p>
        </section>
      </div>
    </div>
  </div>
  );
};

export default TermsAndConditions;
