import React from "react";

interface EmailTemplateProps {
  firstName: string;
  verificationUrl: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  firstName,
  verificationUrl,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>Please verify your email by clicking the link below:</p>
    <a href={verificationUrl} target="_blank" rel="noopener noreferrer">
      Verify Email
    </a>
  </div>
);

export default EmailTemplate;
