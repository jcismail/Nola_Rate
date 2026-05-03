type AttioLeadPayload = Record<string, unknown>;

function getAttioConfig() {
  return {
    enabled: process.env.ATTIO_ENABLED === "true",
    apiKey: process.env.ATTIO_API_KEY,
    workspaceId: process.env.ATTIO_WORKSPACE_ID,
    listId: process.env.ATTIO_LIST_ID,
  };
}

export async function sendLeadToAttio(lead: AttioLeadPayload) {
  const { enabled, apiKey, workspaceId, listId } = getAttioConfig();
  if (!enabled || !apiKey || !workspaceId || !listId) return;

  try {
    await fetch(
      `https://api.attio.com/v2/workspaces/${workspaceId}/lists/${listId}/entries`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            values: {
              name: String(lead.name ?? ""),
              email: String(lead.email ?? ""),
              phone: String(lead.phone ?? ""),
              lead_type: String(lead.leadType ?? ""),
              page: String(lead.page ?? ""),
              submitted_at: String(lead.submittedAt ?? ""),
              source: String(lead.source ?? "website_demo"),
              notes: JSON.stringify(lead),
            },
          },
        }),
      }
    );
  } catch {
    // Fail-safe: CRM sync should not break lead capture.
  }
}
