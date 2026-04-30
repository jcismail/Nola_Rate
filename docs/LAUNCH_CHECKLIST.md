# Launch Checklist

## Local Demo Checklist

- App starts and loads at `http://localhost:3000`
- Homepage CTAs all work
- All solution pages load without errors
- Forms submit and route to thank-you page
- Contact/Realtor forms submit successfully
- Footer disclosures visible and readable

## Pre-Production Checklist

- Add real Calendly URL in `.env.local`
- Add real Resend credentials in `.env.local`
- Verify email delivery from every form
- Replace placeholder review URL and contact email
- Validate legal text with compliance reviewer
- Confirm NMLS/license identifiers are final

## QA Checklist

- Mobile checks (iPhone + Android viewport)
- Desktop checks (Chrome + Edge)
- Accessibility checks (keyboard navigation, labels, contrast)
- Performance checks (LCP image weights, no console errors)

## Post-Launch Monitoring

- Monitor lead volume and 429 rate-limit responses
- Confirm no spam spikes bypass honeypot
- Check form delivery logs daily for first week
- Review top landing page conversion paths weekly
