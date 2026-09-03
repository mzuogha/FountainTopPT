/**
 * Responsive, Medical-Grade HTML Email Templates for Fountain-Top Physiotherapy
 * Compatible with Gmail, Apple Mail, Outlook, and Yahoo (Dark Mode & Light Mode safe)
 */

interface BookingEmailData {
  refCode: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  serviceRequested: string;
  appointmentDate: string;
  appointmentTime: string;
  visitType: string;
  notes: string;
  bookingChannel: string;
  isAppointment: boolean;
  dateFormatted?: string;
}

export function generateAdminEmailHtml(data: BookingEmailData): string {
  const {
    refCode,
    patientName,
    patientPhone,
    patientEmail,
    serviceRequested,
    appointmentDate,
    appointmentTime,
    visitType,
    notes,
    bookingChannel,
    isAppointment
  } = data;

  const typeLabel = isAppointment ? 'APPOINTMENT BOOKING REQUEST' : 'GENERAL PATIENT INQUIRY';
  const cleanPhone = patientPhone.replace(/[^0-9+]/g, '');
  let waNumber = cleanPhone.replace(/^\+/, '');
  if (waNumber.startsWith('0')) {
    waNumber = '234' + waNumber.substring(1);
  } else if (!waNumber.startsWith('234') && waNumber.length === 10) {
    waNumber = '234' + waNumber;
  }

  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Hello ${patientName}, this is Fountain-Top Physiotherapy Clinic in Asaba regarding your booking request (${refCode}) for ${serviceRequested}.`
  )}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>${typeLabel} - ${refCode}</title>
  <style>
    /* Reset & Client-Specific Styles */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; border-radius: 0 !important; }
      .mobile-stack { display: block !important; width: 100% !important; }
      .mobile-p-16 { padding: 16px !important; }
      .btn-table { width: 100% !important; }
      .btn-cell { display: block !important; padding: 4px 0 !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 24px 0; background-color: #f1f5f9; color: #1e293b;">
  <center>
    <!-- Preheader preview text -->
    <div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
      New patient ${typeLabel}: ${patientName} (${serviceRequested}) &bull; Ref: ${refCode} &bull; Preferred Date: ${appointmentDate}
    </div>

    <!-- Main Card Container -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08); border: 1px solid #e2e8f0;" class="email-container">
      
      <!-- Top Branding Header -->
      <tr>
        <td style="background: linear-gradient(135deg, #0f766e 0%, #0d9488 60%, #115e59 100%); padding: 32px 28px; text-align: left; color: #ffffff;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td>
                <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 8px; padding: 4px 10px; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #ccfbf1; margin-bottom: 8px;">
                  CLINICAL DESK ALERT
                </div>
                <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.25; color: #ffffff;">
                  Fountain-Top Physiotherapy Clinic
                </h1>
                <p style="margin: 0; font-size: 13px; color: #99f6e4; line-height: 1.4;">
                  Behind Stephen Keshi Stadium by MFM Junction &bull; Asaba, Delta State
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Status & Reference Pill Strip -->
      <tr>
        <td style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 14px 28px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="font-size: 13px; font-weight: 700; color: #0f766e; text-transform: uppercase; letter-spacing: 0.04em;">
                &#9679; ${typeLabel}
              </td>
              <td align="right" style="font-size: 13px; font-weight: 800; color: #334155; font-family: monospace;">
                REF: <span style="background-color: #0f766e; color: #ffffff; padding: 3px 8px; border-radius: 6px;">${refCode}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Main Body Content -->
      <tr>
        <td style="padding: 28px;" class="mobile-p-16">
          
          <!-- Patient Summary Card -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px; overflow: hidden;">
            <tr>
              <td style="padding: 18px 20px; border-bottom: 1px solid #e2e8f0; background-color: #f1f5f9;">
                <span style="font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b;">
                  PATIENT DEMOGRAPHICS & CONTACT
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 16px 20px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 35%; font-weight: 600;">Full Name:</td>
                    <td style="padding: 6px 0; font-size: 15px; color: #0f172a; font-weight: 800;">${patientName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Phone / WhatsApp:</td>
                    <td style="padding: 6px 0; font-size: 15px; color: #0d9488; font-weight: 700;">
                      <a href="tel:${patientPhone}" style="color: #0d9488; text-decoration: underline;">${patientPhone}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Email Address:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #0f172a;">
                      ${patientEmail && patientEmail !== 'Not provided' 
                        ? `<a href="mailto:${patientEmail}" style="color: #0d9488; text-decoration: none;">${patientEmail}</a>` 
                        : '<span style="color: #94a3b8; font-style: italic;">Not provided</span>'}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Preferred Channel:</td>
                    <td style="padding: 6px 0; font-size: 13px; color: #334155; font-weight: 700; text-transform: uppercase;">
                      ${bookingChannel === 'email' ? '✉️ Email Notification' : '💬 WhatsApp Direct'}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Clinical Appointment Details Card -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
            <tr>
              <td style="padding: 18px 20px; border-bottom: 1px solid #e2e8f0; background-color: #f1f5f9;">
                <span style="font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b;">
                  CLINICAL CARE DETAILS
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 16px 20px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="padding: 8px 0; font-size: 13px; color: #64748b; width: 35%; font-weight: 600;">Requested Service:</td>
                    <td style="padding: 8px 0;">
                      <span style="display: inline-block; background-color: #ccfbf1; color: #0f766e; border: 1px solid #99f6e4; font-size: 13px; font-weight: 800; padding: 4px 10px; border-radius: 6px;">
                        ${serviceRequested}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Preferred Date:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #0f172a; font-weight: 700;">${appointmentDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Preferred Time:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #0f172a; font-weight: 700;">${appointmentTime}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Consultation Format:</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #0f172a; font-weight: 700;">
                      ${visitType === 'Home Visit' || visitType.includes('Home') ? '🏠 Home Visit Rehabilitation' : '🏥 In-Clinic Consultation (Asaba Facility)'}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Patient Condition / Chief Complaint Notes -->
          <div style="margin-bottom: 24px;">
            <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #475569; margin-bottom: 8px;">
              PATIENT CLINICAL NOTES / SYMPTOMS:
            </div>
            <div style="background-color: #f8fafc; border-left: 4px solid #0d9488; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; border-radius: 0 10px 10px 0; padding: 16px 20px; font-size: 14px; line-height: 1.6; color: #334155;">
              ${notes ? notes.replace(/\n/g, '<br>') : '<span style="color: #94a3b8; font-style: italic;">No additional notes provided.</span>'}
            </div>
          </div>

          <!-- Quick Interactive Action Buttons for Clinician -->
          <div style="text-align: center; margin: 32px 0 12px 0;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="btn-table">
              <tr>
                <td align="center" style="padding: 6px;" class="btn-cell">
                  <a href="tel:${patientPhone}" style="display: inline-block; background-color: #0d9488; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 700; letter-spacing: 0.02em; min-width: 140px; text-align: center; box-shadow: 0 2px 4px rgba(13, 148, 136, 0.2);">
                    &#9742; Call Patient
                  </a>
                </td>
                <td align="center" style="padding: 6px;" class="btn-cell">
                  <a href="${waUrl}" target="_blank" style="display: inline-block; background-color: #16a34a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 700; letter-spacing: 0.02em; min-width: 140px; text-align: center; box-shadow: 0 2px 4px rgba(22, 163, 74, 0.2);">
                    &#128172; Chat on WhatsApp
                  </a>
                </td>
                ${patientEmail && patientEmail !== 'Not provided' ? `
                <td align="center" style="padding: 6px;" class="btn-cell">
                  <a href="mailto:${patientEmail}?subject=Regarding your Fountain-Top appointment request (Ref: ${refCode})" style="display: inline-block; background-color: #334155; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 700; letter-spacing: 0.02em; min-width: 130px; text-align: center;">
                    &#9993; Email Reply
                  </a>
                </td>` : ''}
              </tr>
            </table>
          </div>

          <!-- Triage Checklist -->
          <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 12px 16px; margin-top: 24px; font-size: 12px; color: #92400e; line-height: 1.5;">
            <strong>Clinical Triage Protocol:</strong> Please contact the patient within 2 hours of receipt to confirm appointment time, medical history readiness, and clinic directions.
          </div>

        </td>
      </tr>

      <!-- Clinic Footer -->
      <tr>
        <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 28px; text-align: center;">
          <div style="font-size: 14px; font-weight: 800; color: #0f766e; margin-bottom: 6px;">
            Fountain-Top Physiotherapy & Fitness Clinic
          </div>
          <div style="font-size: 12px; color: #64748b; line-height: 1.5; margin-bottom: 12px;">
            1, Nwanze Obi Odogwu Street, Behind Stephen Keshi Stadium by Mountain of Fire (MFM) Junction, Asaba, Delta State.<br>
            Hotlines: <a href="tel:+2347039466804" style="color: #0d9488; text-decoration: none; font-weight: 600;">07039466804</a> &bull; <a href="tel:+2349016120596" style="color: #0d9488; text-decoration: none; font-weight: 600;">09016120596</a> &bull; <a href="https://fountaintoppt.com" style="color: #0d9488; text-decoration: none; font-weight: 600;">fountaintoppt.com</a>
          </div>
          <div style="font-size: 11px; color: #94a3b8;">
            Sent automatically from Fountain-Top Patient Portal &bull; Confidential Medical Record
          </div>
        </td>
      </tr>

    </table>
  </center>
</body>
</html>`;
}

