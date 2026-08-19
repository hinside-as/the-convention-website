const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async (request: Request) => {
  const form = await request.formData();

  // Honeypot: real users never fill this hidden field in.
  if (form.get("company")) {
    return new Response(null, { status: 204 });
  }

  const email = form.get("email");
  if (typeof email !== "string" || !EMAIL_PATTERN.test(email)) {
    return new Response("Invalid email", { status: 400 });
  }

  const webhookUrl = process.env.SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return new Response("Signup is not configured yet", { status: 503 });
  }

  const sheetResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, submittedAt: new Date().toISOString() }),
  });

  if (!sheetResponse.ok) {
    return new Response("Could not save signup", { status: 502 });
  }

  return new Response(null, { status: 204 });
};
