import type { FC } from "react";

const TermsAndConditions: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-6 py-12">
      <div className="w-full max-w-4xl bg-white shadow-lg border border-gray-300  p-10">
        <h1 className="text-4xl text-black text-center leading-tight mb-6">
          Terms and Conditions
        </h1>
        <p className="text-center text-gray-600 text-lg mb-8">
          Please read these terms and conditions carefully before using our
          service.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl text-black mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms and Conditions govern your use of our platform and
              services. By accessing or using our website, you agree to be bound
              by these terms. If you do not agree with any part of these terms,
              please refrain from using our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-black mb-4">
              2. User Responsibilities
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You are responsible for ensuring the accuracy and completeness of
              the information you provide when using our platform. You agree to
              comply with all applicable laws and regulations regarding the use
              of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-black mb-4">
              3. Privacy and Data Protection
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We respect your privacy. Our Privacy Policy outlines the types of
              information we collect and how we protect your data. By using our
              services, you consent to the collection and use of your
              information as described in our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-black mb-4">4. Account Security</h2>
            <p className="text-gray-700 leading-relaxed">
              You are responsible for maintaining the confidentiality of your
              account details, including your username, password, and any other
              security credentials. If you believe your account has been
              compromised, you agree to notify us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-black mb-4">5. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We may suspend or terminate your access to the service at our
              discretion if you violate these Terms and Conditions or if we
              determine, at our sole discretion, that it is necessary to protect
              the security or integrity of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-black mb-4">
              6. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To the maximum extent permitted by law, we are not responsible for
              any direct, indirect, incidental, special, consequential, or
              punitive damages arising out of or in connection with the use of
              our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-black mb-4">7. Modifications</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify or update these Terms and
              Conditions at any time. Changes will be posted on this page, and
              your continued use of our platform after the changes will
              constitute your acceptance of the revised terms.
            </p>
          </section>

          <section className="mt-12 text-center">
            <p className="text-gray-600 leading-relaxed">
              By using our services, you acknowledge that you have read,
              understood, and agreed to these Terms and Conditions.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