export function generatePatientConfirmationHtml(data: BookingEmailData): string {
  const {
    refCode,
    patientName,
    serviceRequested,
    appointmentDate,
    appointmentTime,
    visitType
  } = data;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Request Confirmed - Fountain-Top Physiotherapy</title>
</head>
<body style="margin: 0; padding: 24px 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <center>
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.04);">
      <tr>
        <td style="background: linear-gradient(135deg, #0f766e 0%, #0d9488 100%); padding: 28px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 800; color: #ffffff;">Fountain-Top Physiotherapy Clinic</h1>
          <p style="margin: 0; font-size: 14px; color: #ccfbf1;">Appointment Request Received &bull; Asaba, Delta State</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 28px;">
          <p style="font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 0;">Dear ${patientName},</p>
          <p style="font-size: 14px; line-height: 1.6; color: #334155;">
            Thank you for scheduling your physiotherapy appointment with Fountain-Top Clinic. We have successfully logged your request into our clinical schedule.
          </p>

          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; margin: 20px 0; padding: 16px;">
            <tr>
              <td style="padding: 6px 12px; font-size: 13px; color: #64748b; font-weight: 600; width: 40%;">Reference Code:</td>
              <td style="padding: 6px 12px; font-size: 14px; font-weight: 800; color: #0f766e; font-family: monospace;">${refCode}</td>
            </tr>
            <tr>
              <td style="padding: 6px 12px; font-size: 13px; color: #64748b; font-weight: 600;">Service Requested:</td>
              <td style="padding: 6px 12px; font-size: 14px; font-weight: 700; color: #0f172a;">${serviceRequested}</td>
            </tr>
            <tr>
              <td style="padding: 6px 12px; font-size: 13px; color: #64748b; font-weight: 600;">Requested Date:</td>
              <td style="padding: 6px 12px; font-size: 14px; color: #0f172a;">${appointmentDate} (${appointmentTime})</td>
            </tr>
            <tr>
              <td style="padding: 6px 12px; font-size: 13px; color: #64748b; font-weight: 600;">Care Format:</td>
              <td style="padding: 6px 12px; font-size: 14px; color: #0f172a;">${visitType}</td>
            </tr>
          </table>

          <p style="font-size: 14px; line-height: 1.6; color: #334155;">
            <strong>Next Steps:</strong> A member of our clinical team will reach out via phone or WhatsApp shortly to confirm your specific arrival time and assist with any preparation needed.
          </p>

          <div style="background-color: #f1f5f9; border-radius: 8px; padding: 14px; margin-top: 20px; font-size: 13px; color: #475569;">
            <strong>Clinic Address:</strong> 1, Nwanze Obi Odogwu Street, Behind Stephen Keshi Stadium by Mountain of Fire (MFM) Junction, Asaba, Delta State.<br>
            <strong>Questions or Directions?</strong> Call us directly at <a href="tel:+2347039466804" style="color: #0d9488; font-weight: 700; text-decoration: none;">07039466804</a> or <a href="tel:+2349016120596" style="color: #0d9488; font-weight: 700; text-decoration: none;">09016120596</a>.
          </div>
        </td>
      </tr>
      <tr>
        <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8;">
          Fountain-Top Physiotherapy & Fitness Clinic &bull; Restore Movement. Build Strength. Live Pain-Free.
        </td>
      </tr>
    </table>
  </center>
</body>
</html>`;
}
