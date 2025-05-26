export interface ContactPayload {
  nom: string;
  prenom: string;
  mail: string;
  message: string;
  date_envoie: string;
}
 
export async function sendContact(payload: ContactPayload) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
 
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors de l’envoi du message');
  }
 
  return await response.json();
}