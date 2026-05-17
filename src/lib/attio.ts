type AttioLeadPayload = Record<string, unknown>;

function getAttioConfig() {
  return {
    enabled: process.env.ATTIO_ENABLED === "true",
    apiKey: process.env.ATTIO_API_KEY,
    listId: process.env.ATTIO_LIST_ID,
  };
}

function splitName(rawName: string) {
  const normalized = rawName.trim().replace(/\s+/g, " ");
  if (!normalized) {
    return { firstName: "Unknown", lastName: "Lead", fullName: "Unknown Lead" };
  }

  const parts = normalized.split(" ");
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "Lead", fullName: `${parts[0]} Lead` };
  }

  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ");
  return { firstName, lastName, fullName: `${firstName} ${lastName}` };
}

function toE164Like(rawPhone: string) {
  const trimmed = rawPhone.trim();
  if (!trimmed) return "";
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 10) return "";
  if (digits.length === 10) return `+1${digits}`;
  if (trimmed.startsWith("+")) return `+${digits}`;
  return `+${digits}`;
}

export async function sendLeadToAttio(lead: AttioLeadPayload) {
  const { enabled, apiKey, listId } = getAttioConfig();
  if (!enabled || !apiKey || !listId) return;

  try {
    const leadName = String(lead.name ?? "");
    const leadEmail = String(lead.email ?? "").trim();
    const leadPhone = String(lead.phone ?? "").trim();
    if (!leadEmail) return;

    const { firstName, lastName, fullName } = splitName(leadName);
    const personValues: Record<string, unknown> = {
      email_addresses: [leadEmail],
      name: [
        {
          first_name: firstName,
          last_name: lastName,
          full_name: fullName,
        },
      ],
      description: JSON.stringify({
        lead_type: String(lead.leadType ?? ""),
        page: String(lead.page ?? ""),
        source: String(lead.source ?? "website_demo"),
        submitted_at: String(lead.submittedAt ?? ""),
        phone: leadPhone,
        payload: lead,
      }),
    };

    const normalizedPhone = toE164Like(leadPhone);
    if (normalizedPhone) {
      personValues.phone_numbers = [{ original_phone_number: normalizedPhone }];
    }

    const personPayload = {
      data: {
        values: personValues,
      },
    };

    const personRes = await fetch(
      "https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personPayload),
      }
    );

    if (!personRes.ok) return;
    const personJson = (await personRes.json()) as {
      data?: { id?: { record_id?: string } };
    };
    const personRecordId = personJson?.data?.id?.record_id;
    if (!personRecordId) return;

    await fetch(
      `https://api.attio.com/v2/lists/${listId}/entries`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            parent_object: "people",
            parent_record_id: personRecordId,
            entry_values: {},
          },
        }),
      }
    );
  } catch {
    // Fail-safe: CRM sync should not break lead capture.
  }
}
