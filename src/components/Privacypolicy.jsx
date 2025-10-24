import React from "react";

const PrivacyPolicy = () => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(120deg, #f8f6f2 0%, #e2cba3 100%)',
    padding: '0',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  }}>
    <div className="max-w-5xl w-full mx-auto px-6 py-12 bg-white" style={{marginTop: '3rem', marginBottom: '3rem', boxShadow: '0 4px 32px rgba(144,26,28,0.10)', borderRadius: '1.5rem', border: '1px solid #e2cba3'}}>
      <header className="mb-10" style={{textAlign: 'center'}}>
        <h1 className="text-4xl font-bold mb-2" style={{color: '#901A1C', letterSpacing: '1px'}}>Privacy Policy of Inkpot India Pvt. Ltd.</h1>
        <p className="text-sm" style={{color: '#A4481C'}}>
          <strong>Effective Date:</strong> October 24, 2025<br />
          <strong>Last Updated:</strong> October 24, 2025
        </p>
      </header>

      <div className="space-y-10 text-gray-800 leading-relaxed">
      <section>
        <p>
          Inkpot India Pvt. Ltd. (“Inkpot India”, “Company”, “we”, “us”, or “our”) values your trust and respects your right to privacy. We are committed to protecting your personal data and ensuring transparency in how we collect, use, and safeguard information provided to us through our website, applications, ticketing platforms, social media pages, partner websites, and offline or online event registrations (collectively referred to as the “Platform”).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{color: '#3D3F21', borderBottom: '2px solid #e2cba3', paddingBottom: '0.5rem'}}>Introduction</h2>
        <p>
          This Privacy Policy (“Policy”) outlines how Inkpot India collects, stores, uses, discloses, and protects the personal data and sensitive personal information of individuals who interact with us — whether as visitors, event participants, artists, vendors, partners, or customers. By accessing or using the Platform, or by voluntarily providing any Personal Data to us, you acknowledge and consent to the collection, storage, processing, and disclosure of your data in accordance with this Policy and the applicable laws of India.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{color: '#3D3F21', borderBottom: '2px solid #e2cba3', paddingBottom: '0.5rem'}}>1. Collection of Information</h2>
        <p className="mb-4">
          Inkpot India Pvt. Ltd. (“Inkpot India” or “the Company”) recognizes that the information you share with us is personal and confidential. Accordingly, we are committed to collecting only such information as is necessary for lawful, legitimate, and transparent business purposes. We ensure that the collection, use, and handling of such information comply with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and other applicable data protection regulations.
        </p>
        <p className="mb-6">
          Our data collection practices are designed to facilitate the efficient organization of art and cultural events, improve user experience, ensure regulatory compliance, and maintain the security and integrity of our Platform and services.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">1.1. Categories of Information Collected</h3>
        <p className="mb-4">
          Inkpot India collects the following categories of data, either directly from you or automatically through your use of our Platform, mobile applications, and event participation activities:
        </p>

        <h4 className="text-lg font-semibold text-gray-900 mb-2">A. Personal Information</h4>
        <p className="mb-3">
          “Personal Information” refers to any information that can be used to identify you directly or indirectly. The types of personal information we may collect include, but are not limited to:
        </p>
        
        <div className="ml-4 mb-4 space-y-3">
          <div>
            <p className="font-semibold">Identity Data:</p>
            <p>Full name, date of birth, age, gender, and nationality. This helps us identify event attendees, artists, vendors, and service providers for record-keeping and operational coordination.</p>
          </div>
          
          <div>
            <p className="font-semibold">Contact Data:</p>
            <p>Email address, mobile number, telephone number, and postal or residential address.
            These details allow us to communicate event-related information, confirmations, updates, and resolve customer queries effectively.
            </p>
          </div>
          
          <div>
            <p className="font-semibold">Account Data:</p>
            <p>Login credentials, usernames, passwords, and authentication tokens created when you register or log in to our online platforms or partner systems.
            These ensure secure access and enable personalized experiences.
            </p>
          </div>
          
          <div>
            <p className="font-semibold">Communication Preferences:</p>
            <p>Information on how you prefer to receive communication (e.g., email, SMS, WhatsApp, or push notifications).</p>
          </div>
          
          <div>
            <p className="font-semibold">Event Participation Data:</p>
            <p>Details provided during registration for events, workshops, contests, or art programs — including ticket details, seat selection, and special access requirements.</p>
          </div>
          
          <div>
            <p className="font-semibold">Profile and Demographic Data:</p>
            <p>Information related to your interests, profession, or artistic preferences that help us curate events or experiences that align with your tastes.</p>
          </div>
          
          <div>
            <p className="font-semibold">Visual and Media Data:</p>
            <p>Photographs, video recordings, or testimonials collected during Inkpot India events or campaigns. By attending such events, you consent to the use of media captured in public spaces for promotional and documentation purposes.</p>
          </div>
        </div>

        <h4 className="text-lg font-semibold text-gray-900 mb-2 mt-6">B. Sensitive Personal Data or Information (SPDI)</h4>
        <p className="mb-3">
          In accordance with Rule 3 of the IT (SPDI) Rules, 2011, we may, under lawful circumstances, collect Sensitive Personal Data or Information, which may include:
        </p>
        
        <div className="ml-4 mb-4 space-y-3">
          <div>
            <p className="font-semibold">Financial Data:</p>
            <p>Payment instrument details such as debit/credit card numbers, UPI IDs, wallet details, or bank account information, when you purchase tickets or make donations.</p>
          </div>
          
          <div>
            <p className="font-semibold">Authentication Data:</p>
            <p>Passwords, PINs, and other security codes that are required to verify identity and ensure secure access to our services.</p>
          </div>
          
          <div>
            <p className="font-semibold">Biometric or Identification Data:</p>
            <p>In limited cases, biometric data or ID verification information (such as Aadhaar, PAN, or Passport numbers) may be collected to verify the authenticity of participants, vendors, or beneficiaries, particularly where required by law or venue regulations.</p>
          </div>
          
          <div>
            <p className="font-semibold">Health and Safety Data:</p>
            <p>In certain event-related scenarios, health information may be voluntarily provided — for example, allergy disclosures, emergency contact information, or disability assistance requests — solely to ensure your safety and comfort during events.</p>
          </div>
        </div>
        
        <p className="mb-6">
          Songs of the Stone ensures that SPDI is collected only when absolutely necessary, with your explicit consent, and is processed with strict security and confidentiality.
        </p>

        <h4 className="text-lg font-semibold text-gray-900 mb-2">C. Automatically Collected Data</h4>
        <p className="mb-3">
          When you interact with our Platform, we automatically collect certain technical and behavioral information to improve functionality, ensure security, and enhance user experience. Such information includes:
        </p>
        
        <div className="ml-4 mb-4 space-y-3">
          <div>
            <p className="font-semibold">Device and Technical Data:</p>
            <p>Device identifiers (IMEI number, MAC address), browser type, operating system, screen resolution, and device model.</p>
          </div>
          
          <div>
            <p className="font-semibold">Log Data and Analytics:</p>
            <p>Your IP address, time and date of visit, duration of sessions, referring URLs, clickstream data, and usage statistics across the Platform.</p>
          </div>
          
          <div>
            <p className="font-semibold">Cookies and Tracking Technologies:</p>
            <p>Information gathered through cookies, pixel tags, and web beacons that help us recognize returning users, remember preferences, and analyze site traffic.</p>
          </div>
          
          <div>
            <p className="font-semibold">Geolocation Data:</p>
            <p>Approximate location derived from your IP address or device settings, which may be used to recommend region-specific events or ticketing options.</p>
          </div>
          
          <div>
            <p className="font-semibold">Usage Data:</p>
            <p>Details of how you interact with our services — including the pages you visit, features you use, searches performed, and content viewed — to help us improve service efficiency and relevance.</p>
          </div>
        </div>
        
        <p className="mb-6">
          All automatically collected data is primarily non-identifiable in nature. However, where such data can reasonably be linked to your identity, we treat it as Personal Data and protect it accordingly.
        </p>

        <h4 className="text-lg font-semibold text-gray-900 mb-2">D. Data Collected from Third Parties and Partners</h4>
        <p className="mb-3">
          We may receive limited Personal Data about you from legitimate third-party sources, such as:
        </p>
        
        <div className="ml-4 mb-4 space-y-3">
          <div>
            <p className="font-semibold">Event and Ticketing Partners:</p>
            <p>When you register for or purchase tickets through authorized ticketing agencies, event aggregators, or partner websites, the information you provide may be shared with Songs of the Stone to facilitate your entry and participation.</p>
          </div>
          
          <div>
            <p className="font-semibold">Social Media Platforms:</p>
            <p>When you interact with our social media pages (e.g., like, comment, or share), certain publicly available information may be shared with us in accordance with your platform privacy settings.</p>
          </div>
          
          <div>
            <p className="font-semibold">Marketing and Advertising Partners:</p>
            <p>Demographic or interest-based data provided by data analytics and ad distribution partners to help us deliver personalized promotions.</p>
          </div>
          
          <div>
            <p className="font-semibold">Publicly Available Sources:</p>
            <p>Basic identification or contact details obtained from publicly accessible databases or directories for business development or compliance verification.</p>
          </div>
        </div>
        
        <p className="mb-6">
          Songs of the Stone ensures that such data obtained from third parties is collected and processed in accordance with applicable laws and used only for legitimate purposes stated in this Policy.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">1.2. Methods of Data Collection</h3>
        <p className="mb-3">We collect information through various lawful means, including:</p>
        <ul className="list-disc ml-8 mb-4 space-y-2">
          <li><strong>Direct collection:</strong> Information you voluntarily provide through forms, surveys, event registrations, or communication with our representatives.</li>
          <li><strong>Automated collection:</strong> Information gathered through cookies, analytics tools, and system logs while you browse our website or app.</li>
          <li><strong>Partner integration:</strong> Information shared by authorized partners, event organizers, or service providers under data processing agreements.</li>
          <li><strong>Offline collection:</strong> Information captured at physical events, including attendee registrations, artist sign-ins, or visitor book entries.</li>
        </ul>
        <p className="mb-6">
          All data is collected only to the extent necessary for fulfilling the purpose for which it is provided and is handled under strict confidentiality.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">1.3. Accuracy and Responsibility for Provided Data</h3>
        <p className="mb-6">
          It is your responsibility to ensure that the data you provide is accurate, complete, and up-to-date. Songs of the Stone shall not be liable for any loss or damages resulting from inaccurate, incomplete, or outdated information provided by users. You may review and correct your data by contacting our Grievance Officer.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">1.4. Children and Minors</h3>
        <p className="mb-6">
          Our services are intended for individuals above 18 years of age. Persons below 18 may participate in events only under the supervision and consent of a parent or legal guardian. By allowing minors to register or attend events, guardians expressly consent to Songs of the Stone's data practices on their behalf. The Company disclaims any liability arising from unsupervised access by minors.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">1.5. Consent for Data Collection</h3>
        <p className="mb-3">By using the Platform or providing any information voluntarily, you:</p>
        <ul className="list-disc ml-8 mb-4 space-y-2">
          <li>Represent that the information provided is true, accurate, and lawful;</li>
          <li>Consent to Songs of the Stone's collection and processing of such information;</li>
          <li>Authorize the Company to use, store, and share the data for legitimate business and legal purposes as outlined in this Policy.</li>
        </ul>
        <p className="mb-6">
          If you do not agree with the terms of this Policy or do not wish to share your data, you may discontinue using the Platform. However, certain services (such as ticket booking, event participation, or newsletter subscriptions) may not be available without requisite information.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">1.6. Lawful Basis for Collection</h3>
        <p className="mb-3">Songs of the Stone collects data under the following lawful bases:</p>
        <ul className="list-disc ml-8 mb-4 space-y-2">
          <li><strong>Performance of contract:</strong> To fulfill event bookings, registrations, and service obligations.</li>
          <li><strong>Consent:</strong> For marketing, media use, and optional communication.</li>
          <li><strong>Legal obligation:</strong> To comply with applicable statutory, tax, and regulatory requirements.</li>
          <li><strong>Legitimate interests:</strong> For analytics, fraud prevention, security enhancement, and improving services.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">1.7. Notice of Collection Changes</h3>
        <p className="mb-6">
          Songs of the Stone reserves the right to update its data collection practices as new technologies or legal requirements evolve. Any substantial changes will be reflected in the revised Privacy Policy, available on our official website, with an updated "Effective Date." Continued use of the Platform after such changes constitutes acknowledgment and acceptance of the updated terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{color: '#3D3F21', borderBottom: '2px solid #e2cba3', paddingBottom: '0.5rem'}}>2. Purpose and Use of Collected Information</h2>
        <p className="mb-6">
          Songs of the Stone ("the Company", "we", "us", or "our") collects and processes personal and sensitive personal data strictly in accordance with applicable laws, and only for lawful, legitimate, and necessary purposes. We ensure that all data is used fairly, transparently, and solely for the objectives described below.
        </p>
        <p className="mb-6">
          The data collected enables Songs of the Stone to provide, enhance, and manage our event services efficiently, comply with legal requirements, and create meaningful and secure experiences for our users, artists, and partners.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1. Operational and Contractual Purposes</h3>
        <p className="mb-3">Songs of the Stone uses your personal data to fulfil its contractual and operational obligations, which may include:</p>
        
        <div className="ml-4 mb-4 space-y-3">
          <div>
            <p className="font-semibold">Event Registration and Participation:</p>
            <p>To facilitate your registration, verify your eligibility, and confirm participation in events, workshops, cultural festivals, and exhibitions organized or managed by Songs of the Stone.</p>
          </div>
          
          <div>
            <p className="font-semibold">Ticketing and Booking Management:</p>
            <p>To process ticket purchases, generate unique booking IDs, issue receipts, and manage seating or venue preferences.</p>
          </div>
          
          <div>
            <p className="font-semibold">Identity Verification:</p>
            <p>To authenticate your identity, prevent impersonation or duplicate registrations, and ensure the safety and integrity of event access.</p>
          </div>
          
          <div>
            <p className="font-semibold">Payment Processing:</p>
            <p>To manage transactions, refunds, and billing processes through secure payment gateways and ensure compliance with financial regulations.</p>
          </div>
          
          <div>
            <p className="font-semibold">Communication of Service-Related Information:</p>
            <p>To send confirmations, reminders, event schedules, venue updates, or emergency notices to participants and stakeholders.</p>
          </div>
          
          <div>
            <p className="font-semibold">Vendor and Partner Coordination:</p>
            <p>For managing contractual relationships with artists, vendors, suppliers, and partners, including payments, logistics, and compliance documentation.</p>
          </div>
        </div>
        
        <p className="mb-6">
          All operational data processing is conducted to enable Songs of the Stone to deliver its services effectively, ensure seamless coordination among stakeholders, and meet performance obligations.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2. Customer Relationship Management and Engagement</h3>
        <p className="mb-3">Songs of the Stone uses personal data to build long-term relationships with users, artists, and partners through improved communication and engagement. This includes:</p>
        
        <div className="ml-4 mb-4 space-y-3">
          <div>
            <p className="font-semibold">Customer Support and Feedback:</p>
            <p>To provide customer assistance, respond to inquiries, handle complaints, and ensure prompt redressal of issues related to event participation or services.</p>
          </div>
          
          <div>
            <p className="font-semibold">Personalized User Experience:</p>
            <p>To customize content, recommendations, and event suggestions based on your interests, location, or previous participation history.</p>
          </div>
          
          <div>
            <p className="font-semibold">Loyalty and Rewards Programs:</p>
            <p>To administer loyalty initiatives, promotional offers, or exclusive memberships designed for frequent participants or patrons of Songs of the Stone's events.</p>
          </div>
          
          <div>
            <p className="font-semibold">Surveys and Feedback Collection:</p>
            <p>To gather user insights for improving event quality, artist engagement, and overall participant satisfaction.</p>
          </div>
          
          <div>
            <p className="font-semibold">Communication Preferences:</p>
            <p>To honor your communication choices — including your consent to receive, or opt out of, certain forms of marketing or service updates.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.3. Marketing and Promotional Activities</h3>
        <p className="mb-3">Songs of the Stone may use your data, with your consent, for marketing, promotional, and awareness initiatives aimed at promoting art, culture, and related events. Examples include:</p>
        
        <div className="ml-4 mb-4 space-y-3">
          <div>
            <p className="font-semibold">Email, SMS, and Social Media Campaigns:</p>
            <p>To inform you about upcoming events, new collaborations, artistic programs, and exhibitions that align with your interests.</p>
          </div>
          
          <div>
            <p className="font-semibold">Advertising and Remarketing:</p>
            <p>To display relevant ads across online platforms, social media, or partner sites using cookies or anonymized identifiers.</p>
          </div>
          
          <div>
            <p className="font-semibold">Media and Publicity:</p>
            <p>To use event photographs, video recordings, or testimonials for promotional materials, provided such use complies with consent terms or event participation guidelines.</p>
          </div>
          
          <div>
            <p className="font-semibold">Partner Collaborations:</p>
            <p>To share limited information with co-organizers, sponsors, or affiliated institutions who jointly manage or support an event, solely for legitimate event-related communications.</p>
          </div>
        </div>
        
        <p className="mb-6">
          <strong>Note:</strong> You may opt out of promotional communications at any time by using the "unsubscribe" link in our emails or by contacting us at privacy@songsofthestone.com. Opting out will not affect essential service-related communications (e.g., ticket confirmations or event updates).
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">2.4. Legal and Regulatory Compliance</h3>
        <p className="mb-3">Songs of the Stone may process and retain your personal information where required by applicable law or government authorities, including but not limited to:</p>
        
        <div className="ml-4 mb-4 space-y-3">
          <div>
            <p className="font-semibold">Compliance with Statutory Requirements:</p>
            <p>To comply with tax, audit, and financial reporting obligations under Indian law.</p>
          </div>
          
          <div>
            <p className="font-semibold">Government or Judicial Requests:</p>
            <p>To respond to lawful requests, investigations, or directives issued by courts, enforcement agencies, or other competent authorities.</p>
          </div>
          
          <div>
            <p className="font-semibold">Fraud Prevention and Security:</p>
            <p>To identify, investigate, and prevent potential fraud, unauthorized transactions, or violations of law or policy.</p>
          </div>
          
          <div>
            <p className="font-semibold">Insurance and Risk Management:</p>
            <p>To assess risk, maintain insurance claims, or handle incidents related to event operations or public liability.</p>
          </div>
        </div>
        
        <p className="mb-6">
          Processing under this category ensures that Songs of the Stone meets its statutory and legal obligations while protecting the legitimate interests of both the Company and its users.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">2.5. Analytics, Research, and Business Intelligence</h3>
        <p className="mb-3">Songs of the Stone continually strives to improve its services, operational efficiency, and user engagement. To achieve this, we use anonymized and aggregated data for:</p>
        
        <div className="ml-4 mb-4 space-y-3">
          <div>
            <p className="font-semibold">Usage Analytics:</p>
            <p>To understand patterns of website or app usage, measure audience participation, and identify performance issues.</p>
          </div>
          
          <div>
            <p className="font-semibold">Market Research:</p>
            <p>To analyze event attendance demographics, feedback trends, and cultural engagement levels across different regions.</p>
          </div>
          
          <div>
            <p className="font-semibold">Service Improvement:</p>
            <p>To assess audience preferences and design events, campaigns, and content that align with cultural interests and emerging trends.</p>
          </div>
          
          <div>
            <p className="font-semibold">Risk Assessment:</p>
            <p>To detect unusual activity, ensure cyber-security, and maintain system integrity.</p>
          </div>
        </div>
        
        <p className="mb-6">
          All analytics and research activities are performed using non-identifiable or aggregated data, ensuring that individuals cannot be personally identified from the results.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">2.6. Internal Administrative and Business Purposes</h3>
        <p className="mb-3">In addition to the above, personal data may be used for the Company's internal administrative and business purposes, including:</p>
        
        <div className="ml-4 mb-4 space-y-3">
          <div>
            <p className="font-semibold">Record Maintenance:</p>
            <p>To maintain internal databases for accounting, compliance, and historical event records.</p>
          </div>
          
          <div>
            <p className="font-semibold">Auditing and Reporting:</p>
            <p>To support internal audits, financial reconciliations, and compliance reviews.</p>
          </div>
          
          <div>
            <p className="font-semibold">Employee and Contractor Management:</p>
            <p>To manage human resources, contracts, or vendor onboarding when personal details are shared in a professional capacity.</p>
          </div>
          
          <div>
            <p className="font-semibold">Corporate Governance:</p>
            <p>To ensure transparency, accountability, and adherence to Songs of the Stone's internal policies and ethical standards.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.7. Media, Intellectual Property, and Public Communications</h3>
        <p className="mb-3">As an organization promoting art and culture, Songs of the Stone may lawfully use photographs, video recordings, artworks, or testimonials captured during events for:</p>
        
        <div className="ml-4 mb-4 space-y-3">
          <div>
            <p className="font-semibold">Event Documentation:</p>
            <p>To create event reports, publications, and archives for future reference.</p>
          </div>
          
          <div>
            <p className="font-semibold">Public Relations and Branding:</p>
            <p>To showcase artistic participation, cultural outreach, and achievements through media, advertisements, or official reports.</p>
          </div>
          
          <div>
            <p className="font-semibold">Intellectual Property Protection:</p>
            <p>To secure rights over original creative content developed by or in collaboration with the Company.</p>
          </div>
        </div>
        
        <p className="mb-6">
          All such use will respect the rights of individuals and comply with applicable consent requirements and publicity laws.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">2.8. Consent and Withdrawal</h3>
        <p className="mb-3">Songs of the Stone processes personal data only when:</p>
        <ul className="list-disc ml-8 mb-4 space-y-2">
          <li>You have provided explicit consent for a stated purpose;</li>
          <li>Processing is necessary for contract performance or compliance; or</li>
          <li>Legitimate interests justify such use under the law.</li>
        </ul>
        <p className="mb-6">
          If you wish to withdraw your consent for data use (except where legally mandated), you may write to our Grievance Officer at privacy@songsofthestone.com. Upon receipt, the Company will cease processing your data for such purposes, except where retention is required for statutory, legal, or dispute resolution reasons.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">2.9. Limitation of Use</h3>
        <p className="mb-3">
          Songs of the Stone shall not process, use, or retain your data beyond what is reasonably necessary to achieve the specified purposes.
        </p>
        <p className="mb-3">All use of data shall adhere to the principles of:</p>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li>Lawfulness,</li>
          <li>Fairness,</li>
          <li>Transparency,</li>
          <li>Purpose Limitation, and</li>
          <li>Data Minimization.</li>
        </ul>
        <p>
          Any secondary or new purpose not originally disclosed will require additional consent or notice, as mandated by law.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{color: '#3D3F21', borderBottom: '2px solid #e2cba3', paddingBottom: '0.5rem'}}>3. Disclosure of Information</h2>
        <p className="mb-6">
          Songs of the Stone may share your personal data with third parties strictly for legitimate business purposes and in compliance with applicable law.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Sharing with Affiliates and Partners</h3>
        <p className="mb-3">Personal data may be shared with:</p>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li><strong>Affiliates and subsidiaries:</strong> For coordinated management of events, services, or programs.</li>
          <li><strong>Event partners or co-organizers:</strong> To ensure smooth event execution, logistics management, ticketing, and participant management.</li>
          <li><strong>Marketing partners:</strong> To deliver promotions, event updates, or personalized offers, subject to your consent.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Third-Party Service Providers</h3>
        <p className="mb-3">We may disclose information to third-party service providers performing business functions on our behalf, such as:</p>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li>Payment gateways for processing transactions</li>
          <li>Cloud or IT service providers for secure storage and system maintenance</li>
          <li>Data analytics providers to improve user experience</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Legal or Regulatory Disclosure</h3>
        <p className="mb-3">Songs of the Stone may disclose personal data to:</p>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li>Government authorities, courts, or law enforcement agencies, as required by law</li>
          <li>Regulatory bodies for compliance audits, investigations, or statutory reporting</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">3.4 Limitations of Liability in Disclosure</h3>
        <p>
          The Company is not liable for misuse of data by third parties acting independently once the data has been lawfully shared. All disclosures are made under binding contracts, confidentiality clauses, or legal obligations wherever applicable.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{color: '#3D3F21', borderBottom: '2px solid #e2cba3', paddingBottom: '0.5rem'}}>4. International Data Transfers</h2>
        <p className="mb-6">
          Songs of the Stone may transfer personal data to countries outside India when necessary to provide services.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Conditions for Transfer</h3>
        <p className="mb-3">
          Transfers occur only where the recipient country ensures adequate data protection or appropriate safeguards are implemented.
        </p>
        <p className="mb-6">
          Safeguards may include standard contractual clauses, binding corporate rules, or obtaining explicit user consent.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Purpose and Legal Basis</h3>
        <p className="mb-3">
          Transfers are made for operational purposes such as event coordination, payment processing, or customer support.
        </p>
        <p>
          We ensure compliance with all relevant data protection laws to maintain confidentiality, integrity, and security.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{color: '#3D3F21', borderBottom: '2px solid #e2cba3', paddingBottom: '0.5rem'}}>5. Data Retention and Destruction</h2>
        <p className="mb-6">
          Songs of the Stone retains personal data only as long as necessary for the purposes for which it was collected, or as required by law.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Retention Periods</h3>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li><strong>Operational Data:</strong> Retained until completion of the service or event obligations</li>
          <li><strong>Financial Data:</strong> Retained as required for accounting, taxation, or audit purposes</li>
          <li><strong>Marketing Data:</strong> Retained until consent is withdrawn</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Secure Destruction</h3>
        <p className="mb-3">
          Data that is no longer required is deleted, anonymized, or archived securely to prevent unauthorized access.
        </p>
        <p>
          Destruction methods comply with industry standards, including digital wiping, shredding, and secure archiving.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{color: '#3D3F21', borderBottom: '2px solid #e2cba3', paddingBottom: '0.5rem'}}>6. Security Practices and Procedures</h2>
        <p className="mb-6">
          Songs of the Stone implements technical, administrative, and physical safeguards to protect personal data.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Administrative Measures</h3>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li>Employee training on data privacy and confidentiality</li>
          <li>Access restrictions based on roles and responsibilities</li>
          <li>Policies and procedures for handling data securely</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Technical Measures</h3>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li>Encryption (SSL/TLS) for data transmission</li>
          <li>Firewalls, intrusion detection, and malware protection</li>
          <li>Regular system audits and vulnerability assessments</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">6.3 Physical Measures</h3>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li>Secure storage facilities for hard copies of records</li>
          <li>Restricted access to offices, servers, and storage areas</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">6.4 Limitations</h3>
        <p>
          Despite reasonable security measures, Songs of the Stone does not guarantee absolute protection against unauthorized access, data breaches, or other security incidents beyond our control.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{color: '#3D3F21', borderBottom: '2px solid #e2cba3', paddingBottom: '0.5rem'}}>7. Your Rights and Choices</h2>
        <p className="mb-6">
          You may access, correct, or delete your personal data or withdraw consent by contacting our Grievance Officer. Verification may be required. Requests may be declined where law requires retention.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">7.1 Access and Correction</h3>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li>You may request access to your personal data held by the Company.</li>
          <li>You may correct inaccurate, incomplete, or outdated data.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">7.2 Data Deletion</h3>
        <p className="mb-6">
          You may request deletion of personal data, subject to legal or contractual retention requirements.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">7.3 Consent Withdrawal</h3>
        <p className="mb-3">
          You can withdraw previously given consent for data processing at any time.
        </p>
        <p>
          Withdrawal does not affect processing required for legal compliance or contract performance.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{color: '#3D3F21', borderBottom: '2px solid #e2cba3', paddingBottom: '0.5rem'}}>8. Use of Cookies and Tracking Technologies</h2>
        <p className="mb-6">
          Songs of the Stone uses cookies and similar technologies for improving functionality and personalizing user experience.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">8.1 Purpose of Cookies</h3>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li>Authentication and session management</li>
          <li>Analytics and performance monitoring</li>
          <li>Personalized recommendations and marketing</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">8.2 User Control</h3>
        <p className="mb-3">
          Cookies can be disabled through browser settings.
        </p>
        <p>
          Disabling cookies may limit access to certain features or services on the Platform.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{color: '#3D3F21', borderBottom: '2px solid #e2cba3', paddingBottom: '0.5rem'}}>9. Limitation of Liability</h2>
        <p className="mb-3">Songs of the Stone shall not be liable for:</p>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li>Indirect, incidental, or consequential losses arising from misuse or unauthorized disclosure of data</li>
          <li>Events beyond our reasonable control, including cyberattacks or third-party breaches</li>
        </ul>
        <p>
          Exceptions apply in cases of proven gross negligence or as required by applicable law.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{color: '#3D3F21', borderBottom: '2px solid #e2cba3', paddingBottom: '0.5rem'}}>10. Policy Updates</h2>
        <p className="mb-3">
          Songs of the Stone may update this Privacy Policy from time to time to reflect changes in law, technology, or business practices.
        </p>
        <p className="mb-3">
          Material changes will be highlighted on the Platform.
        </p>
        <p>
          Continued use of the Platform after changes constitutes acceptance of the updated Policy.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{color: '#3D3F21', borderBottom: '2px solid #e2cba3', paddingBottom: '0.5rem'}}>11. Grievance Officer and Contact Information</h2>
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <p className="font-semibold text-gray-900 mb-2">Grievance Officer</p>
          <p className="mb-2">Songs of the Stone</p>
          <p className="mb-2">Email: info@songsofthestone.com</p>
          
         
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{color: '#3D3F21', borderBottom: '2px solid #e2cba3', paddingBottom: '0.5rem'}}>12. Governing Law and Jurisdiction</h2>
        <p>
          This Privacy Policy shall be governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts at New Delhi, India.
        </p>
      </section>
    </div>
    </div>
  </div>
);

export default PrivacyPolicy;